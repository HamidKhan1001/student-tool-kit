import os
from pdf2image import convert_from_path
from PIL import Image
import pytesseract
from transformers import pipeline
import graphviz
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image as RLImage, Spacer
from reportlab.lib.styles import getSampleStyleSheet

# === Configuration ===

# Poppler (for pdfinfo)
POPPLER_PATH = r"C:\poppler-24.08.0\Library\bin"

# Tesseract-OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Graphviz 'dot' executable folder
GRAPHVIZ_BIN = r"C:\Program Files\Graphviz\bin"  # update if your install is somewhere else

# Prepend Graphviz bin to PATH so graphviz can find dot.exe
os.environ["PATH"] = GRAPHVIZ_BIN + os.pathsep + os.environ.get("PATH", "")

# === Summarizer setup ===
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


# === Core processors ===

def ocr_and_extract(path):
    """
    Convert a PDF (or image) into PIL pages, run OCR on each,
    and return (full_text, pages_list).
    """
    if path.lower().endswith(".pdf"):
        pages = convert_from_path(path, poppler_path=POPPLER_PATH)
    else:
        pages = [Image.open(path).convert("RGB")]

    texts = [pytesseract.image_to_string(img, lang="eng") for img in pages]
    return "\n\n".join(texts), pages


def summarize_text(raw_text, chunk_size=2000, min_length=80, max_length=256):
    """
    Break raw_text into chunks, summarize each, and return a list of summaries.
    """
    chunks = [raw_text[i:i+chunk_size] for i in range(0, len(raw_text), chunk_size)]
    summaries = []
    for c in chunks:
        out = summarizer(c, max_length=max_length, min_length=min_length, do_sample=False)
        summaries.append(out[0]["summary_text"])
    return summaries


def generate_diagrams(sections, output_folder="processed"):
    """
    For each summary section, render a simple fully-connected Graphviz diagram.
    Returns a list of PNG file paths.
    """
    os.makedirs(output_folder, exist_ok=True)
    paths = []

    for idx, sec in enumerate(sections):
        dot = graphviz.Digraph(format="png")
        # pick up to five unique words as nodes
        nodes = list(dict.fromkeys(sec.split()[:5]))
        for n in nodes:
            dot.node(n)
        for a in nodes:
            for b in nodes:
                if a != b:
                    dot.edge(a, b)

        base = os.path.join(output_folder, f"diagram_{idx}")
        dot.render(base, cleanup=True)  # this now can find dot.exe
        paths.append(base + ".png")

    return paths


def generate_quiz_flashcards(sections):
    """
    From each summary, create a quiz Q&A and a flashcard.
    """
    qa_pairs = []
    flashcards = []

    for sec in sections:
        sents = [s.strip() for s in sec.split(".") if s.strip()]
        if not sents:
            continue

        q = sents[0] + "?"
        a = sents[1] if len(sents) > 1 else "See above."
        qa_pairs.append([(q, a)])
        flashcards.append({"front": q, "back": a})

    return qa_pairs, flashcards


def assemble_pdf(sections, diagrams, qa_pairs, flashcards, out_folder, out_filename):
    """
    Build a PDF containing:
     - Each summary + its diagram
     - A Quiz section
     - A Flashcards section
    Writes to out_folder/out_filename and returns that path.
    """
    os.makedirs(out_folder, exist_ok=True)
    out_path = os.path.join(out_folder, out_filename)
    doc = SimpleDocTemplate(out_path)
    story = []
    styles = getSampleStyleSheet()

    # Summaries + Diagrams
    for sec, img_path in zip(sections, diagrams):
        story.append(Paragraph(sec, styles["BodyText"]))
        story.append(Spacer(1, 6))
        story.append(RLImage(img_path, width=400, height=200))
        story.append(Spacer(1, 12))

    # Quiz Section
    story.append(Paragraph("Quiz", styles["Heading2"]))
    for block in qa_pairs:
        for q, a in block:
            story.append(Paragraph(f"Q: {q}", styles["BodyText"]))
            story.append(Paragraph(f"A: {a}", styles["Italic"]))
            story.append(Spacer(1, 6))

    # Flashcards Section
    story.append(Paragraph("Flashcards", styles["Heading2"]))
    for card in flashcards:
        story.append(Paragraph(f"Front: {card['front']}", styles["BodyText"]))
        story.append(Paragraph(f"Back: {card['back']}", styles["Italic"]))
        story.append(Spacer(1, 6))

    doc.build(story)
    return out_path

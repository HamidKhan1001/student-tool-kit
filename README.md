# 🎓 Student Tool Kit

A smart academic assistant that transforms lecture PDFs into concise summaries, visual diagrams, quizzes, and flashcards — all compiled into a single exportable PDF.

---

## 📌 Features

- 📄 **PDF to Text Conversion** via OCR
- 🧠 **Text Summarization** using BART (HuggingFace Transformers)
- 📊 **Diagram Generation** via Graphviz
- ❓ **Auto-Generated Quizzes & Flashcards**
- 📦 **Export to PDF** with summaries, visuals, and questions
- 🔧 Docker-ready and configurable for local environments

---

## 🚀 How It Works

1. **Upload** a PDF (lecture notes, academic articles, etc.)
2. **OCR** extracts raw text from the document
3. **Summarization** splits and compresses text using a transformer model
4. **Diagram Generator** visualizes key summary concepts
5. **Quiz and Flashcard Generator** builds Q&A from the text
6. **PDF Export** compiles everything into a clean, printable document

---

## 🛠 Tech Stack

- **Python 3.10+**
- `pytesseract`, `pdf2image`, `Pillow` – for OCR
- `transformers` – for NLP summarization
- `graphviz` – for generating diagrams
- `reportlab` – for PDF creation
- **Poppler** – for PDF rendering
- **Tesseract OCR** – for text extraction from images
- **Docker** – optional containerized deployment

---

## 📷 Sample Output

![WhatsApp Image 2025-06-10 at 12 33 25_8757e10e](https://github.com/user-attachments/assets/273b9b11-9575-405c-aaad-7abd61980988)
![WhatsApp Image 2025-06-10 at 12 33 31_449dbe42](https://github.com/user-attachments/assets/53a49d94-249c-4398-901b-7308758d7267)
![WhatsApp Image 2025-06-10 at 12 33 38_f056cb2e](https://github.com/user-attachments/assets/d6069345-09eb-4ab2-ad04-cfb07fc2535e)
![WhatsApp Image 2025-06-10 at 12 33 47_8861b6db](https://github.com/user-attachments/assets/e7da016d-9b21-4ae7-846b-391b2f38791e)





---

## 🧪 Setup Instructions

### 🔧 Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/HamidKhan1001/student-tool-kit.git
   cd student-tool-kit

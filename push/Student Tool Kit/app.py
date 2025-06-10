import os
import time
from flask import (
    Flask, request, render_template,
    redirect, url_for, flash,
    send_from_directory
)
from werkzeug.utils import secure_filename

from config import UPLOAD_FOLDER, PROCESSED_FOLDER, EXPORT_FOLDER
from processors import (
    ocr_and_extract,
    summarize_text,
    generate_diagrams,
    generate_quiz_flashcards,
    assemble_pdf
)

ALLOWED_EXT = {'pdf', 'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config.from_object('config')
app.secret_key = app.config['SECRET_KEY']

# Ensure our directories exist
for d in (UPLOAD_FOLDER, PROCESSED_FOLDER, EXPORT_FOLDER):
    os.makedirs(d, exist_ok=True)

def allowed_file(fn):
    return '.' in fn and fn.rsplit('.', 1)[1].lower() in ALLOWED_EXT

@app.route('/', methods=['GET', 'POST'])
def upload_and_process():
    if request.method == 'POST':
        f = request.files.get('file')
        if not f or not allowed_file(f.filename):
            flash("Please upload a PDF, PNG, JPG or JPEG file.")
            return redirect(request.url)

        # 1) Save upload
        fn = secure_filename(f.filename)
        in_path = os.path.join(UPLOAD_FOLDER, fn)
        f.save(in_path)

        # 2) OCR & extract
        raw_text, pages = ocr_and_extract(in_path)

        # 3) Summarize
        sections = summarize_text(raw_text)

        # 4) Diagrams
        diagram_paths = generate_diagrams(sections)

        # 5) Quiz + Flashcards
        qa_pairs, flashcards = generate_quiz_flashcards(sections)

        # 6) Assemble into timestamped PDF
        ts = int(time.time())
        out_name = f"student_toolkit_{ts}.pdf"
        assemble_pdf(
            sections,
            diagram_paths,
            qa_pairs,
            flashcards,
            EXPORT_FOLDER,
            out_name
        )

        # 7) Render preview page directly
        return render_template('preview.html', filename=out_name)

    # GET → show upload form
    return render_template('upload.html')


@app.route('/exported/<filename>')
def exported_file(filename):
    """Serve the PDF inline for embedding in the iframe."""
    return send_from_directory(
        EXPORT_FOLDER, filename,
        mimetype='application/pdf',
        as_attachment=False
    )

@app.route('/download/<filename>')
def download_file(filename):
    """Serve the PDF as an attachment to force download."""
    return send_from_directory(
        EXPORT_FOLDER, filename,
        mimetype='application/pdf',
        as_attachment=True,
        download_name=filename
    )

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)

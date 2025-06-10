FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y tesseract-ocr graphviz libglib2.0-0 libfreetype6 libjpeg62-turbo \
       poppler-utils && \
    pip install --no-cache-dir -r requirements.txt

WORKDIR /app
COPY . /app

# Expose and run
EXPOSE 8000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]

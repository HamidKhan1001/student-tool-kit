import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Flask secret
SECRET_KEY = os.environ.get("SECRET_KEY", "change-this-in-prod")

# Paths for uploads, intermediate, and exports
UPLOAD_FOLDER    = os.path.join(BASE_DIR, "uploads")
PROCESSED_FOLDER = os.path.join(BASE_DIR, "processed")
EXPORT_FOLDER    = os.path.join(BASE_DIR, "exports")

# Ensure those folders exist
for folder in (UPLOAD_FOLDER, PROCESSED_FOLDER, EXPORT_FOLDER):
    os.makedirs(folder, exist_ok=True)

# (Optional) model paths if you extend to Kraken OCR models later
MODEL_PRINT = os.environ.get(
    "KRAKEN_MODEL_PRINT",
    os.path.join(BASE_DIR, "models", "print.mlmodel")
)
MODEL_HTR   = os.environ.get(
    "KRAKEN_MODEL_HTR",
    os.path.join(BASE_DIR, "models", "htr.mlmodel")
)

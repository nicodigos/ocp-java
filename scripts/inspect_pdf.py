from pathlib import Path
import sys

from pypdf import PdfReader


pdf = next(Path(".").glob("*.pdf"))
reader = PdfReader(str(pdf))

for spec in sys.argv[1:]:
    start, end = (int(value) for value in spec.split("-", 1))
    print(f"===== PDF pages {start}-{end} =====")
    for page_number in range(start, end + 1):
        text = reader.pages[page_number - 1].extract_text() or ""
        print(f"\n--- PDF PAGE {page_number} ---\n{text}")

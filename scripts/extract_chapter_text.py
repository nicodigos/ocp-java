from pathlib import Path

from pypdf import PdfReader


CHAPTERS = [
    (1, "building-blocks", 90, 157),
    (2, "operators", 169, 214),
    (3, "making-decisions", 224, 293),
    (4, "core-apis", 310, 400),
    (5, "methods", 412, 480),
    (6, "class-design", 492, 569),
    (7, "beyond-classes", 586, 682),
    (8, "lambdas-functional-interfaces", 702, 749),
    (9, "collections-generics", 761, 832),
    (10, "streams", 843, 896),
    (11, "exceptions-localization", 906, 992),
    (12, "modules", 1008, 1091),
    (13, "concurrency", 1103, 1182),
    (14, "io", 1197, 1302),
]

pdf = next(Path(".").glob("*.pdf"))
reader = PdfReader(str(pdf))
destination = Path("tmp/pdfs/chapters")
destination.mkdir(parents=True, exist_ok=True)

for chapter, slug, start, end in CHAPTERS:
    pages = []
    for number in range(start, end + 1):
        text = reader.pages[number - 1].extract_text(extraction_mode="layout") or ""
        if "Review Questions" in text:
            text = text.split("Review Questions", 1)[0]
            pages.append(f"\n\n--- PDF PAGE {number} ---\n\n{text}")
            break
        pages.append(f"\n\n--- PDF PAGE {number} ---\n\n{text}")
    output = destination / f"chapter-{chapter:02d}-{slug}.txt"
    output.write_text("".join(pages), encoding="utf-8")
    print(f"Chapter {chapter:>2}: PDF {start}-{end}, {output.stat().st_size:,} bytes")

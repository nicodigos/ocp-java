from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


CHAPTERS = [
    (1, "Building Blocks", 157, 168, 1318, 1324),
    (2, "Operators", 214, 223, 1325, 1330),
    (3, "Making Decisions", 293, 309, 1331, 1340),
    (4, "Core APIs", 400, 411, 1341, 1346),
    (5, "Methods", 480, 491, 1347, 1352),
    (6, "Class Design", 569, 585, 1353, 1363),
    (7, "Beyond Classes", 682, 701, 1364, 1371),
    (8, "Lambdas and Functional Interfaces", 749, 760, 1372, 1377),
    (9, "Collections and Generics", 832, 842, 1378, 1384),
    (10, "Streams", 896, 905, 1385, 1390),
    (11, "Exceptions and Localization", 992, 1007, 1391, 1397),
    (12, "Modules", 1091, 1102, 1398, 1402),
    (13, "Concurrency", 1182, 1196, 1403, 1410),
    (14, "I/O", 1302, 1316, 1411, 1418),
]

QUESTION_START = re.compile(r"(?m)^ {0,2}(\d+)\.\s+")
OPTION_START = re.compile(r"(?m)^\s{4,}([A-H])\.\s+")


def page_text(reader: PdfReader, start: int, end: int) -> str:
    chunks = []
    for number in range(start, end + 1):
        text = reader.pages[number - 1].extract_text(extraction_mode="layout") or ""
        chunks.append(
            text.replace("\u00ad", "")
            .replace("\ufffd", "'")
            .replace("\u2026", "...")
        )
    return "\n".join(chunks)


def numbered_sections(text: str) -> dict[int, str]:
    matches = list(QUESTION_START.finditer(text))
    sections: dict[int, str] = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        body = text[match.end() : end].strip()
        if number not in sections:
            sections[number] = body
    return sections


def clean_block(text: str) -> str:
    lines = [line.rstrip() for line in text.splitlines()]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return "\n".join(lines)


def answer_key(explanation: str) -> str:
    first = re.split(r"\s", explanation.strip(), maxsplit=1)[0]
    key = first.rstrip(".")
    if not re.fullmatch(r"[A-H](?:,[A-H])*", key.replace(" ", "")):
        first_sentence = explanation.split(".", 1)[0]
        letters = re.findall(r"\b[A-H]\b", first_sentence)
        if not letters:
            raise ValueError(f"Could not extract answer key from: {explanation[:100]!r}")
        return ", ".join(letters)
    return ", ".join(key.replace(" ", "").split(","))


def strip_key(explanation: str) -> str:
    explanation = re.sub(
        r"^\s*[A-H](?:\s*,\s*[A-H])*\.\s*", "", explanation, count=1
    ).strip()
    return re.sub(r"\s+", " ", explanation)


def main() -> None:
    pdf = next(Path(".").glob("*.pdf"))
    reader = PdfReader(str(pdf))
    destination = Path("assets/review-tests")
    destination.mkdir(parents=True, exist_ok=True)
    manifest = []

    for chapter, title, q_start, q_end, a_start, a_end in CHAPTERS:
        question_text = page_text(reader, q_start, q_end)
        question_text = question_text.split("Review Questions", 1)[-1]
        answer_text = page_text(reader, a_start, a_end)
        questions = numbered_sections(question_text)
        answers = numbered_sections(answer_text)
        if not questions or set(questions) != set(answers):
            raise ValueError(
                f"Chapter {chapter}: question numbers {sorted(questions)} do not match "
                f"answer numbers {sorted(answers)}"
            )

        slug = f"chapter-{chapter:02d}"
        lines = [
            "---",
            f"chapter: {chapter}",
            f'title: "{title}"',
            f"questionCount: {len(questions)}",
            f"sourceQuestionPdfPages: \"{q_start}-{q_end}\"",
            f"sourceAnswerPdfPages: \"{a_start}-{a_end}\"",
            "---",
            "",
            f"# Chapter {chapter}: {title}",
            "",
        ]
        for number in sorted(questions):
            explanation = clean_block(answers[number])
            lines.extend(
                [
                    f"## Question {number}",
                    "",
                    "### Prompt",
                    "",
                    clean_block(questions[number]),
                    "",
                    "### Correct answer",
                    "",
                    answer_key(explanation),
                    "",
                    "### Explanation",
                    "",
                    strip_key(explanation),
                    "",
                ]
            )

        path = destination / f"{slug}.md"
        path.write_text("\n".join(lines), encoding="utf-8")
        manifest.append(
            {
                "chapter": chapter,
                "title": title,
                "questionCount": len(questions),
                "file": f"{slug}.md",
            }
        )

    (destination / "index.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Created {len(manifest)} chapter assets with {sum(x['questionCount'] for x in manifest)} questions")
    for item in manifest:
        print(f"Chapter {item['chapter']:>2}: {item['questionCount']:>2} questions")


if __name__ == "__main__":
    main()

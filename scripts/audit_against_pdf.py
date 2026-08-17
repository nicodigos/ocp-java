from __future__ import annotations

import re
from pathlib import Path

from pypdf import PdfReader

from extract_review_tests import (
    CHAPTERS,
    answer_key,
    clean_block,
    numbered_sections,
    page_text,
    strip_key,
)


def normalize_newlines(value: str) -> str:
    return value.replace("\r\n", "\n").replace("\r", "\n").strip()


pdf = next(Path(".").glob("*.pdf"))
reader = PdfReader(str(pdf))
asset_root = Path("assets/review-tests")
audited = 0

for chapter, title, q_start, q_end, a_start, a_end in CHAPTERS:
    raw_questions = page_text(reader, q_start, q_end).split("Review Questions", 1)[-1]
    raw_answers = page_text(reader, a_start, a_end)
    source_questions = numbered_sections(raw_questions)
    source_answers = numbered_sections(raw_answers)

    asset = (asset_root / f"chapter-{chapter:02d}.md").read_text(encoding="utf-8")
    parts = re.split(r"(?m)^## Question (\d+)\s*$", asset)[1:]
    assert len(parts) % 2 == 0
    asset_questions: dict[int, tuple[str, str, str]] = {}

    for index in range(0, len(parts), 2):
        number = int(parts[index])
        body = parts[index + 1]
        prompt = re.search(
            r"### Prompt\s+([\s\S]*?)\s+### Correct answer", body
        ).group(1)
        key = re.search(r"### Correct answer\s+([^\n]+)", body).group(1)
        explanation = re.search(r"### Explanation\s+([\s\S]*?)$", body).group(1)
        asset_questions[number] = (prompt, key, explanation)

    assert set(asset_questions) == set(source_questions) == set(source_answers), chapter
    for number in source_questions:
        prompt, key, explanation = asset_questions[number]
        expected_answer = clean_block(source_answers[number])
        assert normalize_newlines(prompt) == normalize_newlines(
            clean_block(source_questions[number])
        ), (chapter, number, "prompt differs from PDF extraction")
        assert key.strip() == answer_key(expected_answer), (
            chapter,
            number,
            "answer key differs from appendix",
        )
        assert normalize_newlines(explanation) == normalize_newlines(
            strip_key(expected_answer)
        ), (chapter, number, "explanation differs from appendix")
        audited += 1

    assert "\ufffd" not in asset, (chapter, "replacement character")
    assert "\u2026" not in asset, (chapter, "ellipsis remained in Java content")

print(f"PDF audit passed: {audited} questions, answer keys, and explanations match")

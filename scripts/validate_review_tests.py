from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path("assets/review-tests")
manifest = json.loads((ROOT / "index.json").read_text(encoding="utf-8"))
total = 0

for chapter in manifest:
    text = (ROOT / chapter["file"]).read_text(encoding="utf-8")
    sections = re.split(r"(?m)^## Question (\d+)\s*$", text)[1:]
    questions = []
    for index in range(0, len(sections), 2):
        number = int(sections[index])
        body = sections[index + 1]
        prompt_match = re.search(
            r"### Prompt\s+([\s\S]*?)\s+### Correct answer", body
        )
        answer_match = re.search(r"### Correct answer\s+([^\n]+)", body)
        explanation_match = re.search(r"### Explanation\s+([\s\S]*?)$", body)
        assert prompt_match and answer_match and explanation_match, (
            chapter["chapter"],
            number,
        )
        prompt = prompt_match.group(1)
        options = set()
        expected = ord("A")
        for line in prompt.splitlines():
            marker = re.match(r"^[ \t]*([A-H])\.[ \t]*(.*)$", line)
            if marker and ord(marker.group(1)) == expected:
                options.add(marker.group(1))
                expected += 1
        answers = set(answer_match.group(1).replace(" ", "").split(","))
        assert len(options) >= 2, (chapter["chapter"], number, "missing options")
        assert answers <= options, (
            chapter["chapter"],
            number,
            f"answers {answers} not in options {options}",
        )
        assert len(explanation_match.group(1).strip()) >= 20, (
            chapter["chapter"],
            number,
            "short explanation",
        )
        questions.append(number)
    assert questions == list(range(1, chapter["questionCount"] + 1)), (
        chapter["chapter"],
        questions,
    )
    total += len(questions)

assert len(manifest) == 14
assert total == 338
print(f"Validated {len(manifest)} chapters and {total} questions")

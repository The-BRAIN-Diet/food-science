#!/usr/bin/env python3
"""Generate BRS5 ADHD manuscript summary with anchored studies."""

import importlib.util
import os

from docx import Document
from docx.shared import Inches

OUTPUT = (
    "/Users/paulhouston/Food Science/food-science/manuscript/"
    "BRS5-ADHD-structure-and-evidence-summary.docx"
)

_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_MAIN = os.path.join(_SCRIPT_DIR, "generate-brs-adhd-manuscript-summaries.py")


def _load_main():
    spec = importlib.util.spec_from_file_location("brs_adhd_gen", _MAIN)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    mod = _load_main()
    section = next(s for s in mod.SECTIONS if s["title"].startswith("BRS5"))
    doc = Document()
    for sec in doc.sections:
        sec.top_margin = Inches(1)
        sec.bottom_margin = Inches(1)
        sec.left_margin = Inches(1)
        sec.right_margin = Inches(1)
    mod.add_section(doc, section)
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    doc.save(OUTPUT)
    print(f"Saved: {OUTPUT}")


if __name__ == "__main__":
    main()

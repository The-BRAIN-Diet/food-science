#!/usr/bin/env python3
"""Export one BRS sheet from the six-systems workbook to JSON on stdout."""
import json
import re
import sys
import openpyxl

SHEET_BY_BRS = {
    "BRS1": "BRS1-Neurotransmitter Regulatio",
    "BRS2": "BRS2-Methylation & One-Carbon M",
    "BRS3": "BRS3-Inflammation & Oxidative S",
    "BRS4": "BRS4-Mitochondrial Function ",
    "BRS5": "BRS5-gut biome",
    "BRS6": "BRS6-Metabolic & Neuroendocrine",
}


def parse_id_and_name(cell):
    raw = str(cell or "").strip()
    if not raw:
        return None, None
    parts = re.split(r"\s*[—–]\s*", raw, maxsplit=1)
    id_part = parts[0].strip()
    name = parts[1].strip() if len(parts) > 1 else id_part
    m = re.match(r"(BRS\d+)[-\(](FM|PM|KC|SM|S)(\d+)\)?", id_part, re.I)
    if not m:
        return None, None
    canonical_id = f"{m.group(1).upper()}({m.group(2).upper()}{m.group(3)})"
    return canonical_id, name


def col_p(row_dict):
    for k, v in row_dict.items():
        if k and k.startswith("P") and "FM" in k:
            return v
    return None


def main():
    brs = sys.argv[1].upper() if len(sys.argv) > 1 else "BRS2"
    path = sys.argv[2] if len(sys.argv) > 2 else "/Users/paulhouston/Downloads/the six systems.xlsx"
    sheet = SHEET_BY_BRS.get(brs)
    if not sheet:
        print(json.dumps({"error": f"Unknown BRS: {brs}"}))
        sys.exit(1)

    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb[sheet]
    rows_iter = ws.iter_rows(values_only=True)
    headers = [str(c).strip() if c else "" for c in next(rows_iter)]
    entities = []
    seen_pm = set()

    for row in rows_iter:
        if not row or not row[0]:
            continue
        d = dict(zip(headers, row))
        cid, name = parse_id_and_name(d.get("A-Mechanism ID"))
        if not cid:
            continue
        kind = re.search(r"\((FM|PM|KC|SM|S)\d+\)", cid).group(1)
        if kind in ("SM", "S"):
            continue
        if kind == "PM" and cid in seen_pm:
            continue
        if kind == "PM":
            seen_pm.add(cid)

        entities.append(
            {
                "id": cid,
                "name": name,
                "kind": kind,
                "description": (d.get("B-Description") or "").strip(),
                "connected": (d.get("C — Connected mechanisms (ID + Name + Cross-BRS Links)") or "").strip(),
                "cofactors": (d.get("D — PM/SM Cofactors & Dependencies") or "").strip(),
                "pms_covered": (d.get("E-PMs and SMs Covered") or d.get("E-PMs Covered") or "").strip(),
                "interventions": (d.get("F-Interventions / Inputs → Substances / Signals") or "").strip(),
                "outputs": (d.get("G-Outputs / Function") or "").strip(),
                "key_studies": (d.get("I-Key Studies") or "").strip(),
                "dose": (d.get("J-Dose Target / Requirement") or "").strip(),
                "coverage_timing": (d.get("K-Coverage Timing") or "").strip(),
                "evidence_notes": (d.get("N-Evidence / Notes") or "").strip(),
                "intervention_dominance": (d.get("O — Intervention Dominance") or "").strip(),
                "fm_coverage": (col_p(d) or "").strip(),
            }
        )

    wb.close()
    print(json.dumps({"brs": brs, "sheet": sheet, "entities": entities}, ensure_ascii=False))


if __name__ == "__main__":
    main()

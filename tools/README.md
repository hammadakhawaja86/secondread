# tools/

`build-sample-report-pdf.py` regenerates `sample-report-secondread.pdf`.

It reads the report content straight out of `Sample Report.dc.html` — the
same `state` object the page renders from — so the download can never drift
from the page. Edit the page, rerun this, and the two agree again.

```
cd SecondRead/design_handoff_secondread/design
python3 tools/build-sample-report-pdf.py
```

No dependencies. `pdfkit2.py` is a minimal A4 PDF writer (Helvetica and
Courier, the base-14 fonts, so nothing needs embedding) and `svglogo.py`
converts `logo-secondread.svg` into PDF path operators, which is why the
logo in the PDF is the real mark rather than an approximation.

If the page's section names or state keys change, this script's parsing will
need the same change.

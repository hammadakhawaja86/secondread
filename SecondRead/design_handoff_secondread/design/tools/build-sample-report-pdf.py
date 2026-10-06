# -*- coding: utf-8 -*-
import re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pdfkit2 import W, H, wrap, textw, esc, fold, rrect, build
from svglogo import logo_ops

DESIGN = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(DESIGN, "Sample Report.dc.html")
LOGO = os.path.join(DESIGN, "logo-secondread.svg")
OUT = os.path.join(DESIGN, "sample-report-secondread.pdf")

# ---- brand tokens, the same hexes the page uses --------------------------
NAVY, INK, MUTED, LINE = (0.039,0.122,0.173), (0.090,0.231,0.310), (0.353,0.420,0.467), (0.886,0.914,0.925)
TEAL, TEALD, DEEP = (0.051,0.431,0.439), (0.035,0.329,0.345), (0.024,0.192,0.227)
MINTBG, MINTLN = (0.894,0.949,0.949), (0.765,0.878,0.871)
SOFT = (0.980,0.988,0.988)

ML, MR = 56.0, 56.0
TOP, BOT = 806.0, 58.0
CW = W - ML - MR

# ---- content, read straight out of the page so the two cannot drift ------
s = open(SRC).read()
blk = s[s.index('class Component extends DCLogic'):s.index('  renderVals()')]

def unesc(t):
    t = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), t)
    return t.replace("\\'", "'")

def listof(key):
    seg = blk[blk.index(key + ':'):]
    d = 0
    for i, ch in enumerate(seg):
        if ch == '[': d += 1
        elif ch == ']':
            d -= 1
            if d == 0: seg = seg[:i]; break
    return [unesc(t) for t in re.findall(r"text:\s*'((?:[^'\\]|\\.)*)'", seg)]

sections = [(lbl, [unesc(t) for t in re.findall(r"text:\s*'((?:[^'\\]|\\.)*)'", body)])
            for lbl, body in re.findall(r"\{ label: '([^']+)', paras: \[(.*?)\]\}", blk, re.S)]
meta = [(unesc(a), unesc(b)) for a, b in re.findall(r"\{ label: '([^']+)', value: '((?:[^'\\]|\\.)*)' \}", blk)]
conclusion, recommendations, plain = listof('conclusion'), listof('recommendations'), listof('plainEnglish')
ref = fold(re.search(r'SR-[0-9-]+[^<]*', s).group(0).strip())
signed = re.search(r"signWhen: '([^']+)'", s).group(1)

class Doc:
    def __init__(self):
        self.pages, self.under, self.ops, self.u = [], [], [], []
        self.y = TOP
        self.panel = None
        self.panel_on = False
    def newpage(self):
        # A panel that runs past the page break is closed here and reopened at
        # the top of the next page, so each page gets its own rounded block.
        was = self.panel_on
        if self.panel is not None: self._close_panel()
        self.pages.append(self.ops); self.under.append(self.u)
        self.ops, self.u = [], []
        self.y = TOP - 54          # room for the running head
        self._runhead()
        if was:
            self.panel_on = True
            self.panel = self.y + 6
            self.y -= 10
    def need(self, h):
        if self.y - h < BOT: self.newpage()
    def _runhead(self):
        ops, lh = logo_ops(LOGO, ML, TOP - 4, 104)
        self.ops += ops
        self.rtext("MRI right knee · A. A. · " + ref.split('·')[0].strip(), 8.5, 'F1', MUTED, TOP - 18)
        self.hr(TOP - 34, LINE, 1)
    def rtext(self, t, size, font, col, y):
        x = W - MR - textw(t, size, font)
        self.ops.append("BT /%s %.2f Tf 0 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                        % (font, size, col[0], col[1], col[2], x, y, esc(fold(t))))
    def hr(self, y, col, lw):
        self.ops.append("%.3f %.3f %.3f RG %.2f w %.2f %.2f m %.2f %.2f l S"
                        % (col[0], col[1], col[2], lw, ML, y, W - MR, y))
    def rule(self, col=LINE, lw=0.8, pad=14):
        self.need(pad + 6); self.y -= pad
        self.hr(self.y, col, lw)
    def para(self, t, size=9.8, font='F1', col=INK, lead=None, indent=0, rightpad=0, gap=0):
        lead = lead or size * 1.46
        lines = wrap(t, size, CW - indent - rightpad, font)
        # Widow control: a short paragraph moves whole rather than leaving a
        # line stranded, and a long one never breaks with fewer than two lines
        # on either side of the break.
        room = int((self.y - BOT) // lead)
        if lines and room < len(lines) and (len(lines) <= 5 or room < 2 or len(lines) - room < 2):
            self.newpage()
        for ln in lines:
            self.need(lead)
            self.y -= lead
            self.ops.append("BT /%s %.2f Tf 0 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                            % (font, size, col[0], col[1], col[2], ML + indent, self.y, esc(ln)))
        if gap: self.y -= gap
    def label(self, t, col=MUTED, size=7.4):
        # A section label must never be the last thing on a page: reserve the
        # label plus three lines of whatever follows it.
        self.need(size * 2.4 + 46); self.y -= size * 1.6
        self.ops.append("BT /F3 %.2f Tf %.2f Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                        % (size, size * 0.09, col[0], col[1], col[2], ML, self.y, esc(fold(t).upper())))
        self.y -= 5
    def bullet(self, t):
        lead = 14.4
        lines = wrap(t, 9.8, CW - 18, 'F1')
        self.need(lead * len(lines))
        first = True
        for ln in lines:
            self.need(lead); self.y -= lead
            if first:
                self.ops.append("%.3f %.3f %.3f rg %.2f %.2f m %.2f %.2f l %.2f %.2f l %.2f %.2f l h f"
                                % (TEAL[0], TEAL[1], TEAL[2], ML + 1, self.y + 3, ML + 5, self.y + 3,
                                   ML + 5, self.y + 7, ML + 1, self.y + 7))
                first = False
            self.ops.append("BT /F1 9.8 Tf 0 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                            % (INK[0], INK[1], INK[2], ML + 18, self.y, esc(ln)))
        self.y -= 5
    def open_panel(self):
        self.need(70); self.y -= 16; self.panel = self.y + 10; self.panel_on = True
    def _close_panel(self):
        top, bot = self.panel, self.y - 16
        self.u.append("%.3f %.3f %.3f rg %.3f %.3f %.3f RG 0.9 w" % (MINTBG + MINTLN))
        self.u += rrect(ML, bot, CW, top - bot, 12)
        self.u.append("B")
        self.panel = None
    def close_panel(self):
        self.y -= 4; self.panel_on = False; self._close_panel(); self.y -= 14
    def finish(self):
        self.panel_on = False
        if self.panel is not None: self._close_panel()
        self.pages.append(self.ops); self.under.append(self.u)
        out = []
        n = len(self.pages)
        for i, (ops, und) in enumerate(zip(self.pages, self.under)):
            foot = ["%.3f %.3f %.3f RG 0.8 w %.2f %.2f m %.2f %.2f l S" % (LINE + (ML, BOT - 16, W - MR, BOT - 16))]
            txt = "Sample document · not a real patient · secondopinionradiology.co.uk"
            foot.append("BT /F1 7.6 Tf 0 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                        % (MUTED[0], MUTED[1], MUTED[2], ML, BOT - 28, esc(fold(txt))))
            pg = "Page %d of %d" % (i + 1, n)
            foot.append("BT /F1 7.6 Tf 0 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                        % (MUTED[0], MUTED[1], MUTED[2], W - MR - textw(pg, 7.6, 'F1'), BOT - 28, esc(pg)))
            out.append(und + ops + foot)
        return out

d = Doc()

# ---- masthead -------------------------------------------------------------
ops, lh = logo_ops(LOGO, ML, TOP, 186)
d.ops += ops
d.rtext(ref, 9.2, 'F1', MUTED, TOP - lh + 12)
d.y = TOP - lh - 14
d.hr(d.y, TEAL, 2)
d.y -= 6

# ---- meta grid ------------------------------------------------------------
colw = (CW - 16) / 2.0
rows = [meta[0:2], meta[2:4]]
for r in rows:
    d.y -= 14
    rowtop = d.y + 10
    for ci, (k, v) in enumerate(r):
        x = ML + ci * (colw + 8)
        d.ops.append("BT /F3 7.0 Tf 0.63 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                     % (MUTED[0], MUTED[1], MUTED[2], x, d.y, esc(fold(k).upper())))
        d.ops.append("BT /F2 10.2 Tf 0 Tc %.3f %.3f %.3f rg 1 0 0 1 %.2f %.2f Tm (%s) Tj ET"
                     % (NAVY[0], NAVY[1], NAVY[2], x, d.y - 15, esc(fold(v))))
    d.ops.append("%.3f %.3f %.3f RG 0.8 w %.2f %.2f m %.2f %.2f l S"
                 % (LINE[0], LINE[1], LINE[2], ML + colw, rowtop + 4, ML + colw, d.y - 21))
    d.y -= 21
    d.hr(d.y - 4, LINE, 0.8)
    d.y -= 4

# ---- clinical sections ----------------------------------------------------
for lbl, paras in sections:
    d.label(lbl)
    for p in paras:
        d.para(p, gap=6)
    d.y -= 6

d.label('Conclusion')
for t in conclusion:
    d.bullet(t)
d.y -= 6

d.label('Recommendations')
for t in recommendations:
    d.para(t, gap=7)
d.y -= 8

# ---- plain-English panel --------------------------------------------------
d.open_panel()
d.label('What this means for you', TEALD)
for t in plain:
    d.para(t, 9.8, 'F1', DEEP, indent=14, rightpad=14, gap=6)
d.close_panel()

# ---- signature ------------------------------------------------------------
d.rule(LINE, 0.8, 10)
d.label('Reported and signed by')
d.para('Dr Ramanan Rajakulasingam', 12.6, 'F2', NAVY, lead=17)
d.para('Musculoskeletal radiologist', 9.6, 'F1', MUTED, lead=13)
d.para('FRCR · GMC 7012345 · ' + signed.replace('Signed ', 'Signed '), 9.6, 'F1', MUTED, lead=13)
d.y -= 10
d.para('This report is a radiological opinion based on the images supplied and does not replace '
       'clinical assessment by your treating doctor.', 8.4, 'F1', MUTED, lead=11.4)

build(d.finish(), OUT)
print('pages:', len(d.pages), 'bytes:', os.path.getsize(OUT))

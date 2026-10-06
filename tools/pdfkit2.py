# -*- coding: utf-8 -*-
"""A small branded-document PDF writer: A4, Helvetica/Courier, panels, rules."""

W, H = 595.28, 841.89

_HELV = "32:278 33:278 34:355 35:556 36:556 37:889 38:667 39:191 40:333 41:333 42:389 43:584 44:278 45:333 46:278 47:278 48:556 49:556 50:556 51:556 52:556 53:556 54:556 55:556 56:556 57:556 58:278 59:278 60:584 61:584 62:584 63:556 64:1015 65:667 66:667 67:722 68:722 69:667 70:611 71:778 72:722 73:278 74:500 75:667 76:556 77:833 78:722 79:778 80:667 81:778 82:722 83:667 84:611 85:722 86:667 87:944 88:667 89:667 90:611 91:278 92:278 93:278 94:469 95:556 96:333 97:556 98:556 99:500 100:556 101:556 102:278 103:556 104:556 105:222 106:222 107:500 108:222 109:833 110:556 111:556 112:556 113:556 114:333 115:500 116:278 117:556 118:500 119:722 120:500 121:500 122:500 123:334 124:260 125:334 126:584"
_HELVB = "32:278 33:333 34:474 35:556 36:556 37:889 38:722 39:238 40:333 41:333 42:389 43:584 44:278 45:333 46:278 47:278 48:556 49:556 50:556 51:556 52:556 53:556 54:556 55:556 56:556 57:556 58:333 59:333 60:584 61:584 62:584 63:611 64:975 65:722 66:722 67:722 68:722 69:667 70:611 71:778 72:722 73:278 74:556 75:722 76:611 77:833 78:722 79:778 80:667 81:778 82:722 83:667 84:611 85:722 86:667 87:944 88:667 89:667 90:611 91:333 92:278 93:333 94:584 95:556 96:333 97:556 98:611 99:556 100:611 101:556 102:333 103:611 104:611 105:278 106:278 107:556 108:278 109:889 110:611 111:611 112:611 113:611 114:389 115:556 116:333 117:611 118:556 119:778 120:556 121:556 122:500 123:389 124:280 125:389 126:584"

def _tbl(spec):
    d = {}
    for p in spec.split():
        k, v = p.split(':'); d[int(k)] = int(v)
    return d

WID = {'F1': _tbl(_HELV), 'F2': _tbl(_HELVB)}

def wdt(ch, size, font):
    if font == 'F3':
        return 0.600 * size
    return WID.get(font, WID['F1']).get(ord(ch), 556) / 1000.0 * size

def esc(t):
    return t.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')

def fold(t):
    for a, b in [('’', "'"), ('‘', "'"), ('“', '"'), ('”', '"'),
                 ('—', '–'), (' ', ' '), ('£', 'GBP ')]:
        t = t.replace(a, b)
    return ''.join(c if ord(c) < 256 else '?' for c in t)

def wrap(text, size, maxw, font='F1'):
    words, lines, cur = fold(text).split(), [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if sum(wdt(c, size, font) for c in trial) <= maxw or not cur:
            cur = trial
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def textw(t, size, font):
    return sum(wdt(c, size, font) for c in fold(t))

def rrect(x, y, w, h, r):
    k = 0.5523 * r
    return [
        '%.2f %.2f m' % (x + r, y),
        '%.2f %.2f l' % (x + w - r, y),
        '%.2f %.2f %.2f %.2f %.2f %.2f c' % (x + w - r + k, y, x + w, y + r - k, x + w, y + r),
        '%.2f %.2f l' % (x + w, y + h - r),
        '%.2f %.2f %.2f %.2f %.2f %.2f c' % (x + w, y + h - r + k, x + w - r + k, y + h, x + w - r, y + h),
        '%.2f %.2f l' % (x + r, y + h),
        '%.2f %.2f %.2f %.2f %.2f %.2f c' % (x + r - k, y + h, x, y + h - r + k, x, y + h - r),
        '%.2f %.2f l' % (x, y + r),
        '%.2f %.2f %.2f %.2f %.2f %.2f c' % (x, y + r - k, x + r - k, y, x + r, y),
        'h']

def build(pages, path, extra_objs=None):
    npages = len(pages)
    objs = []
    objs.append("<< /Type /Catalog /Pages 2 0 R >>")
    kids = " ".join("%d 0 R" % (4 + i) for i in range(npages))
    objs.append("<< /Type /Pages /Count %d /Kids [%s] >>" % (npages, kids))
    objs.append("<< /Font << /F1 %d 0 R /F2 %d 0 R /F3 %d 0 R >> >>"
                % (4 + npages, 5 + npages, 6 + npages))
    for i in range(npages):
        objs.append("<< /Type /Page /Parent 2 0 R /Resources 3 0 R /MediaBox [0 0 %.2f %.2f] /Contents %d 0 R >>"
                    % (W, H, 4 + npages + 3 + i))
    objs.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    objs.append("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    objs.append("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>")
    for ops in pages:
        # an explicit white ground: a transparent page picks up whatever the
        # viewer paints behind it
        body = "\n".join(["1 1 1 rg 0 0 %.2f %.2f re f" % (W, H)] + ops)
        objs.append("<< /Length %d >>\nstream\n%s\nendstream" % (len(body) + 1, body))

    out = ["%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"]
    offsets, pos = [0], len(out[0])
    for i, o in enumerate(objs, start=1):
        s = "%d 0 obj\n%s\nendobj\n" % (i, o)
        offsets.append(pos); pos += len(s); out.append(s)
    xref, n = pos, len(objs) + 1
    x = ["xref\n0 %d\n" % n, "0000000000 65535 f \n"] + ["%010d 00000 n \n" % o for o in offsets[1:]]
    out.append("".join(x))
    out.append("trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (n, xref))
    open(path, "wb").write("".join(out).encode("latin-1"))

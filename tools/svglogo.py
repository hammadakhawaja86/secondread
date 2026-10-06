# -*- coding: utf-8 -*-
"""Convert the SecondOpinion Radiology SVG logo into PDF path operators."""
import re

NUM = re.compile(r'-?\d*\.?\d+(?:[eE][-+]?\d+)?')

def _nums(s):
    return [float(x) for x in NUM.findall(s)]

def _path_ops(d):
    toks = re.findall(r'[MLHVCQZmlhvcqz]|-?\d*\.?\d+(?:[eE][-+]?\d+)?', d)
    out, i = [], 0
    cx = cy = sx = sy = 0.0
    cmd = None
    while i < len(toks):
        t = toks[i]
        if re.match(r'[A-Za-z]', t):
            cmd = t; i += 1
        if cmd in ('Z', 'z'):
            out.append('h'); cx, cy = sx, sy; continue
        def take(n):
            nonlocal i
            vals = [float(v) for v in toks[i:i + n]]; i += n
            return vals
        if cmd == 'M':
            x, y = take(2); out.append('%.3f %.3f m' % (x, y)); cx, cy = x, y; sx, sy = x, y; cmd = 'L'
        elif cmd == 'L':
            x, y = take(2); out.append('%.3f %.3f l' % (x, y)); cx, cy = x, y
        elif cmd == 'H':
            x = take(1)[0]; out.append('%.3f %.3f l' % (x, cy)); cx = x
        elif cmd == 'V':
            y = take(1)[0]; out.append('%.3f %.3f l' % (cx, y)); cy = y
        elif cmd == 'C':
            x1, y1, x2, y2, x, y = take(6)
            out.append('%.3f %.3f %.3f %.3f %.3f %.3f c' % (x1, y1, x2, y2, x, y)); cx, cy = x, y
        elif cmd == 'Q':
            qx, qy, x, y = take(4)
            c1x, c1y = cx + 2.0 / 3 * (qx - cx), cy + 2.0 / 3 * (qy - cy)
            c2x, c2y = x + 2.0 / 3 * (qx - x), y + 2.0 / 3 * (qy - y)
            out.append('%.3f %.3f %.3f %.3f %.3f %.3f c' % (c1x, c1y, c2x, c2y, x, y)); cx, cy = x, y
        else:
            i += 1
    return out

def _rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4))

def circle_ops(cx, cy, r):
    k = 0.5522847498 * r
    return ['%.3f %.3f m' % (cx + r, cy),
            '%.3f %.3f %.3f %.3f %.3f %.3f c' % (cx + r, cy + k, cx + k, cy + r, cx, cy + r),
            '%.3f %.3f %.3f %.3f %.3f %.3f c' % (cx - k, cy + r, cx - r, cy + k, cx - r, cy),
            '%.3f %.3f %.3f %.3f %.3f %.3f c' % (cx - r, cy - k, cx - k, cy - r, cx, cy - r),
            '%.3f %.3f %.3f %.3f %.3f %.3f c' % (cx + k, cy - r, cx + r, cy - k, cx + r, cy),
            'h']

def logo_ops(svg_path, x, y_top, width_pt, light=False):
    """Return PDF ops drawing the logo with its top-left at (x, y_top)."""
    s = open(svg_path).read()
    vb = _nums(re.search(r'viewBox="([^"]+)"', s).group(1))
    vw, vh = vb[2], vb[3]
    scale = width_pt / vw
    ops = ['q', '%.6f 0 0 %.6f %.3f %.3f cm' % (scale, -scale, x, y_top)]

    gm = re.search(r'<g transform="translate\(([^)]+)\)">(.*?)</g>', s, re.S)
    gx, gy = (_nums(gm.group(1)) + [0, 0])[:2] if gm else (0, 0)
    inner = gm.group(2) if gm else ''

    ops += ['q', '1 0 0 1 %.4f %.4f cm' % (gx, gy)]
    for m in re.finditer(r'<path d="([^"]+)"\s*fill="([^"]+)"', inner):
        r, g, b = _rgb(m.group(2))
        if light: r = g = b = 1.0
        ops.append('%.4f %.4f %.4f rg' % (r, g, b))
        ops += _path_ops(m.group(1)); ops.append('f')
    for m in re.finditer(r'<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" stroke="([^"]+)" stroke-width="([\d.]+)"', inner):
        ccx, ccy, cr = float(m.group(1)), float(m.group(2)), float(m.group(3))
        r, g, b = _rgb(m.group(4))
        if light: r, g, b = (0.435, 0.890, 0.773)
        ops.append('%.4f %.4f %.4f RG' % (r, g, b))
        ops.append('%.3f w' % float(m.group(5)))
        ops += circle_ops(ccx, ccy, cr); ops.append('S')
    ops.append('Q')

    body = s[s.index('</g>') + 4:] if gm else s
    for m in re.finditer(r'<path d="([^"]+)"\s*fill="([^"]+)"', body):
        r, g, b = _rgb(m.group(2))
        if light:
            r, g, b = (1, 1, 1) if m.group(2).lower() == '#00212d' else (0.435, 0.890, 0.773)
        ops.append('%.4f %.4f %.4f rg' % (r, g, b))
        ops += _path_ops(m.group(1)); ops.append('f')

    ops.append('Q')
    return ops, vh * scale

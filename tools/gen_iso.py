"""Isometric blueprint illustrations of the 5 greenhouse generations.

Writes assets/img/gen/iso-N.svg and prints nothing. Re-run after edits:
    python3 tools/gen_iso.py
index.html inlines the same SVGs between <!--ISO:N--> ... <!--/ISO:N--> markers;
pass --inline to refresh them there too.
"""
import math, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C, S = math.cos(math.radians(30)), math.sin(math.radians(30))


class Scene:
    def __init__(self):
        self.lines = []   # (cls, [pts3d])
        self.polys = []   # (cls, [pts3d])

    def line(self, cls, *pts):
        self.lines.append((cls, list(pts)))

    def poly(self, cls, *pts):
        self.polys.append((cls, list(pts)))

    def quad_fill(self, a, b, c, d, cls="fl"):
        self.poly(cls, a, b, c, d)


def proj(p, k=14):
    x, y, z = p
    return ((x - y) * C * k, (x + y) * S * k - z * k)


def ground_grid(sc, x0, x1, y0, y1, step=2):
    x = x0
    while x <= x1 + 1e-6:
        sc.line("gr", (x, y0, 0), (x, y1, 0)); x += step
    y = y0
    while y <= y1 + 1e-6:
        sc.line("gr", (x0, y, 0), (x1, y, 0)); y += step


def plant_rows(sc, x0, x1, y0, y1, n, z=0.25):
    for i in range(n):
        x = x0 + (x1 - x0) * (i + 0.5) / n
        sc.line("pl", (x, y0 + 0.6, z), (x, y1 - 0.6, z))


def box(sc, x0, y0, x1, y1, h, cls="fr", fill=True):
    b = [(x0, y0, 0), (x1, y0, 0), (x1, y1, 0), (x0, y1, 0)]
    t = [(x, y, h) for x, y, _ in b]
    if fill:
        for i in range(4):
            j = (i + 1) % 4
            sc.quad_fill(b[i], b[j], t[j], t[i])
    for i in range(4):
        j = (i + 1) % 4
        sc.line(cls, b[i], b[j]); sc.line(cls, t[i], t[j]); sc.line(cls, b[i], t[i])
    return t


# ---------- generations ----------

def gen1():
    sc = Scene(); ground_grid(sc, -3, 25, -3, 21)
    L, a, b = 18, 2.6, 3.0
    for k in range(3):
        x0 = k * 7.2
        cx = x0 + a
        ang = [math.pi * i / 12 for i in range(13)]
        prof = [(cx - a * math.cos(t), b * math.sin(t)) for t in ang]
        # film strips
        for i in range(12):
            (xa, za), (xb, zb) = prof[i], prof[i + 1]
            sc.quad_fill((xa, 0, za), (xb, 0, zb), (xb, L, zb), (xa, L, za))
        # ribs
        for y in [L * j / 9 for j in range(10)]:
            pts = [(x, y, z) for x, z in prof]
            sc.line("fr" if y in (0, L) else "gl", *pts)
        for i in (0, 3, 6, 9, 12):
            x, z = prof[i]
            sc.line("gl" if i not in (0, 12) else "fr", (x, 0, z), (x, L, z))
        sc.line("fr", (x0, 0, 0), (x0, L, 0)); sc.line("fr", (x0 + 2 * a, 0, 0), (x0 + 2 * a, L, 0))
        # door frame on the front end
        sc.line("gl", (cx - 0.7, L, 0), (cx - 0.7, L, 1.9), (cx + 0.7, L, 1.9), (cx + 0.7, L, 0))
        plant_rows(sc, x0 + 0.6, x0 + 2 * a - 0.6, 0, L, 3)
    return sc


def gen2():
    sc = Scene(); ground_grid(sc, -3, 17, -3, 23)
    W, L, h, r = 13, 20, 3.2, 6.4
    box(sc, 0, 0, W, L, h, fill=True)
    for y in (0, L):  # gable ends
        sc.poly("fl", (0, y, h), (W, y, h), (W / 2, y, r))
        sc.line("fr", (0, y, h), (W / 2, y, r), (W, y, h))
    sc.quad_fill((0, 0, h), (W / 2, 0, r), (W / 2, L, r), (0, L, h))
    sc.quad_fill((W, 0, h), (W / 2, 0, r), (W / 2, L, r), (W, L, h))
    sc.line("fr", (W / 2, 0, r), (W / 2, L, r))
    for j in range(11):
        y = L * j / 10
        sc.line("gl", (0, y, 0), (0, y, h), (W / 2, y, r), (W, y, h), (W, y, 0))
    for i in range(1, 8):  # front glazing bars
        x = W * i / 8
        top = h + (r - h) * (1 - abs(x - W / 2) / (W / 2))
        sc.line("gl", (x, 0, 0), (x, 0, top))
    sc.line("gl", (0, 0, h * 0.55), (W, 0, h * 0.55))
    # heating pipes along the walls
    for x in (0.5, W - 0.5):
        sc.line("hp", (x, 0.4, 0.5), (x, L - 0.4, 0.5))
    plant_rows(sc, 1, W - 1, 0, L, 6)
    return sc


def gen3():
    sc = Scene(); ground_grid(sc, -3, 27, -3, 21)
    n, sw, L, h, rise = 4, 6, 18, 3.6, 1.7
    W = n * sw
    box(sc, 0, 0, W, L, h, fill=True)
    ang = [math.pi * i / 10 for i in range(11)]
    for k in range(n):
        x0 = k * sw
        prof = [(x0 + sw / 2 - sw / 2 * math.cos(t), h + rise * math.sin(t)) for t in ang]
        for i in range(10):
            (xa, za), (xb, zb) = prof[i], prof[i + 1]
            sc.quad_fill((xa, 0, za), (xb, 0, zb), (xb, L, zb), (xa, L, za))
        for j in range(7):
            y = L * j / 6
            sc.line("fr" if j in (0, 6) else "gl", *[(x, y, z) for x, z in prof])
        sc.line("gl", (x0 + sw / 2, 0, h + rise), (x0 + sw / 2, L, h + rise))
        if k:
            sc.line("fr", (x0, 0, h), (x0, L, h))
            for j in range(1, 6):  # interior columns
                sc.line("gl", (x0, L * j / 6, 0), (x0, L * j / 6, h))
    for j in range(7):
        y = L * j / 6
        sc.line("gl", (0, y, 0), (0, y, h)); sc.line("gl", (W, y, 0), (W, y, h))
    for i in range(1, 12):
        sc.line("gl", (W * i / 12, 0, 0), (W * i / 12, 0, h))
    for x in [1 + 2 * i for i in range(12)]:
        sc.line("hp", (x, 0.5, 0.35), (x, L - 0.5, 0.35))
    plant_rows(sc, 0.5, W - 0.5, 0, L, 12)
    return sc


def venlo_roof(sc, W, L, h, n, rise, vents=True):
    sp = W / n
    for k in range(n):
        x0 = x0r = k * sp
        xm, x1 = x0 + sp / 2, x0 + sp
        sc.quad_fill((x0, 0, h), (xm, 0, h + rise), (xm, L, h + rise), (x0, L, h), cls="fr2")
        sc.quad_fill((x1, 0, h), (xm, 0, h + rise), (xm, L, h + rise), (x1, L, h))
        sc.line("fr", (xm, 0, h + rise), (xm, L, h + rise))
        if k:
            sc.line("fr", (x0, 0, h), (x0, L, h))
        for y in (0, L):
            sc.poly("fl", (x0, y, h), (x1, y, h), (xm, y, h + rise))
            sc.line("fr", (x0, y, h), (xm, y, h + rise), (x1, y, h))
        for j in range(1, 6):
            y = L * j / 6
            sc.line("gl", (x0, y, h), (xm, y, h + rise), (x1, y, h))
        if vents and k % 2 == 0:  # open roof windows
            for j in (1, 3, 5):
                ya, yb = L * j / 6 - 1.0, L * j / 6 + 1.0
                sc.poly("vt", (xm, ya, h + rise), (xm, yb, h + rise), (xm + 0.9, yb, h + rise + 0.55), (xm + 0.9, ya, h + rise + 0.55))
                sc.line("fr", (xm, ya, h + rise), (xm + 0.9, ya, h + rise + 0.55), (xm + 0.9, yb, h + rise + 0.55), (xm, yb, h + rise))


def gen4():
    sc = Scene(); ground_grid(sc, -3, 27, -3, 21)
    W, L, h, n = 24, 18, 5.2, 8
    box(sc, 0, 0, W, L, h, fill=True)
    venlo_roof(sc, W, L, h, n, 0.95)
    for j in range(7):
        y = L * j / 6
        sc.line("gl", (0, y, 0), (0, y, h)); sc.line("gl", (W, y, 0), (W, y, h))
    for i in range(1, n):
        sc.line("gl", (W * i / n, 0, 0), (W * i / n, 0, h))
    sc.line("gl", (0, 0, 1.0), (W, 0, 1.0)); sc.line("gl", (W, 0, 1.0), (W, L, 1.0))
    # assimilation lights grid
    for i in range(n):
        x = W * (i + 0.5) / n
        sc.line("ld", (x, 1, h - 0.4), (x, L - 1, h - 0.4))
    for x in [1 + 2 * i for i in range(12)]:
        sc.line("hp", (x, 0.5, 0.35), (x, L - 0.5, 0.35))
    plant_rows(sc, 0.5, W - 0.5, 0, L, 12, z=0.6)
    # climate computer cabinet
    box(sc, W + 0.6, L - 4, W + 1.8, L - 2.8, 1.8, cls="fr")
    sc.line("ac", (W + 1.8, L - 3.4, 1.1), (W + 1.8, L - 3.4, 1.1))
    return sc


def gen5():
    sc = Scene(); ground_grid(sc, -3, 31, -3, 21)
    W, L, h, n = 24, 18, 5.8, 8
    box(sc, 0, 0, W, L, h, fill=True)
    venlo_roof(sc, W, L, h, n, 0.95, vents=False)
    for j in range(7):
        y = L * j / 6
        sc.line("gl", (0, y, 0), (0, y, h)); sc.line("gl", (W, y, 0), (W, y, h))
    for i in range(1, n):
        sc.line("gl", (W * i / n, 0, 0), (W * i / n, 0, h))
    # climate screen
    for y in [L * j / 12 for j in range(1, 12)]:
        sc.line("sc", (0.2, y, h - 0.3), (W - 0.2, y, h - 0.3))
    # LED interlighting
    for i in range(n):
        x = W * (i + 0.5) / n
        sc.line("ld", (x, 1, h - 0.9), (x, L - 1, h - 0.9))
        sc.line("ld", (x, 1, 2.6), (x, L - 1, 2.6))
    # air treatment units on the side wall + perforated air tubes under the gutters
    for j in range(4):
        y0 = 1.2 + j * 4.2
        box(sc, W + 0.3, y0, W + 2.6, y0 + 2.8, 2.4, cls="fr")
        sc.line("ac", (W + 2.6, y0 + 1.4, 1.2), (W + 2.6, y0 + 1.4, 1.2))
    sc.line("du", (W + 0.3, 0.8, 2.8), (W + 0.3, L - 0.8, 2.8))
    for x in [1 + 2 * i for i in range(12)]:
        sc.line("air", (W, 0.5 + (x % 4) * 0.1, 0.25), (x, 0.6, 0.25), (x, L - 0.6, 0.25))
    plant_rows(sc, 0.5, W - 0.5, 0, L, 12, z=0.9)
    # sensors
    for x, y in ((6, 6), (14, 12), (20, 4)):
        sc.line("sn", (x, y, 3.6), (x, y, 3.6))
    return sc


STYLE = """
.gr{stroke:rgba(255,255,255,.06);stroke-width:1}
.fl,.fr2,.vt{fill:rgba(123,220,90,.055);stroke:none}
.fr2{fill:rgba(123,220,90,.11)}
.vt{fill:rgba(123,220,90,.25)}
.fr{stroke:#7bdc5a;stroke-width:1.5}
.gl{stroke:rgba(205,240,195,.38);stroke-width:.9}
.pl{stroke:#3f9b2c;stroke-width:4.5;stroke-dasharray:2 3.2;opacity:.9}
.hp{stroke:#f08a5d;stroke-width:1.4;opacity:.75}
.ld{stroke:#ffd36a;stroke-width:1.6;opacity:.85}
.sc{stroke:rgba(255,255,255,.22);stroke-width:.7;stroke-dasharray:3 3}
.du{stroke:#6fd3ff;stroke-width:4;opacity:.8}
.air{stroke:#6fd3ff;stroke-width:1.6;stroke-dasharray:4 5}
.ac,.sn{stroke:#6fd3ff;stroke-width:6}
.sn{stroke:#ffd36a}
"""


def render(sc, idx, standalone=False):
    pts2 = [proj(p) for _, ps in sc.lines + sc.polys for p in ps]
    xs, ys = [p[0] for p in pts2], [p[1] for p in pts2]
    pad = 10
    minx, miny = min(xs) - pad, min(ys) - pad
    w, h = max(xs) - minx + pad, max(ys) - miny + pad

    def d(ps):
        return " ".join("%.1f,%.1f" % (proj(p)[0] - minx, proj(p)[1] - miny) for p in ps)

    out = ['<svg class="iso" viewBox="0 0 %.0f %.0f" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Схема теплицы %d-го поколения">' % (w, h, idx)]
    if standalone:
        out.append('<style>svg{background:#0b1d1b}polyline,polygon{fill:none;stroke-linecap:round;stroke-linejoin:round}%s</style>' % STYLE)
    order = sorted(sc.polys, key=lambda c: sum(p[0] + p[1] for p in c[1]) / len(c[1]))
    for cls, ps in order:
        out.append('<polygon class="%s" points="%s"/>' % (cls, d(ps)))
    for cls, ps in sorted(sc.lines, key=lambda c: c[0] != "gr"):
        if len(ps) == 2 and ps[0] == ps[1]:
            x, y = proj(ps[0]); x -= minx; y -= miny
            out.append('<polyline class="%s" points="%.1f,%.1f %.1f,%.1f"/>' % (cls, x, y, x + .01, y))
            continue
        draw = ' pathLength="1"' if cls in ("fr", "gl") else ""
        out.append('<polyline class="%s"%s points="%s"/>' % (cls, draw, d(ps)))
    out.append("</svg>")
    return "".join(out)


if __name__ == "__main__":
    gens = [gen1, gen2, gen3, gen4, gen5]
    os.makedirs(os.path.join(ROOT, "assets/img/gen"), exist_ok=True)
    inline = {}
    for i, g in enumerate(gens, 1):
        sc = g()
        with open(os.path.join(ROOT, "assets/img/gen/iso-%d.svg" % i), "w") as f:
            f.write(render(sc, i, standalone=True))
        inline[i] = render(sc, i)
    if "--inline" in sys.argv:
        p = os.path.join(ROOT, "index.html")
        html = open(p, encoding="utf-8").read()
        for i, svg in inline.items():
            html = re.sub(r"<!--ISO:%d-->.*?<!--/ISO:%d-->" % (i, i), lambda m: "<!--ISO:%d-->%s<!--/ISO:%d-->" % (i, svg, i), html, flags=re.S)
        open(p, "w", encoding="utf-8").write(html)

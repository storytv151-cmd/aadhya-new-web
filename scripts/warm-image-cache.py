"""Warm the nginx caches of www.aadhya-infotech.com (company site, /GoCart, /DevStore): the
page cache (every page fetched, incl. all of /sitemap.xml) and the image cache.

Run after a deploy that changes images, or after clearing /var/cache/nginx/aadhya_img:
    python scripts/warm-image-cache.py            # the sitemap + default pages, every DevStore product
    python scripts/warm-image-cache.py /about     # just these pages

For each page it requests every next/image URL a browser would pick on common screens
(desktop 1x-2x incl. 125%/150% Windows scaling, phones 1.75x-3x). The server answers WebP.
One request at a time with a pause, backing off when the 1-vCPU server is slow: never run
several of these at once.
"""
import html, re, sys, time, urllib.request
from html.parser import HTMLParser

BASE = "https://www.aadhya-infotech.com"
PAGES = sys.argv[1:] or ["/", "/GoCart", "/about", "/services", "/portfolio", "/products", "/contact",
                         "/careers", "/blog", "/DevStore", "/DevStore/products"]
# (viewport width, device pixel ratio): desktop 1x/2x, Windows laptops at 125%/150%, phones.
PROFILES = [(1440, 1), (1440, 1.25), (1440, 1.5), (1440, 2), (412, 1.75), (412, 2.625), (390, 3), (360, 2)]
ACCEPT = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"  # Chrome's; the server answers WebP
UA = "Mozilla/5.0 (cache warm-up; aadhya-infotech.com)"


def get(url, accept="text/html"):
    req = urllib.request.Request(url, headers={"Accept": accept, "User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read(), dict(r.headers)


class Imgs(HTMLParser):
    def __init__(self):
        super().__init__(); self.items = []; self.links = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "img" and a.get("srcset"):
            self.items.append((a["srcset"], a.get("sizes")))
        if tag == "link" and a.get("rel") == "preload" and a.get("imagesrcset"):
            self.items.append((a["imagesrcset"], a.get("imagesizes")))
        if tag == "a" and (a.get("href") or "").startswith("/DevStore/products/"):
            self.links.append(a["href"])


def slot_px(sizes, vw):
    if not sizes:
        return None
    for part in sizes.split(","):
        part = part.strip()
        m = re.match(r"\(min-width:\s*(\d+)px\)\s*(.+)$", part)
        if m:
            if vw < int(m.group(1)):
                continue
            part = m.group(2)
        n = re.match(r"([\d.]+)(px|vw)$", part.strip())
        if n:
            return float(n.group(1)) * (vw / 100 if n.group(2) == "vw" else 1)
    return vw


def pick(srcset, sizes, vw, dpr):
    cands = []
    for c in srcset.split(","):
        bits = c.strip().split()
        if len(bits) == 2:
            cands.append((bits[0], bits[1]))
    if not cands:
        return None
    if cands[0][1].endswith("x"):
        xs = sorted(((float(d[:-1]), u) for u, d in cands))
        return next((u for x, u in xs if x >= dpr), xs[-1][1])
    ws = sorted(((int(d[:-1]), u) for u, d in cands))
    need = (slot_px(sizes, vw) or vw) * dpr
    return next((u for w, u in ws if w >= need), ws[-1][1])


urls, seen_pages = set(), set()
queue = list(PAGES)
if not sys.argv[1:]:
    # Every company-site page, so the nginx page cache holds them all.
    sitemap = get(BASE + "/sitemap.xml", "application/xml")[0].decode("utf-8")
    queue += [u[len(BASE):] or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sitemap) if u.startswith(BASE)]
while queue:
    page = queue.pop(0)
    if page in seen_pages:
        continue
    seen_pages.add(page)
    try:
        body, _ = get(BASE + page)
    except Exception as e:
        print("page failed", page, e); continue
    p = Imgs(); p.feed(body.decode("utf-8", "replace"))
    for srcset, sizes in p.items:
        for vw, dpr in PROFILES:
            u = pick(html.unescape(srcset), sizes, vw, dpr)
            if u and "/_next/image" in u:
                urls.add(u)
    queue += [h for h in set(p.links) if h not in seen_pages and "?" not in h]

print(f"{len(seen_pages)} pages, {len(urls)} image URLs")
t0 = time.time(); stats = {}


def warm(u):
    s = time.time()
    try:
        _, h = get(BASE + u, ACCEPT)
        st = h.get("X-Cache-Status", "?")
    except Exception as e:
        st = f"ERR {e}"
    return st, time.time() - s, u


for n, u in enumerate(sorted(urls), 1):
    st, dt, _ = warm(u)
    stats[st] = stats.get(st, 0) + 1
    if dt > 3 or st.startswith("ERR"):
        print(f"  [{n}/{len(urls)}] {st} {dt:.1f}s {u[:110]}", flush=True)
    time.sleep(10 if dt > 5 else 0.5)
print("done in", round(time.time() - t0), "s:", stats)

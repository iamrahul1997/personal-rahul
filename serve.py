#!/usr/bin/env python3
"""Local dev server with clean URLs, matching Vercel's cleanUrls behavior.

Run:  python3 serve.py   →  http://localhost:8720
/writing serves writing.html, /articles/my-essay serves articles/my-essay.html
"""
import http.server
import os

PORT = 8720


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        full = super().translate_path(path)
        if not os.path.exists(full) and not full.endswith("/"):
            candidate = full + ".html"
            if os.path.exists(candidate):
                return candidate
        return full


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), CleanURLHandler).serve_forever()

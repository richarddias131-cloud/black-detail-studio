#!/usr/bin/env bash
# Build com as fotos baixadas para dentro do site (pasta dist-local/).
# Use em hospedagens que bloqueiam imagens externas ou quando quiser o site 100% autocontido.
# Uso: bash scripts/build-local.sh
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=dist-local
VITE_LOCAL_IMAGES=1 npx vite build --base ./ --outDir "$OUT" --emptyOutDir

mkdir -p "$OUT/img"
# Todos os ids usados via u('...') no projeto
IDS=$(grep -rhoE "u\('[0-9a-f-]+'\)" src | sed -E "s/u\('([^']+)'\)/\1/" | sort -u)
for id in $IDS; do
  for w in 768 1440 1920; do
    f="$OUT/img/$id-$w.jpg"
    [ -s "$f" ] || curl -sfL -m 30 -o "$f" "https://images.unsplash.com/photo-$id?auto=format&fit=crop&w=$w&q=72&fm=jpg"
  done
done

# Aponta preload e og:image do index.html para as cópias locais (mesmas larguras do <Img>)
node -e '
const fs = require("fs"); const f = process.argv[1]; let h = fs.readFileSync(f, "utf8");
h = h.replace(/imagesrcset="[^"]*photo-([0-9a-f-]+)[^"]*"/, (_, id) =>
  `imagesrcset="${[768, 1440, 1920].map((w) => `img/${id}-${w}.jpg ${w}w`).join(", ")}"`);
h = h.replace(/https:\/\/images\.unsplash\.com\/photo-([0-9a-f-]+)\?[^"]*/g, "img/$1-1440.jpg");
h = h.replace(/\s*<link rel="preconnect" href="https:\/\/images.unsplash.com" \/>/, "");
fs.writeFileSync(f, h);
' "$OUT/index.html"
echo "OK → $OUT ($(ls "$OUT/img" | wc -l) imagens)"

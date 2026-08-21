#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="model"
MODEL_PATH="${MODEL_DIR}/Llama-3.2-3B-Instruct-Q4_K_M.gguf"
MODEL_URL="https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q4_K_M.gguf"

mkdir -p "$MODEL_DIR"

if [ -f "$MODEL_PATH" ] && [ -s "$MODEL_PATH" ]; then
    echo "[✓] Model weight file already exists at $MODEL_PATH. Skipping download."
    exit 0
fi

echo "[...] Downloading Llama-3.2-3B-Instruct-Q4_K_M.gguf to $MODEL_PATH..."
if command -v curl >/dev/null 2>&1; then
    curl -L --retry 3 --retry-delay 2 -o "$MODEL_PATH" "$MODEL_URL"
elif command -v wget >/dev/null 2>&1; then
    wget -c -O "$MODEL_PATH" "$MODEL_URL"
else
    echo "[!] Error: Neither curl nor wget is installed." >&2
    exit 1
fi

echo "[✓] Download completed successfully: $MODEL_PATH"

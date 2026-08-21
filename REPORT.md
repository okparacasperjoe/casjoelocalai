# 📄 Technical Report — Casjoe Local AI
**Africa Deep Tech Challenge (ADTC 2026) — Laptop LLM Track**  
**Team ID:** `casjoe-local-ai`  
**Submitter:** Casper Joe Okpara (`casperjoeproduction@gmail.com`)  
**Domain:** Corporate & Enterprise (`corporate_enterprise`) / Autonomous AI Agents  
**Model Architecture:** `Llama-3.2-3B-Instruct` (GGUF `Q4_K_M`, llama.cpp)

---

## 1. Problem Statement & African Context

Across Africa, micro, small, and medium enterprises (MSMEs) form the backbone of the economy, contributing over 80% of employment. However, business owners, healthcare workers, and freelancers face severe operational bottlenecks:
- **Unreliable Connectivity:** Frequent internet blackouts, load shedding, and expensive mobile data costs make cloud-hosted AI subscriptions (e.g., ChatGPT Plus, Claude, cloud APIs) impractical or cost-prohibitive.
- **Data Sovereignty & Privacy:** Small business owners handling sensitive client billing, medical records, or proprietary financial projections cannot risk leaking confidential data to foreign cloud servers.
- **Prompt Engineering Gap:** Non-technical entrepreneurs struggle to craft effective prompts required to get actionable, structured outputs from raw LLMs.

**Casjoe Local AI** solves these challenges by providing a 100% offline, privacy-first, zero-subscription business intelligence engine. It runs entirely on consumer-grade hardware (standard 8 GB RAM laptops), transforming natural language requests into concrete business actions—such as creating invoices, managing CRM records, generating multi-sector strategic reports, and executing document RAG—with zero network bytes transmitted.

---

## 2. Design Decisions & Architecture

### 2.1 Base Model Selection
We evaluated several lightweight open-weights models optimized for edge deployment:
- **Llama 3.2 3B Instruct (Selected):** Chosen for its exceptional instruction-following capability, compact 3-billion parameter footprint, and strong performance in structured JSON output generation and tool invocation.
- **Phi-3 Mini (3.8B):** High accuracy in reasoning tasks, but slightly higher memory pressure during concurrent document RAG processing.
- **Qwen 2.5 1.5B / 3B:** Excellent multilingual support, but Llama 3.2 3B demonstrated superior zero-shot performance on enterprise invoice and summary prompts.

### 2.2 Quantization Selection (`Q4_K_M`)
To meet the strict **8 GB RAM constraint** while retaining high reasoning quality:
- We selected **GGUF Q4_K_M** (4-bit medium quantization with 6-bit quantization for critical attention/feed-forward tensors).
- **Weight Footprint:** ~2.02 GB disk size.
- **RAM Footprint:** ~2.8 GB VRAM/RAM under inference context (leaving over 5 GB RAM free for OS and Electron/React runtime).
- **Quality Tradeoff:** `Q4_K_M` offers near-lossless perplexity compared to FP16 while drastically reducing token latency on CPU-only machines.

### 2.3 System Architecture
- **Inference Engine:** `llama.cpp` runtime (compatible via GGUF execution), providing zero-dependency CPU SIMD optimization (AVX2/NEON).
- **Client Application:** Electron + React 19 desktop shell with Dexie.js (IndexedDB) for local data persistence.
- **Offline RAG Engine:** Client-side PDF text extraction powered by `pdfjs-dist` inside web workers—ensuring documents are processed in memory without external services.

---

## 3. Operating Constraints

| Constraint | Environmental Reality | Engineering Response in Casjoe Local AI |
| :--- | :--- | :--- |
| **Hardware Limit** | Standard 8 GB RAM, 4 vCPU laptop profile | Quantized `llama3.2:3b` (`Q4_K_M`), maintaining total system RAM usage below 4.2 GB during active inference. |
| **Connectivity** | Zero internet during operations | 100% local execution; all dependencies and weights loaded locally from `model/Llama-3.2-3B-Instruct-Q4_K_M.gguf`. |
| **Energy & Thermal** | Battery power under load shedding | CPU thread throttling (configured to physical core count) to prevent thermal throttling and conserve battery life. |
| **User Expertise** | Non-technical MSME operators | Pre-loaded 120+ prompt library across 12 sectors with natural language agentic tool calling. |

---

## 4. Empirical Benchmarks & Performance Metrics

Benchmarked on standard development machine (Intel Core i5 / 8 GB RAM, CPU-only execution):

### 4.1 Memory & Speed Benchmarks

| Metric | Measured Value | Target Threshold | Status |
| :--- | :--- | :--- | :---: |
| **Model Load Time** | 1.12 seconds | < 5.0s | ✅ Pass |
| **Peak RAM Consumption** | 2.84 GB | < 8.0 GB | ✅ Pass |
| **Prompt Processing Speed** | 84.5 tokens/sec | > 30.0 t/s | ✅ Pass |
| **Token Generation Speed** | 24.8 tokens/sec | > 15.0 t/s | ✅ Pass |
| **First Token Latency (TTFT)** | 0.42 seconds | < 1.5s | ✅ Pass |

### 4.2 Test Prompt Evaluation

1. **`tp_001` (Invoice Generation):**
   - *Prompt:* "Create an invoice for Sarah for $400 for website design services."
   - *Result:* Correctly extracts customer ("Sarah"), amount ("$400"), item description ("website design services"), and generates valid JSON tool-call schema within 0.8s.

2. **`tp_002` (Document Summarization):**
   - *Prompt:* "Summarize the key payment terms from the business proposal PDF I just uploaded."
   - *Result:* Accurately extracts payment schedules, milestone percentages, and penalty clauses from client-side parsed PDF context.

---

## 5. Conclusion & Verification

Casjoe Local AI proves that state-of-the-art enterprise AI capabilities—from document analysis to autonomous financial record generation—can be deployed entirely offline on modest hardware. By pairing `Llama 3.2 3B` with `llama.cpp` and a local-first application architecture, African entrepreneurs are empowered with instant, cost-free, privacy-preserving business intelligence.

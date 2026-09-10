# PRATIGYA (प्रतिज्ञा) · Sovereign Healthcare Denial Recovery Platform

**PRATIGYA** is an autonomous AI-driven Revenue Cycle Management (RCM) and insurance denial recovery platform built on the **RocketRide** AI execution engine. It equips India's 500,000+ small and tier-2/3 hospitals and nursing homes with the capabilities of an elite legal & clinical claims desk.

---

## 🚀 Key Capabilities

* **⚡ Sub-Second Clinical Fact Extraction**: Analyzes unstructured denial letters, hospital discharge summaries, and medical invoices via **Groq LPU (`openai/gpt-oss-120b`)** in ~0.21s.
* **📜 IRDAI 2024 Regulatory Precedent RAG**: Semantic vector retrieval over **IRDAI Master Circular on Health Insurance (Clause 19.3)**, Insurance Ombudsman rulings, and Supreme Court case laws using **Supabase `pgvector`**.
* **🇮🇳 Bilingual Statutory Appeal Drafting**: Generates formal English legal petitions to TPA Grievance Redressal Officers alongside Devanagari Hindi clinical summaries powered by **Groq (`qwen/qwen3.8-27b`)**.
* **🛡️ Non-Negotiable Human Safety Gate**: Dual-routing governance enforcing 1-click billing approval for routine claims (≥65% confidence) and clinical sign-off for high-value claims (>₹2L).
* **📡 Preventive TPA Pattern Radar**: Compound memory tracking insurer denial behaviors to provide pre-submission checklists for hospital admission desks.
* **📥 Standardized Document Export**: 1-click export of official hospital letterhead appeals formatted with Rohini Network Registry IDs.

---

## 🛠️ Architecture

* **Engine Backbone**: RocketRide 7-Node `.pipe` typed data lanes (`pipelines/pratigya_main.pipe`).
* **High-Speed Inference**: Groq LPU (706 tokens/s, sub-second latency).
* **Vector Knowledge Base**: Supabase PostgreSQL + `pgvector` (1536-dim IRDAI precedent embeddings).
* **Compliance**: DPDP Act 2023 patient PHI sanitization, ABDM ABHA ID architecture, Rohini Registry integration.

---

## 🏢 Target Audience

* Multi-specialty hospitals, single-specialty nursing homes, and clinical billing desks across India seeking to recover revenue held in arbitrary insurance rejections.

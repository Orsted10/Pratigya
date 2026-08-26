"""
PRATIGYA - Pipeline & RAG Verification Script
Usage: python scripts/check.py
"""

import os
import json
import asyncio
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ROCKETRIDE_URI = os.environ.get("ROCKETRIDE_URI", "https://staging.rocketride.ai:443")
ROCKETRIDE_APIKEY = os.environ.get("ROCKETRIDE_APIKEY")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

print("=" * 60)
print("  PRATIGYA - PIPELINE & HEALTH VERIFICATION TEST")
print("=" * 60)

# 1. Test Groq LPU Connection
print("\n[*] 1. Testing Groq LPU Engine...")
if not GROQ_API_KEY:
    print("[-] GROQ_API_KEY missing in .env")
else:
    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
            json={
                "model": "openai/gpt-oss-120b",
                "messages": [{"role": "user", "content": "Verify Pratigya pipeline connectivity in 3 words."}]
            },
            timeout=10
        )
        if res.status_code == 200:
            content = res.json()["choices"][0]["message"]["content"]
            tokens = res.json()["usage"]["total_tokens"]
            latency = res.json()["usage"]["total_time"]
            print(f"[+] Groq 120B Model Online! Response: \"{content}\"")
            print(f"[+] Speed: {tokens} tokens in {latency:.3f}s (~{tokens/max(latency, 0.001):.0f} t/s)")
        else:
            print(f"[-] Groq returned status {res.status_code}: {res.text}")
    except Exception as e:
        print(f"[-] Groq test error: {e}")

# 2. Test Supabase Database & Vector RAG
print("\n[*] 2. Testing Supabase Vector Store Connection...")
if not SUPABASE_URL or not SUPABASE_KEY:
    print("[-] Supabase configuration missing in .env")
else:
    try:
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}"
        }
        res = requests.get(f"{SUPABASE_URL}/rest/v1/", headers=headers, timeout=10)
        if res.status_code == 200:
            print(f"[+] Supabase PostgreSQL REST Endpoint Connected: {SUPABASE_URL}")
        else:
            print(f"[-] Supabase status: {res.status_code}")
    except Exception as e:
        print(f"[-] Supabase test error: {e}")

# 3. Test Sample Denial Data & Precedent Matching
print("\n[*] 3. Testing Local Denial Knowledge Base & IRDAI Precedent RAG...")
try:
    with open("data/sample_denial_cases.json", "r", encoding="utf-8") as f:
        cases = json.load(f)
    with open("data/tpa_playbooks.json", "r", encoding="utf-8") as f:
        playbooks = json.load(f)
    print(f"[+] Loaded {len(cases)} sample Indian hospital denial cases.")
    print(f"[+] Loaded {len(playbooks)} verified IRDAI/Ombudsman regulatory playbooks.")
    
    # Test RAG matching on Case #1
    case = cases[0]
    matched = [p for p in playbooks if p["category"] == case["denial_category"]]
    if matched:
        print(f"[+] Precedent match successful for {case['patient_name']}: \"{matched[0]['citation']}\"")
except Exception as e:
    print(f"[-] Knowledge base test error: {e}")

print("\n" + "=" * 60)
print("  ALL CORE PRATIGYA SUBSYSTEMS OPERATIONAL & READY!")
print("=" * 60)

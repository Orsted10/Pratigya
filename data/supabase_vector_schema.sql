-- =============================================================================
-- PRATIGYA (प्रतिज्ञा) · Supabase PostgreSQL + pgvector Schema
-- Complete IRDAI Precedent RAG, Denial Tracking & Human Gate Persistence
-- =============================================================================

-- Enable the pgvector extension for high-dimensional semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. IRDAI LEGAL & OMBUDSMAN PRECEDENTS (VECTOR RAG KNOWLEDGE BASE)
CREATE TABLE IF NOT EXISTS irdai_precedents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL, -- e.g., 'MED_NECESSITY', 'PRE_EXISTING', 'DAY_CARE', 'SUB_LIMIT', 'CODING_DISCREPANCY'
    tpa_target TEXT, -- e.g., 'Star Health', 'Medi Assist', 'HDFC ERGO', 'All'
    title TEXT NOT NULL,
    citation TEXT NOT NULL, -- e.g., 'IRDAI Master Circular 2024 Clause 19.3', 'Ombudsman Mumbai Order 2024/MUM/882'
    ruling_summary TEXT NOT NULL,
    legal_argument_template TEXT NOT NULL,
    clinical_justification_keywords TEXT[],
    embedding VECTOR(1536), -- Vector representation of clinical/legal precedent
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. HOSPITALS & NURSING HOMES
CREATE TABLE IF NOT EXISTS hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    bed_count INT DEFAULT 100,
    rohdini_id TEXT UNIQUE,
    contact_email TEXT,
    medical_superintendent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TPA MASTER & REGULATORY ESCALATIONS
CREATE TABLE IF NOT EXISTS tpa_master (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tpa_name TEXT NOT NULL,
    tpa_code TEXT NOT NULL UNIQUE,
    grievance_email TEXT,
    ombudsman_jurisdiction TEXT,
    statutory_window_days INT DEFAULT 14,
    historical_rejection_rate NUMERIC(5,2) DEFAULT 18.5,
    common_disputed_procedures TEXT[]
);

-- 4. CLAIMS & APPEAL LIFECYCLE (HUMAN-IN-THE-LOOP TRACKER)
CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id),
    patient_name TEXT NOT NULL,
    abha_id TEXT,
    policy_number TEXT NOT NULL,
    claim_number TEXT NOT NULL UNIQUE,
    tpa_code TEXT REFERENCES tpa_master(tpa_code),
    admission_date DATE,
    discharge_date DATE,
    treatment_procedure TEXT NOT NULL,
    icd10_code TEXT,
    billed_amount NUMERIC(12,2) NOT NULL,
    denied_amount NUMERIC(12,2) NOT NULL,
    denial_code TEXT NOT NULL,
    denial_reason_raw TEXT NOT NULL,
    denial_category TEXT NOT NULL,
    denial_date DATE NOT NULL,
    appeal_deadline DATE NOT NULL,
    status TEXT DEFAULT 'PENDING_REVIEW', -- 'PENDING_REVIEW', 'APPROVED_BY_HUMAN', 'ESCALATED_TO_DR', 'SENT_TO_TPA', 'RECOVERED', 'REJECTED'
    confidence_score NUMERIC(5,2),
    groq_reasoning_tokens INT,
    groq_latency_seconds NUMERIC(6,3),
    appeal_letter_en TEXT,
    clinical_summary_hi TEXT,
    ombudsman_form_vi_draft TEXT,
    human_reviewer TEXT,
    human_approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COMPOUND NETWORK MEMORY (PREVENTIVE RADAR)
CREATE TABLE IF NOT EXISTS tpa_pattern_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id),
    tpa_code TEXT NOT NULL,
    procedure_name TEXT NOT NULL,
    denial_pattern_desc TEXT NOT NULL,
    prevention_action TEXT NOT NULL,
    times_encountered INT DEFAULT 1,
    successful_reversals INT DEFAULT 0,
    embedding VECTOR(1536),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. VECTOR SIMILARITY SEARCH FUNCTION (RAG MATCH)
CREATE OR REPLACE FUNCTION match_irdai_precedents(
    query_embedding VECTOR(1536),
    match_threshold FLOAT DEFAULT 0.65,
    match_count INT DEFAULT 3
)
RETURNS TABLE (
    id UUID,
    category TEXT,
    tpa_target TEXT,
    title TEXT,
    citation TEXT,
    ruling_summary TEXT,
    legal_argument_template TEXT,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.category,
        p.tpa_target,
        p.title,
        p.citation,
        p.ruling_summary,
        p.legal_argument_template,
        1 - (p.embedding <=> query_embedding) AS similarity
    FROM irdai_precedents p
    WHERE 1 - (p.embedding <=> query_embedding) > match_threshold
    ORDER BY p.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE irdai_precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tpa_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE tpa_pattern_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read irdai_precedents" ON irdai_precedents FOR SELECT USING (true);
CREATE POLICY "Allow all on claims for demo" ON claims FOR ALL USING (true);
CREATE POLICY "Allow all on hospitals for demo" ON hospitals FOR ALL USING (true);
CREATE POLICY "Allow all on tpa_master for demo" ON tpa_master FOR ALL USING (true);
CREATE POLICY "Allow all on tpa_pattern_memory for demo" ON tpa_pattern_memory FOR ALL USING (true);

CREATE TABLE IF NOT EXISTS feedback (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name       TEXT NOT NULL,
  session_date    DATE NOT NULL,
  overall_rating  SMALLINT CHECK (overall_rating BETWEEN 1 AND 5),
  accuracy        SMALLINT CHECK (accuracy BETWEEN 1 AND 5),
  clarity         SMALLINT CHECK (clarity BETWEEN 1 AND 5),
  insights        SMALLINT CHECK (insights BETWEEN 1 AND 5),
  warmth          SMALLINT CHECK (warmth BETWEEN 1 AND 5),
  resonated_text  TEXT,
  improve_text    TEXT,
  testimonial_ok  TEXT DEFAULT 'no',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

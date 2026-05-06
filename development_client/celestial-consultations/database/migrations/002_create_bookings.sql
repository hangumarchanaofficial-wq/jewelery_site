CREATE TABLE IF NOT EXISTS bookings (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TEXT NOT NULL,
  dob          DATE NOT NULL,
  tob          TIME,
  pob          TEXT NOT NULL,
  focus_notes  TEXT,
  meet_link    TEXT,
  gcal_event_id TEXT,
  status       TEXT DEFAULT 'confirmed',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(session_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

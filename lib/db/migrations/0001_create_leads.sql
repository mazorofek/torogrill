CREATE TYPE lead_type AS ENUM ('contact', 'event');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'closed', 'canceled');

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type lead_type NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  message text,
  source text NOT NULL DEFAULT 'ישיר / לא ידוע',
  event_date date,
  event_time time,
  guests_count integer,
  status lead_status NOT NULL DEFAULT 'new',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX leads_status_idx ON leads (status);
CREATE INDEX leads_event_date_idx ON leads (event_date) WHERE type = 'event';

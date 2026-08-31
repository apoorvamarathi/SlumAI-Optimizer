CREATE TABLE IF NOT EXISTS community_reports (

    id SERIAL PRIMARY KEY,

    report_type VARCHAR(30) NOT NULL,

    issue_type VARCHAR(80) NOT NULL,

    description TEXT,

    zone_id VARCHAR(20),

    latitude DOUBLE PRECISION,

    longitude DOUBLE PRECISION,

    severity VARCHAR(20) DEFAULT 'Medium',

    status VARCHAR(20) DEFAULT 'Pending',

    reported_by INTEGER,

    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    assigned_to INTEGER,

    resolved_at TIMESTAMP,

    resolution_note TEXT

);
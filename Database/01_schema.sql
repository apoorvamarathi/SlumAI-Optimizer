CREATE TABLE daily_data (
    date DATE,
    zone_id VARCHAR(20),
    zone_name VARCHAR(150),
    rainfall_mm NUMERIC,
    water_supply_hours NUMERIC,
    water_demand_liters NUMERIC,
    waste_generated_kg NUMERIC,
    health_cases_reported INTEGER,
    risk_score NUMERIC
);

CREATE TABLE zone_master (
    zone_id VARCHAR(20),
    zone_name VARCHAR(150),
    city VARCHAR(100),
    region VARCHAR(100),
    notified_status VARCHAR(50),
    population_estimate INTEGER,
    area_sq_km NUMERIC,
    population_density_per_km2 NUMERIC,
    public_toilets_count INTEGER,
    people_per_toilet NUMERIC,
    toilets_lacking_water_pct NUMERIC,
    nearest_health_center_km NUMERIC,
    data_source_note TEXT
);

-- SELECT COUNT(*) FROM daily_data;
-- SELECT COUNT(*) FROM zone_master;

-- SELECT * FROM daily_data
-- LIMIT 10;

-- SELECT * FROM zone_master
-- LIMIT 10;

-- --zone id(IMP)
-- SELECT DISTINCT zone_id
-- FROM daily_data
-- ORDER BY zone_id;

-- SELECT zone_id
-- FROM zone_master
-- ORDER BY zone_id;

-- SELECT
--     COUNT(*) AS total_rows,
--     COUNT(*) - COUNT(date) AS missing_date,
--     COUNT(*) - COUNT(zone_id) AS missing_zone_id,
--     COUNT(*) - COUNT(zone_name) AS missing_zone_name,
--     COUNT(*) - COUNT(rainfall_mm) AS missing_rainfall,
--     COUNT(*) - COUNT(water_supply_hours) AS missing_supply,
--     COUNT(*) - COUNT(water_demand_liters) AS missing_demand,
--     COUNT(*) - COUNT(waste_generated_kg) AS missing_waste,
--     COUNT(*) - COUNT(health_cases_reported) AS missing_health,
--     COUNT(*) - COUNT(risk_score) AS missing_risk
-- FROM daily_data;

-- SELECT 
-- 	date,
-- 	zone_id,
-- 	COUNT(*) AS record_count
-- FROM daily_data
-- GROUP BY date,zone

-- SELECT *
-- FROM combined_data
-- LIMIT 10;

-- SELECT
--     column_name,
--     data_type
-- FROM information_schema.columns
-- WHERE table_name = 'combined_data'
-- ORDER BY ordinal_position;


-- CREATE TABLE feature_engineered_data AS
-- SELECT
--     *,
    
--     -- 1. Water demand per person
--     water_demand_liters / NULLIF(population_estimate, 0)
--         AS water_demand_per_capita,

--     -- 2. Waste per person
--     waste_generated_kg / NULLIF(population_estimate, 0)
--         AS waste_per_capita,

--     -- 3. Health cases per 1,000 people
--     (health_cases_reported * 1000.0)
--         / NULLIF(population_estimate, 0)
--         AS health_cases_per_1000,

--     -- 4. People per toilet
--     population_estimate::numeric
--         / NULLIF(public_toilets_count, 0)
--         AS calculated_people_per_toilet,

--     -- 5. Toilet water shortage percentage
--     toilets_lacking_water_pct
--         AS toilet_water_shortage_pct

-- FROM combined_data;

-- SELECT *
-- FROM feature_engineered_data
-- LIMIT 10;

-- SELECT
--     COUNT(*) AS total_rows,
--     COUNT(*) FILTER (WHERE water_demand_per_capita IS NULL) AS demand_null,
--     COUNT(*) FILTER (WHERE waste_per_capita IS NULL) AS waste_null,
--     COUNT(*) FILTER (WHERE health_cases_per_1000 IS NULL) AS health_null
-- FROM feature_engineered_data;

-- SELECT COUNT(*)
-- FROM feature_engineered_data;

-- SELECT column_name
-- FROM information_schema.columns
-- WHERE table_name = 'combined_data'
-- ORDER BY ordinal_position;

-- SELECT *
-- FROM feature_engineered_data
-- LIMIT 5;

-- SELECT
--     COUNT(*) AS total_rows,
--     COUNT(*) FILTER (WHERE water_demand_per_capita IS NULL) AS demand_null,
--     COUNT(*) FILTER (WHERE waste_per_capita IS NULL) AS waste_null,
--     COUNT(*) FILTER (WHERE health_cases_per_1000 IS NULL) AS health_null,
--     COUNT(*) FILTER (WHERE calculated_people_per_toilet IS NULL) AS toilet_null
-- FROM feature_engineered_data;

-- SELECT 
--     date,
--     zone_id,
--     COUNT(*) AS record_count
-- FROM daily_data
-- GROUP BY date, zone_id;

-- SELECT COUNT(*)
-- FROM feature_engineered_data;

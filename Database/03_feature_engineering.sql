CREATE TABLE feature_engineered_data AS
SELECT
    *,
    
    water_demand_liters / NULLIF(population_estimate, 0)
        AS water_demand_per_capita,

    waste_generated_kg / NULLIF(population_estimate, 0)
        AS waste_per_capita,

    (health_cases_reported * 1000.0)
        / NULLIF(population_estimate, 0)
        AS health_cases_per_1000,

    population_estimate::numeric
        / NULLIF(public_toilets_count, 0)
        AS calculated_people_per_toilet,

    toilets_lacking_water_pct
        AS toilet_water_shortage_pct

FROM combined_data;


SELECT *
FROM feature_engineered_data
LIMIT 10;

SELECT COUNT(*)
FROM feature_engineered_data;

SELECT
    COUNT(*) AS total_rows,
    COUNT(*) FILTER (WHERE water_demand_per_capita IS NULL) AS demand_null,
    COUNT(*) FILTER (WHERE waste_per_capita IS NULL) AS waste_null,
    COUNT(*) FILTER (WHERE health_cases_per_1000 IS NULL) AS health_null,
    COUNT(*) FILTER (WHERE calculated_people_per_toilet IS NULL) AS toilet_null
FROM feature_engineered_data;
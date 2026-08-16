SELECT COUNT(*) FROM daily_data;
SELECT COUNT(*) FROM zone_master;

SELECT * FROM daily_data LIMIT 10;
SELECT * FROM zone_master LIMIT 10;

SELECT DISTINCT zone_id
FROM daily_data
ORDER BY zone_id;

SELECT zone_id
FROM zone_master
ORDER BY zone_id;


SELECT
    COUNT(*) AS total_rows,
    COUNT(*) - COUNT(date) AS missing_date,
    COUNT(*) - COUNT(zone_id) AS missing_zone_id,
    COUNT(*) - COUNT(zone_name) AS missing_zone_name,
    COUNT(*) - COUNT(rainfall_mm) AS missing_rainfall,
    COUNT(*) - COUNT(water_supply_hours) AS missing_supply,
    COUNT(*) - COUNT(water_demand_liters) AS missing_demand,
    COUNT(*) - COUNT(waste_generated_kg) AS missing_waste,
    COUNT(*) - COUNT(health_cases_reported) AS missing_health,
    COUNT(*) - COUNT(risk_score) AS missing_risk
FROM daily_data;

SELECT 
    date,
    zone_id,
    COUNT(*) AS record_count
FROM daily_data
GROUP BY date, zone_id;
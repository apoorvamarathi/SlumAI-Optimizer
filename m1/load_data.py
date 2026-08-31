import pandas as pd
from sqlalchemy import create_engine

# PostgreSQL connection
engine = create_engine(
"postgresql://postgres:apoorva2005@localhost:5432/Slum_area_resource_optimizer"
)

# Load ML-ready data
query = """
SELECT *
FROM feature_engineered_data
ORDER BY date, zone_id;
"""

df = pd.read_sql(query, engine)

print("Data loaded successfully!")
print("Rows:", len(df))
print("Columns:", len(df.columns))

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())
import pandas as pd
from sqlalchemy import create_engine

# PostgreSQL connection
engine = create_engine(
"postgresql://postgres:apoorva2005@localhost:5432/Slum_area_resource_optimizer"
)
query = """
SELECT *
FROM feature_engineered_data
ORDER BY date, zone_id;
"""
df = pd.read_sql(query, engine)

print(df.shape)
print(df.dtypes)
print(df.isnull().sum())
print(df.describe())

import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 5))

sns.boxplot(
    data=df,
    x="zone_name",
    y="water_demand_liters"
)

plt.xticks(rotation=45)
plt.title("Water Demand by Zone")
plt.tight_layout()
plt.show()


# Water demand over time
plt.figure(figsize=(12, 5))

sns.lineplot(
    data=df,
    x="date",
    y="water_demand_liters"
)

plt.title("Water Demand Over Time")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Rainfall vs water demand
plt.figure(figsize=(8, 5))

sns.scatterplot(
    data=df,
    x="rainfall_mm",
    y="water_demand_liters"
)

plt.title("Rainfall vs Water Demand")
plt.show()

# Population vs demand
plt.figure(figsize=(8, 5))

sns.scatterplot(
    data=df,
    x="population_estimate",
    y="water_demand_liters"
)

plt.title("Population vs Water Demand")
plt.show()


# Risk by zone
plt.figure(figsize=(10, 5))

sns.boxplot(
    data=df,
    x="zone_name",
    y="risk_score"
)

plt.xticks(rotation=45)
plt.title("Risk Score by Zone")
plt.tight_layout()
plt.show()

# Correlation
numeric_df = df.select_dtypes(include="number")

plt.figure(figsize=(12, 8))

sns.heatmap(
    numeric_df.corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title("Feature Correlation")
plt.show()
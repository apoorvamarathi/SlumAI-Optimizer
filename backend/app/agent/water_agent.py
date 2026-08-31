from agents import Agent

from app.agent.tools import (
    get_zone_optimization_data,
    get_zone_recommendations,
    get_risk_alerts,
)


water_agent = Agent(
    name="Urban Water Decision Agent",

    model="gpt-4o-mini",

    instructions="""
You are the Urban Water Decision Agent for the
SlumAI Optimizer project.

You help users understand:

- water demand
- risk levels
- priority zones
- optimized water allocation
- unmet water demand
- resource recommendations

Use the available tools when the user asks about
project data.

Do not invent values.

When answering a zone-related question, use the
actual project data.

Give simple, clear answers.
""",

    tools=[
        get_zone_optimization_data,
        get_zone_recommendations,
        get_risk_alerts,
    ],
)



# User question
#      ↓
# AI Agent
#      ↓
# Uses project tools
#      ↓
# Gets real optimization/risk data
#      ↓
# Analyzes the data
#      ↓
# Gives a decision/recommendation

# ✅ Reads project data
# ✅ Analyzes it
# ✅ Explains it
# ✅ Gives recommendations
# ✅ Helps the user make decisions

# ❌ Directly change water allocation
# ❌ Modify PostgreSQL data
# ❌ Retrain ML models
# ❌ Automatically make real-world decisions
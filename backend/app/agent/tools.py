from agents import function_tool

from app.services.optimization_service import (
    get_all_optimizations,
)

from app.services.recommendation_service import (
    get_all_recommendations,
)

from app.services.alert_service import (
    get_all_alerts,
)


@function_tool
def get_zone_optimization_data():
    """
    Get optimized water allocation data.
    """
    return get_all_optimizations()


@function_tool
def get_zone_recommendations():
    """
    Get resource recommendations.
    """
    return get_all_recommendations()


@function_tool
def get_risk_alerts():
    """
    Get current risk alerts.
    """
    return get_all_alerts()
from app.services.optimization_service import (
    get_all_optimizations,
)


def get_data():
    return get_all_optimizations()


def highest_unmet_demand():

    data = get_data()

    if not data:
        return None

    return max(
        data,
        key=lambda x: float(
            x.get("unmet_demand", 0)
        ),
    )


def highest_risk_zone():

    data = get_data()

    if not data:
        return None

    return max(
        data,
        key=lambda x: float(
            x.get("risk_score", 0)
        ),
    )


def top_priority_zone():

    data = get_data()

    if not data:
        return None

    return max(
        data,
        key=lambda x: float(
            x.get("priority_score", 0)
        ),
    )


def get_zone(zone_id: str):

    data = get_data()

    for item in data:

        if (
            str(item.get("zone_id")).upper()
            == zone_id.upper()
        ):
            return item

    return None


def local_answer(question: str):

    q = question.lower().strip()


    if (
        "highest unmet demand" in q
        or "most unmet demand" in q
    ):

        item = highest_unmet_demand()

        if item is None:
            return "Optimization data is not available."

        return (
            f"{item['zone_id']} - "
            f"{item['zone_name']} has the highest "
            f"unmet water demand of "
            f"{float(item['unmet_demand']):,.2f} liters."
        )


    if (
        "highest risk" in q
        or "most risky" in q
        or "riskiest zone" in q
    ):

        item = highest_risk_zone()

        if item is None:
            return "Risk data is not available."

        return (
            f"{item['zone_id']} - "
            f"{item['zone_name']} has the highest "
            f"risk score of "
            f"{float(item['risk_score']):.2f}."
        )


    if (
        "highest priority" in q
        or "top priority" in q
        or "priority zone" in q
    ):

        item = top_priority_zone()

        if item is None:
            return "Priority data is not available."

        return (
            f"{item['zone_id']} - "
            f"{item['zone_name']} is the top priority "
            f"zone with priority level "
            f"'{item['priority_level']}'."
        )


    for zone_id in [
        "Z01",
        "Z02",
        "Z03",
        "Z04",
        "Z05",
        "Z06",
        "Z07",
        "Z08",
        "Z09",
        "Z10",
    ]:

        if zone_id.lower() in q:

            item = get_zone(zone_id)

            if item is None:
                return f"No data found for {zone_id}."

            return (
                f"{item['zone_id']} - "
                f"{item['zone_name']}: "
                f"risk score "
                f"{float(item['risk_score']):.2f}, "
                f"priority "
                f"{item['priority_level']}, "
                f"predicted demand "
                f"{float(item['predicted_water_demand']):,.2f} L, "
                f"optimized allocation "
                f"{float(item['optimized_allocation']):,.2f} L, "
                f"unmet demand "
                f"{float(item['unmet_demand']):,.2f} L. "
                f"Recommendation: "
                f"{item['recommendation']}."
            )


    return (
        "I can answer questions about highest risk, "
        "highest unmet demand, top priority zones, "
        "or a specific zone such as Z01 or Z04."
    )
def policy_decision(threat_level):
    # Simulated RL policy
    policy_map = {
        "Low": "Log Only",
        "Medium": "Notify Admin",
        "High": "Block IP",
        "Critical": "Block IP and Notify SOC"
    }
    return policy_map.get(threat_level, "Log Only")
# This function would be replaced with a more complex RL model in a real-world scenario
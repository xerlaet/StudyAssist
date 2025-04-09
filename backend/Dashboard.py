# Dashboard - Displays study activity summary (study hours, task completion, weekly progress)

def display_dashboard(user_data):
    """
    Given a user's study data, generate a summary string.
    Args:
        user_data (dict): Keys include 'study_hours', 'tasks_completed', 'total_tasks', and 'weekly_progress'.
    Returns:
        str: Formatted dashboard summary or no data message.
    """

    if not user_data.get("study_hours") or user_data["study_hours"] == 0:
        return "No activity found. Start learning to track progress."

    study_hours = user_data["study_hours"]
    tasks_completed = user_data.get("tasks_completed", 0)
    total_tasks = user_data.get("total_tasks", 1)
    weekly_progress = user_data.get("weekly_progress", [])

    completion_rate = (tasks_completed / total_tasks) * 100

    result = (
        f"Total Study Hours: {study_hours} hrs\n"
        f" Completed Tasks: {tasks_completed}/{total_tasks} "
        f"({completion_rate:.0f}% completion rate)\n"
        f"Weekly Progress: {weekly_progress}"
    )

    return result


# === Sample test runs ===
if __name__ == "__main__":
    print("🔹 Dashboard with Valid Data:")
    print(display_dashboard({
        "study_hours": 18.7,
        "tasks_completed": 12,
        "total_tasks": 15,
        "weekly_progress": [60, 70, 80, 90, 100]
    }))

    print("\n🔹 Dashboard with No Data:")
    print(display_dashboard({
        "study_hours": 0
    }))

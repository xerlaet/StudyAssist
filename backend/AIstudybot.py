# Author: Drashti Shah
# UC8: AI Study Bot - Provide study resources based on user input
# Test Cases Covered: Valid topic request, Empty input

def get_study_resources(topic):
    """
    Given a study topic, return a list of recommended online resources.
    If topic is missing, return an error message.
    """
    if not topic.strip():
        return "Error: Please enter a valid topic to search for resources."

    # Sample resource mapping (in a real app, this could query a database or API)
    resources = {
        "math": [
            "https://www.khanacademy.org/math",
            "https://www.purplemath.com/",
            "https://www.desmos.com/"
        ],
        "physics": [
            "https://www.physicsclassroom.com/",
            "https://www.khanacademy.org/science/physics"
        ],
        "programming": [
            "https://www.w3schools.com/",
            "https://realpython.com/",
            "https://www.freecodecamp.org/"
        ]
    }

    # Convert topic to lowercase for consistent search
    topic = topic.lower()
    return resources.get(topic, ["No resources found for this topic. Try a different subject."])


# === Sample test runs ===
if __name__ == "__main__":
    # Valid request
    print("🔍 Resources for 'Math':")
    print(get_study_resources("Math"))

    # Invalid request (empty)
    print("\n🔍 Resources for empty topic:")
    print(get_study_resources(""))

# @author: Sai Abhinav Pydimarry
# @description: StudyTagManager class to simulate user given tags for events

class StudyTagManager:
    def __init__(self):
        # {'user_email': {'session_id': {'tags': [tag1, tag2, ...]}}}
        self.data = {}

    def add_session(self, user_email, session_id):

        if user_email not in self.data:
            self.data[user_email] = {}

        if session_id not in self.data[user_email]:
            self.data[user_email][session_id] = {'tags': []}

    def add_tag(self, user_email, session_id, tag):

        if user_email not in self.data or session_id not in self.data[user_email]:
            return "Error: Session not found."
        
        if tag in self.data[user_email][session_id]['tags']:
            return "Tag already exists for this session."
        
        self.data[user_email][session_id]['tags'].append(tag)
        return "Tag added successfully."

    def edit_tag(self, user_email, session_id, old_tag, new_tag):

        if user_email not in self.data or session_id not in self.data[user_email]:
            return "Error: Session not found."
        
        tags = self.data[user_email][session_id]['tags']

        if old_tag not in tags:
            return "Error: Tag not found."
        
        if new_tag in tags:
            return "Error: New tag already exists."
        
        tags[tags.index(old_tag)] = new_tag
        return "Tag updated successfully."

    def search_tags(self, user_email, search_term):

        if user_email not in self.data:
            return "Error: User not found."
        
        matching = []

        for session_id, info in self.data[user_email].items():

            for tag in info['tags']:

                if search_term.lower() in tag.lower():
                    matching.append({'session_id': session_id, 'tag': tag})

        return matching if matching else "No tags found."
    

# Create instance
study_manager = StudyTagManager()

# Setup: Add sessions for user
study_manager.add_session("abhi@example.com", "math-review")
study_manager.add_session("abhi@example.com", "cs-project")
study_manager.add_session("harsh@example.com", "bio-flashcards")

# Test 1: Add multiple tags to a study session
print(study_manager.add_tag("abhi@example.com", "math-review", "Math"))
print(study_manager.add_tag("abhi@example.com", "math-review", "Exam Prep"))
print(study_manager.add_tag("abhi@example.com", "math-review", "High Priority"))
# Expected: All tags added successfully

# Test 2: Duplicate tag on same session
print(study_manager.add_tag("abhi@example.com", "math-review", "Math"))
# Expected: Tag already exists for this session.

# Test 3: Tag another session
print(study_manager.add_tag("abhi@example.com", "cs-project", "Group Study"))
print(study_manager.add_tag("abhi@example.com", "cs-project", "Java"))
# Expected: Tag added successfully

# Test 4: Edit an existing tag
print(study_manager.edit_tag("abhi@example.com", "math-review", "Exam Prep", "Final Exam Prep"))
# Expected: Tag updated successfully

# Test 5: Edit non-existent tag
print(study_manager.edit_tag("abhi@example.com", "math-review", "RandomTag", "UpdatedTag"))
# Expected: Error: Tag not found.

# Test 6: Edit tag to something that already exists
print(study_manager.edit_tag("abhi@example.com", "math-review", "Math", "High Priority"))
# Expected: Error: New tag already exists.

# Test 7: Search tags across all sessions
print(study_manager.search_tags("abhi@example.com", "study"))
# Expected: [{'session_id': 'cs-project', 'tag': 'Group Study'}]

# Test 8: Search partial match for common term
print(study_manager.search_tags("abhi@example.com", "prep"))
# Expected: [{'session_id': 'math-review', 'tag': 'Final Exam Prep'}]

# Test 9: Search for tags that don’t exist
print(study_manager.search_tags("abhi@example.com", "Chemistry"))
# Expected: No tags found.

# Test 10: Search for user that doesn't exist
print(study_manager.search_tags("nick@example.com", "Math"))
# Expected: Error: User not found.
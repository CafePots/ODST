### Why
**As a** [persona] **I want to** [action by user] **so that** [value or need met].
### Acceptance Criteria
```gherkin
GIVEN [necessary context and preconditions for story]
WHEN [action]
THEN [reaction]
```
**Dev Notes:**
[Relevant technical notes that developers may ask you to add to the story during weekly prep meeting (pre-IPM or IPM); sometimes they may add these themselves or add them as tasks]

**Design Notes:**
[prototype / design link inserted here; linking to a folder of a feature is good so designers can continue updating designs without anyone having to re-update the links to each design in the stories]

---other items that you may add to a story---

**NEEDS PM:**
[Add reason for adding a label needs PM so you can view the story and remember context to unblock the story; usually this is some kind of thing we need to follow up with our client counterpart on]

**NEEDS DESIGN:**
[Add reason for adding a label needs design so your designers can view the story and get context to unblock the story]
---additional information you may find valuable about stories---

**Features/User Stories:**
Feature stories are designed to explain the who, what, and why of the smallest incremental feature that can be added to a product that delivers user value. Feature stories are pointed by the development team and are estimated by complexity rather than by the time it will take to complete the feature. They are written from the user’s perspective and act as lightweight requirements documentation for a development team. Following the INVEST model, they should be independent and create clear value to the user. For example, each button should be added in conjunction with a feature instead of having a story that creates a row of buttons that are not connected to features. While features and user stories are often used interchangeably, for the sake of clarity — and to be consistent with Tracker’s naming conventions — we will refer to this kind of story only as a feature story.

*Feature stories should include several things:*
- **Title:** The title should be short, descriptive, and include the specific user/persona. For example, the user/persona should either be the specific type of user (e.g., editor) or the persona name (e.g., Jill) rather than just “user.” This also works for users that are not people but systems (e.g., “Purchasing API”).
- **Business case:** Who wants the functionality, why, and to what end? This is incorporated so that everyone on the team understands why the feature is being added. If you cannot think of a reason, then it’s worth reassessing if the feature should be included. The business case also allows others on the team to think if there is a better user experience than the one provided.
- **Acceptance criteria:** This defines what you will walk through to make sure that the story is completed. Developers working on the story should also walk through the acceptance criteria before delivering. At Pivotal, our beginning template for acceptance criteria is written in the Gherkin language. The Gherkin language was originally created for Cucumber, a Ruby testing suite, and is meant to “enforce firm, unambiguous requirements … and a script for automated testing.” Keep in mind that good feature stories should not, however, be prescriptive in implementation details. The syntax is as follows: GIVEN [necessary context] WHEN [action] THEN [reaction]. Sometimes it helps to walk backwards to determine your GIVEN (examples to follow). If you find yourself writing multiple “and”s in the acceptance criteria, that is a smell test that indicates you should split the story into two or more.
- **Notes:** Include additional information needed for the story, such as design notes (which might point out changes to mocks) or developer notes (which might provide insight that could help developers deliver the story).
Resources: Add mocks, wireframes, user flows, links, and other assets to help deliver the feature story.
Labels: This includes epics (larger overarching features), build #s, users, etc. These are used most effectively to help group the stories together.

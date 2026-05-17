# contribution-note.md

# Contribution Note

Kasparro Aura was developed collaboratively, with both contributors contributing across product discussions, implementation, debugging, workflow experimentation, and deployment.

| Contributor | Main Focus Areas | Also Contributed In |
|---|---|---|
| **Ojasvin Marwah** | Backend engineering, AI workflow orchestration, OpenAI integration, API structuring, and deployment/debugging workflows. | Product direction discussions, workflow testing, frontend-backend integration, and system architecture decisions. |
| **Hurreet Kaur** | Frontend implementation, UI structuring, interaction flow design, dashboard refinement, and styling. | Feature brainstorming, testing workflows, product feedback, and iterative improvements during development. |

## Shared Collaboration

A significant portion of the project was developed jointly, especially:

- workflow planning
- support flow ideation
- debugging sessions
- deployment troubleshooting
- architecture discussions
- feature prioritization
- demo preparation

The project was approached as a practical AI systems engineering exercise focused on creating a realistic support orchestration platform rather than a narrowly scoped prototype.

---

# decision-log.md

# Decision Log

Some key product and engineering choices made while building Kasparro Aura.

---

## Using n8n for workflow orchestration

n8n was chosen to keep routing, escalation, governance, and notification logic modular and easier to manage.

---

## Separating frontend and backend deployments

Frontend and backend were deployed separately so each part of the system could be updated, tested, and maintained independently.

---

## Keeping Express between frontend and n8n

Express acts as the middle layer for request handling, validation, logging, and API control.

The resulting structure is:

```text
Frontend → Express Backend → n8n Workflow
```

---

## Using placeholder voice for the current stage

Browser speech synthesis is used for the current demo layer so the experience stays interactive while the core workflow remains lightweight.

---

## Designing the platform as an operational system

The architecture was shaped around support workflows, routing, escalation, evidence handling, and governance instead of a basic chat-only interface.

---

## Keeping vision processing modular

Vision-related components were kept separate so they can scale independently if they are expanded later.

---

## Focusing on stability before expansion

The build order prioritized getting the main pipeline working cleanly before adding more advanced capabilities.


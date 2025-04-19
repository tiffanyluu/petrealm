# 🐉 PetRealm

## Project Overview

PetRealm is a virtual mythical pet simulation where players can adopt, care for, and interact with magical creatures. Each pet has a hunger system that gradually decreases over time, encouraging regular feeding to keep them happy and healthy.

<p align="center">
  <img src="images/pet-profile.png" alt="pet profile" width="300"/>
</p>

## **Live Demo:** [PetRealm](https://petrealm.vercel.app/)

### Tech Stack

Frontend

- Next.js (React): Handles the UI with dynamic pages and components.

Backend

- Node.js (Express.js): Provides API endpoints for pet interactions.
- AWS EventBridge + Lambda: Automates hunger decay with scheduled events.
- AWS CloudWatch: Monitors Lambda functions and logs system events.

Database

- PostgreSQL (AWS RDS): Stores pet data with persistence across sessions.

Deployment & CI/CD (in progress)

- Vercel: Current hosting platform for the frontend.
- Serverless Framework: Simplifies deployment of backend resources to AWS.
- AWS Amplify: In progress — migrating frontend hosting to Amplify with CI/CD.

---

## Future Plans

- **User Accounts:** Implement user authentication to give each player their own unique instance of the game, ensuring pets aren’t shared across all players.  
- **New Features:** Expand gameplay with fun additions, such as:
    - Introduce a "Mood" stat influenced by hunger levels and feeding. Happy pets could have little sparkle effects, while neglected pets might look sad.
    - Let players choose different backgrounds for their pet profile.
    - More variety of mythical pets.
    - Option to change current pet name.

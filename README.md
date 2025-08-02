# 🐉 PetRealm

PetRealm is a virtual mythical pet simulation where players can adopt, care for, and interact with magical creatures. Each pet has a hunger system that gradually decreases over time, encouraging regular feeding to keep them happy and healthy.

<p align="center">
  <img src="images/pet-profile.png" alt="pet profile"/>
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

Deployment & CI/CD

- Vercel: Frontend hosting platform with automatic deployments on push to main branch.
- Serverless Framework: Manages deployment of backend resources to AWS Lambda and API Gateway.
- GitHub Actions: Automated CI/CD pipeline with unit tests and E2E tests before deployment.

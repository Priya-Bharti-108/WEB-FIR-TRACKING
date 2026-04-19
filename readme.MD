# FSociety FIR Tracking 🚀

Welcome to the **FSociety FIR Tracking** project! This repository will serve as the foundation for our upcoming web & mobile application. 

This guide is specifically designed for junior team members to understand our git workflow and get started without any issues.

## 🎯 Project Goal
Our ultimate goal is to build a fully functional web app. Initially, everyone will work on their own separate forks of this project to develop components and learn. Later, we will collaborate feature-by-feature to integrate everything together into the main system.

## 🛠️ Getting Started (Workflow for Junior Developers)

To ensure we don't overwrite each other's work and keep things organized, we will follow a "Fork and Develop" workflow. Please follow these steps carefully:

### 1. Fork the Repository
1. Go to the main project repository on GitHub.
2. Click on the **"Fork"** button at the top right corner of the page.
3. This creates a personal copy of the repository under your own GitHub account.

### 2. Clone Your Forked Repository
Now, you need to download your copy of the project to your local machine.
Open your terminal (or Git Bash) and run:
```bash
git clone https://github.com/YOUR_USERNAME/FSociety-FIR-Tracking.git
```
*(Make sure to replace `YOUR_USERNAME` with your actual GitHub username)*

### 3. Add the Original (Upstream) Repository
It's a good practice to link your local clone back to the original repository so you can stay updated if any changes are made to the main project.
Navigate into the folder:
```bash
cd FSociety-FIR-Tracking
```
Add the upstream remote (Assuming the main repo owner is `priyanshsrivastava749`):
```bash
git remote add upstream https://github.com/priyanshsrivastava749/FSociety-FIR-Tracking.git
```

### 4. Create a New Branch for Your Work
It is best practice not to work directly on the `main` branch. Always create a new branch for the feature or experiment you are building.
```bash
git checkout -b feature/your-feature-name
```
*(Example: `git checkout -b feature/login-ui`)*

### 5. Work, Commit, and Push
Now, start building and experimenting! Whenever you make progress, save (commit) your work and push it to *your* forked repository.

1. Check your changes:
   ```bash
   git status
   ```
2. Add changes to staging:
   ```bash
   git add .
   ```
3. Commit with a clear, descriptive message:
   ```bash
   git commit -m "Added basic login page layout"
   ```
4. Push the branch to your GitHub fork:
   ```bash
   git push origin feature/your-feature-name
   ```

### 6. Future Collaboration
For now, keep your progress safe in your own forked repository. Once your features are ready, tested, and the main system is ready for integration, we will collaborate to create **Pull Requests (PRs)** to merge your awesome features into the main project. 

## 💡 Important Guidelines
- **Commit often:** Break your work into small, logical commits.
- **Write good commit messages:** Briefly explain *what* you changed and *why*.
- **Ask for help:** If you get stuck at any point with Git or code, don't hesitate to reach out to the seniors. We are here to learn and build this together!

Happy Coding! 🎉

# Fetch Adoption App

[![Netlify Status](https://api.netlify.com/api/v1/badges/46cf24f3-b8b7-4ad6-8200-fe776d13b9ca/deploy-status)](https://app.netlify.com/sites/exquisite-pudding-2c2427/deploys)

Visit the deployed application [here](https://exquisite-pudding-2c2427.netlify.app)

There's also a small video showcase of it while it was still in development

<a href="https://www.youtube.com/watch?v=sxH7TDjFdJI" target="_blank">
  <img src="https://img.youtube.com/vi/sxH7TDjFdJI/maxresdefault.jpg" alt="youtube-thumbnail" width="626" height="352">
</a>

This is a Vite-based React project that uses TypeScript. This guide will help you set up and run the application locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (Node package managers)

To check if you have them installed, run the following commands:

```bash
node -v
npm -v
```

## Installation

First start by cloning the repo

```bash
git clone https://github.com/FultonG/Dog-Adoption.git
```

Next navigate to the repository

```bash
cd Dog-Adoption
```

Install the required node modules by running

```bash
npm install
```

To run the application locally run

```bash
npm run dev
```

The application should now be available on the default port

```
http://localhost:5173/
```

## Project Decisions

This project was built with [Vite](https://vite.dev/guide/), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/), and Vite's setup guide made it super easy to get started.

For styling, I used [Tailwind CSS](https://tailwindcss.com/) instead of a component library. It was my first time using Tailwind, and I wanted to learn it—though some of the class usage might feel a bit rough as I was still getting the hang of it.

Instead of using a utility library like [Lodash](https://lodash.com/), I implemented some custom utilities myself, like the debounce function. It helped me focus on the specific functionality I needed, and I’m particularly proud of the search box (though there's always room for improvement).

In a real-world app, I'd definitely rely on libraries to speed up development, especially something like [Orval](https://orval.dev/) to generate a RESTful client.

For app deployment I was originally going to deploy it on GitHub Pages and call it a day but it's much harder to get the application working on it as it would be deployed in a subdomain and honestly I just didn't want to switch from the BrowserRouter to a HashRouter. Instead I opted for keeping the application as is and deploying it to [Netlify](https://www.netlify.com/)

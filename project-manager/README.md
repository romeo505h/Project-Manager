# Project Manager

A responsive project and task management application built with **HTML, CSS, and vanilla JavaScript**.

This project was built as my first complete frontend application and the foundation for my first full-stack project. The goal was not simply to create a UI, but to practice building a complete interactive application from scratch: managing application state, handling user input, validating forms, persisting data, updating the interface dynamically, and designing an experience that remains usable across different screen sizes.

---

## Overview

Project Manager allows users to create and manage projects, organize tasks within those projects, track completion progress, and monitor important project information from a central dashboard.

The application currently uses the browser's **Local Storage API** for data persistence, allowing projects and tasks to remain available after refreshing or reopening the page.

This is **Version 1** of the project. The next major milestone will transform the application into a full-stack system with a backend and database.

---

## Features

### Project Management

* Create new projects
* Add project descriptions
* Set project deadlines
* Edit existing projects
* Delete projects with confirmation
* Automatically remove associated tasks when a project is deleted
* Display project status dynamically

### Task Management

* Create tasks inside individual projects
* Mark tasks as completed
* Edit task names
* Cancel task edits without losing the original value
* Delete tasks with confirmation
* Automatically associate tasks with their parent project

### Progress Tracking

Project progress is calculated dynamically from the tasks belonging to each project.

For example:

* 0% of tasks completed → **0% progress**
* 2 of 4 tasks completed → **50% progress**
* All tasks completed → **100% progress**

Project status is also updated automatically based on task completion.

### Dashboard

The dashboard provides an at-a-glance overview of the application:

* Total projects
* Total tasks
* Completed tasks
* Overdue projects

These values update automatically whenever the underlying application data changes.

### Validation & User Safety

The application includes validation and confirmation flows to prevent accidental actions.

Examples include:

* Required project name validation
* Required project description validation
* Empty task prevention
* Confirmation before deleting a project
* Confirmation before deleting a task
* Cancelable task editing
* Keyboard interactions for faster form navigation

### Data Persistence

Project and task data is stored using the browser's:

```javascript
localStorage
```

This means application data persists between page refreshes without requiring a backend.

---

## Technologies Used

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**

### Browser APIs

* Local Storage API
* DOM API
* Date API

### Development Concepts

* DOM manipulation
* Event listeners
* Form handling
* Client-side validation
* Array methods such as `filter()`, `find()`, `every()`, and `forEach()`
* Dynamic element creation
* State management
* Data persistence
* Responsive design
* CRUD-style application logic

---

## What I Learned

This project was an important step in moving from writing individual JavaScript exercises to building an actual application.

### 1. Managing Application State

One of the biggest lessons was understanding that an application is constantly managing state.

Projects and tasks exist as JavaScript data, while the DOM represents that data visually.

When something changes, such as completing a task, deleting a task, or editing a project, the application needs to keep the data, UI, and Local Storage synchronized.

---

### 2. Working With the DOM

I gained practical experience with:

```javascript
querySelector()
createElement()
appendChild()
classList
dataset
textContent
innerHTML
```

Instead of creating a static page, I learned how to build and update parts of the interface dynamically based on application data.

---

### 3. Event-Driven Programming

The application relies heavily on user interaction.

I worked with events such as:

```javascript
click
submit
change
keydown
input
```

This helped me understand how real frontend applications respond to user actions and how different parts of an application can trigger updates elsewhere.

---

### 4. CRUD Logic

Although this version does not have a backend yet, the application implements the core ideas behind CRUD operations:

* **Create** projects and tasks
* **Read** stored projects and tasks
* **Update** project and task information
* **Delete** projects and tasks

This provides the foundation for moving the application to a real backend and database in the next version.

---

### 5. Data Relationships

Tasks are associated with projects using a `projectId`.

This introduced an important concept that will become even more significant when moving to a database:

```text
Project
   │
   ├── Task
   ├── Task
   └── Task
```

Deleting a project also removes its associated tasks, which mirrors the kind of relationship and data integrity considerations that appear in full-stack applications.

---

### 6. Validation and User Experience

I learned that building an application isn't only about making the main functionality work.

Small details matter:

* preventing empty submissions
* displaying useful validation messages
* allowing users to cancel edits
* confirming destructive actions
* supporting keyboard interaction
* updating the UI immediately after changes

These details made the application feel much closer to a real product rather than a collection of JavaScript exercises.

---

### 7. Responsive Design

The interface was designed to remain usable on smaller screens as well as desktop layouts.

The project uses CSS media queries to adapt elements such as:

* project sections
* dashboard cards
* task forms
* buttons
* spacing and layout

---

## Application Architecture — V1

The current architecture is intentionally frontend-only:

```text
User
 │
 ▼
HTML / CSS / JavaScript
 │
 ├── Projects
 │    └── Tasks
 │
 ▼
Local Storage
```

The JavaScript application manages the state and updates the DOM whenever the user interacts with the application.

---

## What's Next — V2

Version 2 will be a major architectural step.

The goal is to transform the current browser-based application into a **full-stack application**.

The planned architecture is:

```text
Frontend
   │
   ▼
Backend / API
   │
   ▼
Database
```

Potential V2 improvements include:

* Backend API
* Database persistence
* User authentication
* Server-side validation
* REST API design
* Proper project/task database relationships
* Environment variables
* Deployment
* Git and GitHub workflow
* Better error handling
* Production-oriented application structure

The purpose of V2 is not simply to add more features, but to understand how the frontend connects to the backend and how real applications manage persistent data.

---

## Project Status

**Version:** 1.0
**Status:** Complete

V1 is considered complete after testing the core project, task, editing, deletion, validation, persistence, progress tracking, and dashboard functionality.

The project will continue evolving as part of my transition from frontend development toward full-stack development.

---

## Why I Built This

I wanted to move beyond isolated coding exercises and build something that required me to think about an application as a whole.

This project helped me practice turning an idea into a working product, debugging problems independently, thinking about user interaction, managing application state, and connecting different pieces of frontend logic together.

More importantly, it gives me a foundation that I can continue developing rather than starting a completely different project for every new technology I learn.

**V1 represents my first complete frontend application. V2 will be my first major full-stack milestone.**

---

## Author

Built as part of my journey from learning frontend fundamentals toward full-stack development.


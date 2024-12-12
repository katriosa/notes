# Notes Board Application

This is a web application built with **Vue 3** and **TypeScript** that allows users to create, edit, and organize notes on a board.

## Features

- **Create Notes**: Add new notes to the board, choosing its color.
- **Edit Note Content**: Modify the text within each note directly on the board.
- **Auto-Save Notes**: Note content is automatically saved when the note loses focus, ensuring no changes are lost.
- **Drag-and-Drop Movement**: Drag notes to arrange them as needed on the board.
- **Pin Notes**: Lock a note in place to prevent it from being moved.
- **Persistent Storage**: otes and their positions are saved in the browser’s local storage, allowing users to resume where they left off after refreshing or reopening the page.

## Tech Stack

- **Vue 3** with **Composition API** for an organized and reactive UI.
- **TypeScript** for type-safe code and better development experience.
- **Pinia** for state management, handling notes data and pinning state.
- **Local Storage** for persisting notes and board state in the browser.

---

![Снимок экрана 2024-10-30 173140](https://github.com/user-attachments/assets/4c1f4a2e-fb7f-48c7-9f8f-52d330a71482)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

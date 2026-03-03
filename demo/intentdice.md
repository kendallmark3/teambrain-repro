# Intent: React Dice Roller App

## Objective

Create a new directory named:

    dice-roller-app

Generate a complete React + TypeScript application using Vite.

---

## Functional Requirements

### 1. UI

- Display two dice side by side
- Use real dice face images (1 through 6)
- Images should update when rolling
- Button labeled: "Roll Dice"
- Smooth animation (rotate or bounce)

---

### 2. State Management

- Use React useState
- Random number between 1 and 6
- Roll both dice on click

---

### 3. Assets

Create:
src/assets/dice-1.png
src/assets/dice-2.png
...
src/assets/dice-6.png

Use simple SVG or generated dice images if needed.

---

### 4. Styling

- Centered layout
- Clean modern UI
- Slight shadow under dice
- Responsive

---

### 5. Project Structure

dice-roller-app/
  src/
    components/
      Dice.tsx
    assets/
    App.tsx
    main.tsx
  index.html
  package.json
  tsconfig.json
  vite.config.ts

---

### 6. Add

- README.md with:
    npm install
    npm run dev
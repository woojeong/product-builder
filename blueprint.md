# Project: Face Line Drawing Interactive Site

## Overview
A modern web application featuring a line-drawing style interactive face illustration. Users can select specific **areas** of the face (forehead, cheeks, eyebrows, eye area, lips, chin) with semi-transparent color highlights.

## Detailed Outline
### Style & Design
- **Aesthetic**: Minimalist "Line Drawing" style with area-based selection highlights.
- **Color Palette**: Semi-transparent vibrant colors (50% opacity) for selections.
- **Typography**: Space Grotesk for a modern, clean look.
- **Interactivity**: 
    - Hover: Light highlight (approx 20% opacity).
    - Click/Selection: Stronger highlight (50% opacity).
- **Responsive**: Adapts to mobile and desktop using Container Queries.

### Features
- Interactive SVG Face: Closed paths for specific facial regions.
- Selection Panel: Displays the name of the currently selected area.
- Modern CSS: Using `@layer`, `oklch`, and `:has()`.

## Plan & Steps (Current Task)
1. **Transition to Area Selection**:
    - Update `main.js` with closed SVG paths for facial regions.
    - Implement fill-based hover and selection states with opacity.
2. **Refine UI Labels**:
    - Ensure labels reflect the new selectable regions (Forehead, Cheeks, etc.).
3. **Finalize & Push**:
    - Commit and push to GitHub.

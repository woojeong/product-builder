# Project: Face Line Drawing Interactive Site

## Overview
A modern web application featuring a line-drawing style interactive face illustration. Users can select specific parts of the face (eyes, nose, mouth, ears) to interact with them, potentially for customization or information display.

## Detailed Outline
### Style & Design
- **Aesthetic**: Minimalist "Line Drawing" style. Clean, high-contrast lines.
- **Color Palette**: Vibrant colors for selections, neutral background with subtle noise texture.
- **Typography**: Expressive modern typography for labels and titles.
- **Interactivity**: Hover and click effects on face parts using SVG and CSS transitions. Glow effects on selection.
- **Responsive**: Adapts to mobile and desktop using Container Queries and Flexbox/Grid.

### Features
- Interactive SVG Face: Each part (Eyes, Nose, Mouth, Brows) is a selectable path.
- Responsive Layout: Centered illustration with clear navigation/UI.
- Modern CSS: Using `@layer`, `:has()`, and `oklch` colors.
- Web Components: Encapsulated logic for the interactive face element.

## Plan & Steps (Current Task)
1. **Initialize Blueprint**: Create `blueprint.md` to track project state.
2. **Update HTML**: 
    - Structure `index.html` with a `<line-drawing-face>` web component.
3. **Refine Styling**: 
    - Add global styles in `style.css` (background texture, typography).
4. **Implement Logic**: 
    - Create `LineDrawingFace` web component in `main.js`.
    - Handle click events to toggle "selection" state of face parts.
5. **Finalize & Push**:
    - Commit all changes.
    - Push to the remote GitHub repository.

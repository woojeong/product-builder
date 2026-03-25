# Blueprint: Sensory Relaxation Website

## Overview
A modern, interactive website designed to encourage relaxation through sensory focus. The experience centers around the message "잘 쉬고 싶다면? 먼저 감각에 집중해!" (If you want to rest well? Focus on your senses first!) and features five interactive geometric shapes arranged in a pentagon layout around the text.

## Current Project State
The project is being redesigned from a "Face Line Drawing" interactive experience to a sensory-focused interactive experience.

## Style & Design
- **Typography:** Expressive Korean typography, centered on the screen.
- **Iconography/Shapes:** Five unique geometric shapes (Circle, Square, Triangle, etc.) arranged in a pentagon around the central text.
- **Color Palette:** Vibrant `oklch` colors with varying concentrations to create an energetic yet soothing look.
- **Texture:** Subtle noise texture on the background for a premium feel.
- **Depth:** Multi-layered drop shadows on the shapes to make them feel "lifted."
- **Interactivity:** Shapes respond to mouse hover and clicks with elegant animations and glow effects.

## Features
- **Responsive Layout:** Works perfectly on both mobile and desktop.
- **Pentagon Arrangement:** Shapes are dynamically positioned in a pentagon formation around the text.
- **Interactive Shapes:** Each of the 5 shapes is a clickable element that triggers a visual response and a unique electronic sound.
- **Synthesized Audio:** Uses the Web Audio API to generate custom electronic sound effects for each shape.
- **Webcam Hand Tracking:** Integrates MediaPipe Hands to track the user's hand position in real-time.
- **Proximity Interaction:** Sounds are triggered automatically when the user's hand (index finger) approaches a shape in physical space.

## Implementation Plan (Redesign)

### Step 1: Structural Update (HTML)
- Update `index.html` to include the main heading and a container for the geometric shapes.
- Add a hidden `<video>` element for webcam input.
- Include MediaPipe Hands scripts via CDN.

### Step 2: Visual Styling (CSS)
- Define a modern color palette using `oklch`.
- Implement a responsive pentagon layout using CSS variables and absolute positioning.
- Style the typography and background.
- Add styles for the webcam feed (optional/hidden).

### Step 3: Interactivity, Sound & Vision (JavaScript)
- Create a Web Component for the interactive geometric shapes.
- Implement click and hover handlers.
- Integrate Web Audio API for synthesized sounds.
- **New:** Initialize MediaPipe Hands and set up the webcam processing loop.
- **New:** Implement proximity detection logic to trigger sounds based on hand coordinates.

### Step 4: Refinement
- Ensure mobile responsiveness.
- Optimize animations for smooth performance.
- Verify accessibility (ARIA labels for the shapes).

## Verification & Testing
- Check for accessibility (screen readers, color contrast).
- Verify responsiveness on different screen sizes.
- Test interaction feedback (clicks, hovers).

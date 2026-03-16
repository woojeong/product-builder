class LineDrawingFace extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.selectedPart = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        svg {
          width: 100%;
          height: 100%;
          viewBox: 0 0 400 400;
        }
        .face-part {
          fill: transparent;
          stroke: var(--stroke-color, #333);
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          vector-effect: non-scaling-stroke;
        }
        .face-part:hover {
          fill: oklch(0.6 0.15 30 / 0.2);
          stroke: var(--accent-color, #ff5722);
          stroke-width: 2.5;
        }
        .face-part.selected {
          fill: oklch(0.6 0.15 30 / 0.5);
          stroke: var(--accent-color, #ff5722);
          stroke-width: 3.5;
          filter: drop-shadow(0 0 10px oklch(0.6 0.2 30 / 0.3));
        }
        .contour {
          pointer-events: none;
          stroke-width: 2.5;
          fill: none;
        }
      </style>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Face Contour (Base) -->
        <path class="contour" d="M100,150 Q100,300 200,350 Q300,300 300,150 Q300,50 200,50 Q100,50 100,150 Z" />
        
        <!-- Forehead (이마) -->
        <path class="face-part" id="forehead" data-name="이마" d="M110,140 Q110,65 200,65 Q290,65 290,140 L200,140 Z" />

        <!-- Eye Area (눈가) - Combined or separate, let's do separate for better UX -->
        <!-- Left Eye Area -->
        <path class="face-part" id="left-eye-area" data-name="왼쪽 눈가" d="M130,170 Q130,155 165,155 Q200,155 200,170 Q200,185 165,185 Q130,185 130,170 Z" />
        <!-- Right Eye Area -->
        <path class="face-part" id="right-eye-area" data-name="오른쪽 눈가" d="M200,170 Q200,155 235,155 Q270,155 270,170 Q270,185 235,185 Q200,185 200,170 Z" />

        <!-- Eyebrows (눈썹) -->
        <path class="face-part" id="left-eyebrow" data-name="왼쪽 눈썹" d="M135,160 Q165,145 195,160 Q165,155 135,160 Z" />
        <path class="face-part" id="right-eyebrow" data-name="오른쪽 눈썹" d="M205,160 Q235,145 265,160 Q235,155 205,160 Z" />

        <!-- Cheeks (볼) -->
        <!-- Left Cheek -->
        <path class="face-part" id="left-cheek" data-name="왼쪽 볼" d="M110,180 Q105,220 130,250 Q160,280 190,250 Q170,220 170,180 Z" />
        <!-- Right Cheek -->
        <path class="face-part" id="right-cheek" data-name="오른쪽 볼" d="M290,180 Q295,220 270,250 Q240,280 210,250 Q230,220 230,180 Z" />

        <!-- Lips (입술) -->
        <path class="face-part" id="lips" data-name="입술" d="M160,285 Q200,315 240,285 Q240,275 200,275 Q160,275 160,285 Z" />

        <!-- Chin (턱) -->
        <path class="face-part" id="chin" data-name="턱" d="M150,300 Q200,345 250,300 Q250,340 200,350 Q150,340 150,300 Z" />
        
        <!-- Decoration lines (non-interactive) -->
        <path class="contour" d="M200,190 L200,240 Q200,250 190,250" opacity="0.3" /> <!-- Simple Nose Line -->
      </svg>
    `;

    this.shadowRoot.querySelectorAll('.face-part:not(.contour)').forEach(part => {
      part.addEventListener('click', (e) => {
        this.selectPart(e.target);
      });
    });
  }

  selectPart(element) {
    if (this.selectedPart) {
      this.selectedPart.classList.remove('selected');
    }
    
    if (this.selectedPart === element) {
      this.selectedPart = null;
      this.updateStatus('부위를 선택해주세요');
      this.dataset.selected = "false";
    } else {
      this.selectedPart = element;
      this.selectedPart.classList.add('selected');
      const partName = element.getAttribute('data-name');
      this.updateStatus(`선택됨: ${partName}`);
      this.dataset.selected = "true";
    }
  }

  updateStatus(message) {
    const label = document.getElementById('selection-label');
    if (label) {
      label.textContent = message;
      label.style.color = this.selectedPart ? 'var(--accent-color)' : 'var(--text-primary)';
    }
  }
}

customElements.define('line-drawing-face', LineDrawingFace);

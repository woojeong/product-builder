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
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          vector-effect: non-scaling-stroke;
        }
        .face-part:hover {
          stroke: var(--accent-color, #ff5722);
          stroke-width: 4;
          filter: drop-shadow(0 0 5px var(--selection-glow));
        }
        .face-part.selected {
          stroke: var(--accent-color, #ff5722);
          stroke-width: 6;
          filter: drop-shadow(0 0 10px var(--selection-glow));
        }
        .contour {
          pointer-events: none;
          stroke-width: 3;
        }
      </style>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Face Contour -->
        <path class="face-part contour" d="M100,150 Q100,300 200,350 Q300,300 300,150 Q300,50 200,50 Q100,50 100,150 Z" />
        
        <!-- Hair (Simple line) -->
        <path class="face-part" id="hair" data-name="머리카락" d="M100,150 Q80,100 150,60 Q200,40 250,60 Q320,100 300,150" />

        <!-- Left Eye -->
        <path class="face-part" id="left-eye" data-name="왼쪽 눈" d="M150,180 Q170,170 190,180 Q170,190 150,180 Z" />
        <circle class="face-part" id="left-pupil" data-name="왼쪽 눈동자" cx="170" cy="180" r="3" />

        <!-- Right Eye -->
        <path class="face-part" id="right-eye" data-name="오른쪽 눈" d="M210,180 Q230,170 250,180 Q230,190 210,180 Z" />
        <circle class="face-part" id="right-pupil" data-name="오른쪽 눈동자" cx="230" cy="180" r="3" />

        <!-- Left Eyebrow -->
        <path class="face-part" id="left-brow" data-name="왼쪽 눈썹" d="M145,165 Q170,155 195,165" />

        <!-- Right Eyebrow -->
        <path class="face-part" id="right-brow" data-name="오른쪽 눈썹" d="M205,165 Q230,155 255,165" />

        <!-- Nose -->
        <path class="face-part" id="nose" data-name="코" d="M200,190 L200,240 Q200,250 190,250" />

        <!-- Mouth -->
        <path class="face-part" id="mouth" data-name="입" d="M160,280 Q200,310 240,280 Q200,290 160,280 Z" />

        <!-- Left Ear -->
        <path class="face-part" id="left-ear" data-name="왼쪽 귀" d="M100,170 Q80,170 80,210 Q80,240 100,240" />

        <!-- Right Ear -->
        <path class="face-part" id="right-ear" data-name="오른쪽 귀" d="M300,170 Q320,170 320,210 Q320,240 300,240" />
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

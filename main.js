// Audio Engine for synthesis
const AudioEngine = (() => {
  let context = null;

  const init = () => {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const playSound = (type) => {
    init();
    if (context.state === 'suspended') {
      context.resume();
    }

    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    const now = context.currentTime;

    switch (type) {
      case 'circle':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.5);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        break;
      case 'square':
        osc.type = 'square';
        osc.frequency.setValueAtTime(330, now);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        break;
      case 'triangle':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        break;
      case 'hexagon':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(165, now);
        filter.type = 'bandpass';
        filter.Q.value = 10;
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.linearRampToValueAtTime(3000, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        break;
      case 'star':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        break;
    }

    osc.start(now);
    osc.stop(now + 1);
  };

  return { playSound };
})();

class GeometricShape extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lastTriggered = 0;
    this.cooldown = 1000; // 1 second cooldown
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['type', 'color'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'circle';
    const colorVar = this.getAttribute('color') || '--shape-1';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 10px 20px oklch(0 0 0 / 0.15));
          transition: filter 0.3s ease;
        }
        :host(:hover), :host([active="true"]) {
          filter: drop-shadow(0 15px 30px var(${colorVar}, #ccc)) brightness(1.2);
        }
        svg {
          width: 100%;
          height: 100%;
          fill: var(${colorVar}, #ccc);
          transition: transform 0.3s ease;
        }
      </style>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        ${this.getShapeMarkup(type)}
      </svg>
    `;

    this.addEventListener('click', () => {
        this.handleInteraction(true);
    });
  }

  getShapeMarkup(type) {
    switch (type) {
      case 'circle': return '<circle cx="50" cy="50" r="45" />';
      case 'square': return '<rect x="10" y="10" width="80" height="80" rx="10" />';
      case 'triangle': return '<path d="M50 10 L90 85 L10 85 Z" />';
      case 'hexagon': return '<path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />';
      case 'star': return '<path d="M50 5 L63 38 L98 38 L70 58 L80 91 L50 71 L20 91 L30 58 L2 38 L37 38 Z" />';
      default: return '<circle cx="50" cy="50" r="45" />';
    }
  }

  handleInteraction(force = false) {
    const now = Date.now();
    if (!force && now - this.lastTriggered < this.cooldown) return;
    
    this.lastTriggered = now;
    const type = this.getAttribute('type');
    
    AudioEngine.playSound(type);
    
    this.animate([
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.3)', offset: 0.5 },
        { transform: 'scale(1)', offset: 1 }
    ], {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });

    document.body.style.backgroundColor = `var(${this.getAttribute('color')}, var(--bg-color))`;
    document.body.style.transition = 'background-color 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
    
    setTimeout(() => {
        document.body.style.backgroundColor = 'var(--bg-color)';
    }, 1500);
  }

  getCenter() {
    const rect = this.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
  }
}

customElements.define('geometric-shape', GeometricShape);

// --- Hand Tracking Logic ---

const videoElement = document.getElementById('input-video');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');
const statusElement = document.getElementById('webcam-status');
const handPointer = document.getElementById('hand-pointer');
const shapes = document.querySelectorAll('geometric-shape');

function onResults(results) {
  // Ensure canvas matches the visual size
  if (canvasElement.width !== canvasElement.clientWidth) {
    canvasElement.width = canvasElement.clientWidth;
    canvasElement.height = canvasElement.clientHeight;
  }

  // Reset canvas
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    statusElement.textContent = "Hand Detected";
    handPointer.style.opacity = "1";
    
    for (const landmarks of results.multiHandLandmarks) {
      // Draw skeleton on canvas with bright green color
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00ff00', lineWidth: 4});
      drawLandmarks(canvasCtx, landmarks, {color: '#00ff00', lineWidth: 2, radius: 4});

      // Use the index finger tip (landmark 8) for interaction
      const indexFinger = landmarks[8];
      const x = (1 - indexFinger.x) * window.innerWidth;
      const y = indexFinger.y * window.innerHeight;
      
      handPointer.style.left = `${x}px`;
      handPointer.style.top = `${y}px`;
      
      checkProximity(x, y);
    }
  } else {
    statusElement.textContent = "No Hand Detected";
    handPointer.style.opacity = "0";
  }
  canvasCtx.restore();
}

function checkProximity(x, y) {
    const threshold = 80; // Distance in pixels to trigger
    
    shapes.forEach(shape => {
        const center = shape.getCenter();
        const dist = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
        
        if (dist < threshold) {
            shape.setAttribute('active', 'true');
            shape.handleInteraction();
        } else {
            shape.removeAttribute('active');
        }
    });
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});

camera.start().then(() => {
    statusElement.textContent = "Webcam Active";
}).catch(err => {
    statusElement.textContent = "Webcam Error: " + err.message;
    console.error(err);
});

import { Gradient } from './Gradient.js';

// Default colors
const DEFAULT_COLORS = {
  color1: '#607998',
  color2: '#4c81c0',
  color3: '#1d5395',
  color4: '#7f83b4'
};

// Get colors from URL or use defaults
function getColorsFromURL() {
  const params = new URLSearchParams(window.location.search);
  return {
    color1: params.get('c1') || DEFAULT_COLORS.color1,
    color2: params.get('c2') || DEFAULT_COLORS.color2,
    color3: params.get('c3') || DEFAULT_COLORS.color3,
    color4: params.get('c4') || DEFAULT_COLORS.color4
  };
}

function updateURL(colors) {
  const hideButton = settingsBtn.classList.contains('hidden') && settingsPanel.classList.contains('hidden');
  const params = new URLSearchParams();
  params.set('c1', colors.color1);
  params.set('c2', colors.color2);
  params.set('c3', colors.color3);
  params.set('c4', colors.color4);
  if (hideButton) {
    params.set('hide', 'true');
  }
  
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newURL);
}

// Update CSS variables and reinitialize gradient
function updateGradient(colors) {
  const canvas = document.getElementById('gradient-canvas');
  canvas.style.setProperty('--gradient-color-1', colors.color1);
  canvas.style.setProperty('--gradient-color-2', colors.color2);
  canvas.style.setProperty('--gradient-color-3', colors.color3);
  canvas.style.setProperty('--gradient-color-4', colors.color4);
  
  // Reinitialize gradient
  if (window.gradientInstance) {
    window.gradientInstance.disconnect();
  }
  window.gradientInstance = new Gradient();
  window.gradientInstance.initGradient('#gradient-canvas');
}

// Initialize colors from URL
const initialColors = getColorsFromURL();

// Set initial values
document.getElementById('color1').value = initialColors.color1;
document.getElementById('color1-text').value = initialColors.color1;
document.getElementById('color2').value = initialColors.color2;
document.getElementById('color2-text').value = initialColors.color2;
document.getElementById('color3').value = initialColors.color3;
document.getElementById('color3-text').value = initialColors.color3;
document.getElementById('color4').value = initialColors.color4;
document.getElementById('color4-text').value = initialColors.color4;

// Apply initial colors
updateGradient(initialColors);
updateMetaTags(initialColors);

// Settings panel toggle
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeBtn = document.getElementById('closeBtn');

settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('hidden');
  settingsBtn.classList.add('hidden');
});

closeBtn.addEventListener('click', () => {
  settingsPanel.classList.add('hidden');
  settingsBtn.classList.remove('hidden');
});

// Color input handlers
function setupColorInput(colorId) {
  const colorPicker = document.getElementById(colorId);
  const colorText = document.getElementById(`${colorId}-text`);
  
  colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;
    colorText.value = color;
    updateColors();
  });
  
  colorText.addEventListener('input', (e) => {
    let color = e.target.value.trim();
    if (color.match(/^#[0-9A-F]{6}$/i)) {
      colorPicker.value = color;
      updateColors();
    }
  });
}

setupColorInput('color1');
setupColorInput('color2');
setupColorInput('color3');
setupColorInput('color4');

function updateColors() {
  const colors = {
    color1: document.getElementById('color1').value,
    color2: document.getElementById('color2').value,
    color3: document.getElementById('color3').value,
    color4: document.getElementById('color4').value
  };
  
  updateGradient(colors);
  updateURL(colors);
  updateMetaTags(colors);
}

// Copy URL button
document.getElementById('copyUrlBtn').addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const notification = document.getElementById('copyNotification');
    notification.classList.remove('hidden');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 2000);
  });
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('color1').value = DEFAULT_COLORS.color1;
  document.getElementById('color1-text').value = DEFAULT_COLORS.color1;
  document.getElementById('color2').value = DEFAULT_COLORS.color2;
  document.getElementById('color2-text').value = DEFAULT_COLORS.color2;
  document.getElementById('color3').value = DEFAULT_COLORS.color3;
  document.getElementById('color3-text').value = DEFAULT_COLORS.color3;
  document.getElementById('color4').value = DEFAULT_COLORS.color4;
  document.getElementById('color4-text').value = DEFAULT_COLORS.color4;
  
  updateGradient(DEFAULT_COLORS);
  updateURL(DEFAULT_COLORS);
});

// Randomize button - generates similar colors
document.getElementById('randomizeBtn').addEventListener('click', () => {
  // Generate a random base hue (0-360)
  const baseHue = Math.floor(Math.random() * 360);
  
  // Generate 4 similar colors by varying hue slightly, and saturation/lightness
  const colors = [];
  for (let i = 0; i < 4; i++) {
    // Vary hue by ±30 degrees
    const hue = (baseHue + (Math.random() * 60 - 30) + 360) % 360;
    // Saturation between 40-70%
    const saturation = 40 + Math.random() * 30;
    // Lightness between 35-65%
    const lightness = 35 + Math.random() * 30;
    
    colors.push(hslToHex(hue, saturation, lightness));
  }
  
  // Apply the colors
  document.getElementById('color1').value = colors[0];
  document.getElementById('color1-text').value = colors[0];
  document.getElementById('color2').value = colors[1];
  document.getElementById('color2-text').value = colors[1];
  document.getElementById('color3').value = colors[2];
  document.getElementById('color3-text').value = colors[2];
  document.getElementById('color4').value = colors[3];
  document.getElementById('color4-text').value = colors[3];
  
  updateColors();
});

// Helper function to convert HSL to Hex
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Update meta tags for embeds
function updateMetaTags(colors) {
  // Update URL meta tag
  const ogUrl = document.getElementById('og-url');
  if (ogUrl) {
    ogUrl.setAttribute('content', window.location.href);
  }
  
  // Update description with color values
  const ogDescription = document.getElementById('og-description');
  if (ogDescription) {
    ogDescription.setAttribute('content', 
      `Custom gradient: ${colors.color1} • ${colors.color2} • ${colors.color3} • ${colors.color4}`
    );
  }
  
  // Update theme color to first gradient color
  const themeColor = document.getElementById('theme-color');
  if (themeColor) {
    themeColor.setAttribute('content', colors.color1);
  }
}

// Get hide button state from URL
function getHideButtonFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('hide') === 'true';
}

// Update URL with hide state
function updateURLWithHide(colors, hideButton) {
  const params = new URLSearchParams();
  params.set('c1', colors.color1);
  params.set('c2', colors.color2);
  params.set('c3', colors.color3);
  params.set('c4', colors.color4);
  if (hideButton) {
    params.set('hide', 'true');
  }
  
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newURL);
}

// Keyboard shortcut to hide/show settings button
let hideButtonState = getHideButtonFromURL();

// Apply initial hide state
if (hideButtonState) {
  settingsBtn.classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'h' || e.key === 'H') {
    hideButtonState = !hideButtonState;
    
    if (hideButtonState) {
      // Hide everything
      settingsBtn.classList.add('hidden');
      settingsPanel.classList.add('hidden');
    } else {
      // Show settings button
      settingsBtn.classList.remove('hidden');
    }
    
    // Update URL with current colors and hide state
    const colors = {
      color1: document.getElementById('color1').value,
      color2: document.getElementById('color2').value,
      color3: document.getElementById('color3').value,
      color4: document.getElementById('color4').value
    };
    updateURLWithHide(colors, hideButtonState);
  }
});
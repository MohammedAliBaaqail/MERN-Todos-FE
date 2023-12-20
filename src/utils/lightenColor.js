

const lightenColor = (hex, percent) => {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.round((255 - r) * (percent / 100) + r);
  g = Math.round((255 - g) * (percent / 100) + g);
  b = Math.round((255 - b) * (percent / 100) + b);

  const lighterHex = `#${(r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, '0')}`;
  return lighterHex;
};

// Example usage:
const originalColor = '#3498db'; // Your color
const lighterColor = lightenColor(originalColor, 20); // Lighten by 20%

console.log(lighterColor); // Output the lighter color


export default lightenColor





const useDarkenColor = (hex, percent) => {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.round(r * (1 - percent / 100));
  g = Math.round(g * (1 - percent / 100));
  b = Math.round(b * (1 - percent / 100));

  const darkerHex = `#${(r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, '0')}`;
  return darkerHex;
};

export default useDarkenColor



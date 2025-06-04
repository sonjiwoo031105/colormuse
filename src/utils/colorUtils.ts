export type RGB = [number, number, number];

export const hexToRgb = (hex: string): RGB => {
  const parsed = hex.replace("#", "");

  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);

  return [r, g, b];
};

export const rgbToHex = ([r, g, b]: RGB): string => {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

export const rgbToHsl = (r: number, g: number, b: number): RGB => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return [
    parseFloat(h.toFixed(2)),
    parseFloat((s * 100).toFixed(2)),
    parseFloat((l * 100).toFixed(2))
  ];
};

export const hslToRgb = (h: number, s: number, l: number): RGB => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60)      [r, g, b] = [c, x, 0];
  else if (h < 120)          [r, g, b] = [x, c, 0];
  else if (h < 180)          [r, g, b] = [0, c, x];
  else if (h < 240)          [r, g, b] = [0, x, c];
  else if (h < 300)          [r, g, b] = [x, 0, c];
  else                       [r, g, b] = [c, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
};

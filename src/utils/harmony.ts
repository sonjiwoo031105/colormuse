import { rgbToHsl, hslToRgb, rgbToHex, type RGB } from './colorUtils'

export function generateTriadicColors(rgb: RGB): string[] {
  const [h, s, l] = rgbToHsl(...rgb);

  const hues = [h, (h + 120) % 360, (h + 240) % 360];
  return hues.map(hue => {
    const rgb = hslToRgb(hue, s, l);
    return rgbToHex(rgb);
  });
}

export function generateComplementaryColors(rgb: RGB): string[] {
  const [h, s, l] = rgbToHsl(...rgb);

  const compHue = (h + 180) % 360;
  return [
    rgbToHex(hslToRgb(h, s, l)),
    rgbToHex(hslToRgb(compHue, s, l))
  ];
}

export function generateAnalogousColors(rgb: RGB): string[] {
  const [h, s, l] = rgbToHsl(...rgb);

  const hues = [h, (h + 330) % 360, (h + 30) % 360];
  return hues.map(hue => rgbToHex(hslToRgb(hue, s, l)));
}

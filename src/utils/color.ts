export const hexToRgb = (hex: string): [number, number, number] => {
  const parsed = hex.replace("#", "");

  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);

  return [r, g, b];
}

export const rgbToHex = (rgb: number[]): string => {
  return (
    '#' +
    rgb
      .map((val) => {
        const hex = val.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  );
}

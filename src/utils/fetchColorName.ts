export const fetchColorName = async (hex: string): Promise<string> => {
  const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex.slice(1)}`);
  const data = await res.json();
  return data.name.value;
}

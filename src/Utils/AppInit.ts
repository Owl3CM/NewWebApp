import Moon from "@/Libs/moon-style";
import { setDefaultStatusKit } from "../Libs/eze-services";
import { StateKit } from "../Assets/stateKit";
import Glob from "../Glob";
import CartService from "@/Pages/Cart/CartService";

export const AppInit = () => {
  setDefaultStatusKit(StateKit);
  Moon.init();
  Glob.Init();
  CartService.init();
};

const ColorShadesGenerator = (baseHexColor: string, numShades: number) => {
  const hexToRgb = (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const lightenDarkenColor = (color: { r: number; g: number; b: number }, amount: number) => {
    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
    return {
      r: clamp(color.r + amount, 0, 255),
      g: clamp(color.g + amount, 0, 255),
      b: clamp(color.b + amount, 0, 255),
    };
  };

  const baseRgbColor = hexToRgb(baseHexColor);
  const shades = [];

  for (let i = 1; i <= numShades; i++) {
    const amount = i * 10;
    const lighterShade = lightenDarkenColor(baseRgbColor, amount);
    const darkerShade = lightenDarkenColor(baseRgbColor, -amount);
    shades.push(rgbToHex(lighterShade.r, lighterShade.g, lighterShade.b));
    shades.push(rgbToHex(darkerShade.r, darkerShade.g, darkerShade.b));
  }

  // sort by color brightness
  return shades.sort((a, b) => {
    const brightness = (color: string) => {
      const { r, g, b } = hexToRgb(color);
      return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114);
    };
    return brightness(b) - brightness(a);
  });
};

// Example usage:
// const baseColor = "#ffffff";
// const shades = ColorShadesGenerator(baseColor, 10);
// console.log(shades);

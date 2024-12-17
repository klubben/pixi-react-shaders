import { AggregationColor } from "antd/es/color-picker/color";

/**
 * Convert a decimal number to a hexadecimal string with leading zeros.
 * @param dec
 * @param length
 */
export const dec2hex = (dec: number, length: number = 2) => {
  return dec.toString(16).padStart(length, "0");
};

export const arrayToAggregationColor = (
  array: [number, number, number, number],
) => {
  return new AggregationColor(
    `#${dec2hex(array[0] * 255)}${dec2hex(array[1] * 255)}${dec2hex(array[2] * 255)}${dec2hex(array[3] * 255)}`,
  );
};

export const aggregationColorToArray = (color: AggregationColor) => {
  const parts = color.toRgb();
  return [parts.r / 255, parts.g / 255, parts.b / 255, parts.a];
};

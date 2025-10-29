import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const xBase = 375;
const yBase = 812;

const xScale = (size: number) =>
  parseFloat(((width / xBase) * size).toFixed(2));
const yScale = (size: number) =>
  parseFloat(((height / yBase) * size).toFixed(2));
const mScale = (size: number, factor = 0.5) =>
  size + (xScale(size) - size) * factor;

export { xScale, yScale, mScale, width, height };
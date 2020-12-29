import { PixelRatio, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
/**
 * 91迭代起，美术图设计基准像素改为750 * 1334
 * 按比例将设计的px转换成适应不同屏幕的dp
 * @param {number} designPx 设计稿标注的px值
 * @returns {number}
 */
export function getRealSize(designPx: number) {
  return PixelRatio.roundToNearestPixel((designPx / 750) * DEVICE_WIDTH);
}

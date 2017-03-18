/**
 * Created by zhouzhen on 2017/3/17.
 */
import warning from 'warning';


/**
 * 返回 一个值和数值范围后的允许值
 * @param {number} value
 * @param {number}min
 * @param {number}max
 * @returns {number}
 */
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
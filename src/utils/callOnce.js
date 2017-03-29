/**
 * Created by zhouzhen on 2017/3/20.
 */
import warning from 'warning';

const CALLED_ONCE = 'muiPrepared';

export default function callOnce() {
  if (process.env.NODE_ENV !== 'production') {
    return (style) => {
      if (style[CALLED_ONCE]) {
        warning(false, 'DeamUI:你不能prepareStyles()在同一个样式对象超过一次');
      }
      style[CALLED_ONCE] = true;
      return style;
    };
  }
}
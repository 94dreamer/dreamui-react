/**
 * Created by zhouzhen on 2017/3/20.
 */
const reTranslate = /((^|\s)translate(3d|X)?\()(\-?[\d]+)/;
const reSkew = /((^|\s)skew(x|y)?\()\s*(\-?[\d]+)(deg|rad|grad)(,\s*(\-?[\d]+)(deg|rad|grad))?/;

/**
 * 这个函数确保了'style'支持从左向右和从右向左
 *
 *
 */

export default function rtl(muiTheme) {
  if (muiTheme.isRtl) {
    return (style) => {
      if (style.directionInvariant === true) {
        return style;
      }

      const flippedAttributes = {
        //更换属性名
        right: 'left',
        left: 'right',
        marginLeft: 'marginRight',
        marginRight: 'marginLeft',
        paddingLeft: 'paddingRight',
        paddingRight: 'paddingLeft',
        borderRight: 'borderLeft',
        borderLeft: 'borderRight',
      };

      const newStyle = {};
      
      Object.key(style).forEach(function () {
        
      })

    }
  }
}
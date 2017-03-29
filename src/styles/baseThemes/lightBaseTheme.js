/**
 * Created by zhouzhen on 2017/3/20.
 * 注意：如果升级了这个文件，同时也请更新`docs/src/app/customization/Themes.js`
 */

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from '../colors';
import {fade} from '../../utils/colorManipulator'
import spacing from '../spacing';

/**
 * 这个主题被dreamui默认使用，是所有组件在没有设定自定义样式下的兜底样式。
 */

export default {
  spacing: spacing,
  fontFamily: 'Roboto,sans-serif',
  borderRadius:2,
  palette:{//调色板
    primary1Color:cyan500,
    primary2Color:cyan700,
    primary3Color:grey400,
    accent1Color:pinkA200,
    accent2Color:grey100,
    accent3Color:grey500,
    textColor:darkBlack,
    secondaryTextColor:fade(darkBlack,0.54),
    alternateTextColor:white,
    canvasColor:white,
    borderColor:grey300,
    disabledColor:fade(darkBlack,0.3),
    pickerHeaderColor:cyan500,
    colorCirclecolor:fade(darkBlack,0.07),
    shadowColor:fullBlack,
  },
}
/**
 * Created by zhouzhen on 2017/3/27.
 * 版面设计的class
 */
import {
  fullBlack,
  darkBlack,
  lightBlack,
  minBlack,
  fullWhite,
  darkWhite,
  lightWhite,
} from './colors';

class Typography {
  constructor() {
    //文本颜色 text color
    this.textFullBlack = fullBlack;
    this.textDarkBlack = darkBlack;
    this.textLightBlack = lightBlack;
    this.textMinBlack = minBlack;
    this.textFullWhite = fullWhite;
    this.textDarkWhite = darkWhite;
    this.textLightWhite = lightWhite;

    // 字体粗细 font weight

    this.fontWeightLight = 300;
    this.fontWeightNormal = 400;
    this.fontWeightMedium = 500;

    this.fontStyleButtonFontSize = 14;
  }
}

export default new Typography();
/**
 * Created by zhouzhen on 2017/3/20.
 */
import createPrefixerStatic from 'inline-style-prefixer/static/createPrefixer';
import createPrefixerDynamic from 'inline-style-prefixer/dynamic/createPrefixer';
import autoprefixerDynamic from './autoprefixerDynamic';
import autoprefixerStatic from './autoprefixerStatic';
import warning from 'warning';

let hasWarnedAboutUserAgent = false;

export default function (muiTheme) {
  const isClient = typeof navigator !== 'undefined';
  let userAgent = muiTheme.userAgent;

  if (userAgent === undefined && isClient) {
    userAgent = navigator.userAgent;
  }

  if (userAgent === undefined && !hasWarnedAboutUserAgent) {
    warning(false, 'DreamUI:userAgent在服务端渲染时应当被提供在主题的context中')

    hasWarnedAboutUserAgent = true;
  }

  const prefixAll = createPrefixerStatic(autoprefixerStatic);

  if (userAgent === false) {//不使用autoprefixer
    return null;
  } else if (userAgent === 'all' || userAgent === undefined) {//所有的userAgent
    return (style) => {
      const isFlex = ['flex', 'inline-flex'].indexOf(style.display) !== -1;
      const stylePrefixed = prefixAll(style);

      if (isFlex) {
        const display = stylePrefixed.display;
        if (isClient) {
          stylePrefixed.display = display[display.length - 1];
        } else {
          stylePrefixed.display = display.join(';display:');
        }
      }
      return stylePrefixed;
    }
  } else {
    const Prefixer = createPrefixerDynamic(autoprefixerDynamic, prefixAll);
    const prefixer = new Prefixer({
      userAgent: userAgent,
    });

    return (style) => prefixer.prefix(style);
  }

}
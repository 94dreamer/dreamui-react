/**
 * Created by zhouzhen on 2017/3/27.
 * 使用本ui的高阶组件
 */
import React, {PropTypes} from 'react';
import getMuiTheme from './getMuiTheme';

let DEFAULT_THEME;

function getDefaultTheme() {
  if (!DEFAULT_THEME) {
    DEFAULT_THEME = getMuiTheme()
  }
  return DEFAULT_THEME
}

export default function muiThemeable() {
  return (Component) => {
    const MuiComponent = (props, context) => {
      const {muiTheme = getMuiTheme()}=context;//指定默认值

      return <Component muiTheme={muiTheme} {...props} />
    };

    MuiComponent.contextTypes={
      muiTheme:PropTypes.object.isRequired,
    };

    return MuiComponent;
  };
}
/**
 * Created by zhouzhen on 2017/3/15.
 * 组件总容器
 */
import {Component, PropTypes} from 'react';
import getMuiTheme from './getMuiTheme';

class MuiThemeProvider extends Component {

  static propTypes = {
    children: PropTypes.element,
    muiTheme: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      muiTheme: this.props.muiTheme || getMuiTheme(),
    };
  }

  render() {
    return this.props.children;
  }
}

export default MuiThemeProvider;
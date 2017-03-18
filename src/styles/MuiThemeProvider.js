/**
 * Created by zhouzhen on 2017/3/15.
 */
import {Component, ProTypes} from 'react';
import getMuiTheme from './getMuiTheme';

class MuiThemeProvider extends Component {
  static propTypes = {
    children: ProTypes.elements,
    muiTheme: ProTypes.object,
  }

  static childContextTypes = {
    muiTheme: ProTypes.object.isRequired,
  }

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
/**
 * Created by zhouzhen on 2017/3/28.
 */
import React from 'react';
import {render} from 'react-dom';

import DreamUIReact from '../src/DreamUIReact';
import MuiThemeProvider from '../src/styles/MuiThemeProvider';
import getMuiTheme from '../src/styles/getMuiTheme';
import lightBaseTheme from '../src/styles/baseThemes/lightBaseTheme';
//import muiThemeable from '../src/styles/muiThemeable';

const {
  Button,
  Avatar,
}=DreamUIReact;

const App = () => (
  <MuiThemeProvider>
    <Avatar src="http://cdn.iciba.com/www/top/logo.png" />
  </MuiThemeProvider>
);

render(
  <App/>,
  document.getElementById("app")
);






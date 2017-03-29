import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Welcome from './Welcome';

import DreamUIReact from '../src/DreamUIReact'

import MuiThemeProvider from '../src/styles/MuiThemeProvider';
import getMuiTheme from '../src/styles/getMuiTheme';
import lightBaseTheme from '../src/styles/baseThemes/lightBaseTheme';
//import muiThemeable from '../src/styles/muiThemeable';

const {
  Button,
  Avatar,
}=DreamUIReact;

/*storiesOf('Welcome', module)
 .add('to Storybook', () => (
 <Welcome showApp={linkTo('Button')}/>
 ));*/

storiesOf('按钮', module);


storiesOf('Component 组件', module).add('Avatar 头像', () => (
  <MuiThemeProvider>
    <div>
      <p>Avatar - 可以用来表示人或事物</p>
      <Avatar src="http://94dreamer.com/Public/Uploads/2016-03-22/56f102ed670f7.jpg"/>
    </div>
  </MuiThemeProvider>
)).add('Button 按钮', () => (
  <div>
    <Button onClick={action('clicked')}>Hello Button</Button>
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  </div>
));






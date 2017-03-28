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

storiesOf('按钮', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));


storiesOf('Avatar', module)
  .add('1', () => (
    <MuiThemeProvider>
      <Avatar src="http://cdn.iciba.com/www/top/logo.png" />
    </MuiThemeProvider>
  ))
  .add('2', () => (
    <Button>Hello Button</Button>
  ));






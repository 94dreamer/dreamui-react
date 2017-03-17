import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Welcome from './Welcome';

import DreamUIReact from '../src/DreamUIReact'

// import MuiThemeProvider from '/styles/MuiThemeProvider';

const {
  Button,
  Avatar,

}=DreamUIReact;

storiesOf('Welcome', module)
 .add('to Storybook', () => (
 <Welcome showApp={linkTo('Button')}/>
 ));

storiesOf('按钮', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Avatar', module)
  .add('1', () => (
    <Avatar>
      <div>2123</div>
    </Avatar>
  ))
  .add('2', () => (
    <Avatar>😀 😎 👍 💯</Avatar>
  ));






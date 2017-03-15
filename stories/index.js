import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
//import Button from './Button';
import Welcome from './Welcome';
import {Button} from '../src/DreamUIReact';
//import Button from '../src/Button'
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





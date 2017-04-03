/**
 * Created by zhouzhen on 2017/3/30.
 * 遮罩层
 */
import React,{Component,PropTypes} from 'react';
import transitions from '../styles/transitions';
import AutoLockScrolling from './AutoLockScrolling';

function getStyles(props,context) {
  const {overlay} = context.muiTheme;
  const style={
    root:{
      position:'fixed',
      height:'100%',
      width:'100%',
      top:0,
      left:'-100%',
      opacity:0,
      backgroundColor:overlay.backgroundColor,
      WebkitTapHighlightColor:'rgba(0,0,0,0)',//Remove mobile color flashing (deprecated)
    }
  }
}
/**
 * Created by zhouzhen on 2017/2/11.
 */
import React, {
  Component,
  PropTypes,
} from 'react';

import propTypes from '../utils/propTypes';
import transitions from '../styles/transitions';

function getStyle(props, context) {
  const {
    rounded,
    circle,
    transitionEnabled,
    zDepth,
  }=props;

  const {
    baseTheme,
    paper,
    borderRadius,
  }=context.muiTheme;

  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'ragb(0,0,0,0)',// Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1],// No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? borderRadius : '0px',
    }
  }
}

class Paper extends Component {
  static propTypes = {
    children: PropTypes.node,
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    style: PropTypes.object,
    transitionEnabled: PropTypes.bool,
    zDepth: propTypes.zDepth,
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    const {
      children,
      circle,
      rounded,
      style,
      transitionEnabled,
      zDepth,
      ...other,
    } =this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyle(this.props, this.context);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    )
  }
}

export default Paper;
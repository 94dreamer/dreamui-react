/**
 * Created by zhouzhen on 2017/2/11.
 */
import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {  //根据props和默认的主题样式合并style
  const {
    backgroundColor,
    color,
    size,
  }=props;//解构获得props属性

  const {avatar}=context.muiTheme; //引入默认主题样式

  const styles = {
    root: {
      color: color || avatar.color,
      backgroundColor: backgroundColor || avatar.backgroundColor,
      userSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size / 2,
      borderRadius: '50%',
      height: size,
      width: size,
    },
    icon: {
      color: color || avatar.color,
      width: size * 0.6,
      height: size * 0.6,
      fontSize: size * 0.6,
      margin: size * 0.2,
    },
  };

  return styles;
}

class Avatar extends Component {
  render() {
    const {
      backgroundColor,
      icon,
      src,
      style,
      className,
      ...other
    }=this.props;

    const {prepareStyles}=this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    if (src) {
      return (
        <img src={src}
             style={prepareStyles(Object.assign(styles.root, style))}
             {...other}
             className={className}
        />
      )
    } else {
      return (
        <div {...other}
             style={prepareStyles(Object.assign(styles.root, style))}
             className={className}
        >
          {icon && React.cloneElement(icon, {
            color: styles.icon.color,
            style: Object.assign(styles.icon, icon.props.style),
          })}
          {this.props.children}
        </div>
      )
    }

  }
}

Avatar.muiName = 'Avatar';
Avatar.defaultProps = {
  size: 40,
};
Avatar.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
Avatar.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.color,
  icon: PropTypes.element,
  size: PropTypes.number,
  src: PropTypes.string,
  style: PropTypes.object,
};

export default Avatar;
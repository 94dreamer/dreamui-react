/**
 * Created by zhouzhen on 2017/2/11.
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import RenderToLayer from '../internal/RenderToLayer';
import Paper from '../Paper';

import ReactTransitionGroup from 'react-addons-transition-group'

class TransitionItem extends Component {//外层动画盒子
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  state = {
    style: {},
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback)
  }

  componentWillAppear(callback) {
    const spacing = this.context.muiTheme.baseTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: `translate(0,${spacing.desktopKeylineIncrement}px)`
      }
    });

    this.enterTimeout = setTimeout(callback, 450); //匹配transition duration
  }

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate(0,0)'
      }
    });

    this.leaveTimeout = setTimeout(callback, 450); //匹配transition duration
  }

  render() {
    const {style, chilren, ...other}=this.props;
    const {prepareStyles} = this.context.muiTheme;

    return (
      <div {...other} style={prepareStyles(Object.assign({}, this.state.style, style))}>
        {chilren}
      </div>
    )
  }

}

function getStyles(props, context) {
  const {
    autoScrollBodyContent,
    open,
  }=props;

  const {
    baseTheme:{
      spacing,
      palette,
    },
    dialong,
    zIndex,
  }=context.muiTheme;

  const gutter = spacing.desktopGutter;
  const borderScroll = `1px solid ${palette.borderColor}`;

  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0)', //Remove mobile color flashing (deprecated)
      zIndex: zIndex.dialog,
      top: 0,
      left: open ? 0 : -10000,
      width: '100%',
      height: '100%',
      transition: open ? transitions.easeOut('0ms', 'left', '0ms') : transitions.easeOut('0ms', 'left', '450ms'),
    },
    content: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0)', //Remove mobile color flashing (deprecated)
      transition: transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: zIndex.dialog,
    },
    actionsContainer: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0)', //Remove mobile color flashing (deprecated)
      padding: 8,
      width: '100%',
      textAlign: 'right',
      marginTop: autoScrollBodyContent ? -1 : 0,
      borderTop: autoScrollBodyContent ? borderScroll : 'none',
    },
    overlay: {
      zIndex: zIndex.dialogOverlay,
    },
    title: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      color: palette.textColor,
      fontSize: dialong.titleFontSize,
      lineHeight: '32px',
      fontWeight: 400,
      marginBottom: autoScrollBodyContent ? -1 : 0,
      borderBottom: autoScrollBodyContent ? borderScroll : 'none',
    },
    body: {
      fontSize: dialong.bodyFontSize,
      color: dialong.bodyColor,
      padding: `${props.title ? 0 : gutter}px ${gutter}px ${gutter}px ${gutter}px`,
      boxSizing: 'border-box',
      overflow: autoScrollBodyContent ? 'auto' : 'hidden',
    },
  }
}

class DialogInline extends Component {
  static propTypes = {
    actions: PropTypes.node,
    actionsContainerClassName: PropTypes.string,
    actionsContainerStyle: PropTypes.object,
    autoDetectWindowHeight: PropTypes.bool,
    autoScrollBodyContent: PropTypes.bool,
    bodyClassName: PropTypes.string,
    bodyStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    modal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    repositionOnUpdate: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.node,
    titleClassName: PropTypes.string,
    titleStyle: PropTypes.object,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.positionDialog()
  }

  componentDidUpdate(prevProps, prevState) {
    this.positionDialog()
  }

  positionDialog() {
    const {
      actions,
      autoDetectWindowHeight,
      autoScrollBodyContent,
      bodyStyle,
      open,
      repositionOnUpdate,
      title,
    }=this.props;
    if (!open) {
      return;
    }

    const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const container = ReactDOM.findDOMNode(this);
    const dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
    const dialogContent = ReactDOM.findDOMNode(this.refs.dialogContent);
    const minPaddingTop = 16;

    //重置高度以防window resized
    dialogWindow.style.height = '';
    dialogContent.style.height = '';

    const dialogWindowHeight = dialogWindow.offsetHeight;
    let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
    if (paddingTop < minPaddingTop) {
      paddingTop = minPaddingTop;
    }

    // 垂直居中 dialog window，但是确保它的position不过渡
    if (repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = `${paddingTop}px`;
    }

    //如果dialog比clentHeihgt高的话，强制设置一个高度

    if (autoDetectWindowHeight || autoScrollBodyContent) {
      const styles = getStyles(this.props, this.context);
      styles.body = Object.assign(styles.body, bodyStyle)
      let maxDialogContentHeight = clientHeight - 2 * 62;
      if (title) {
        maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
      }
      if (React.Children.count(actions)) {
        maxDialogContentHeight -= dialogContent.nextSibling.offsetHeihgt;
      }
      dialogContent.style.maxWidth = `${maxDialogContentHeight}px`;
    }
  }

  requestClose(buttonClicked) {
    if (!buttonClicked && this.props.modal) {
      return;
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(!!buttonClicked);
    }
  }

  handleKeyup = (event) => {
    if (event.keyCode === 27) {//esc键位
      this.requestClose(false)
    }
  }

  handleResize = () => {
    this.positionDialog();
  }

  render() {
    const {
      actions,
      actionsContainerClassName,
      actionsContainerStyle,
      bodyClassName,
      bodyStyle,
      children,
      className,
      contentClassName,
      contentStyle,
      overlayClassName,
      overlayStyle,
      open,
      titleClassName,
      titleStyle,
      title,
      style,
    }=this.props;

    const {prepareStyles}=this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    styles.root = Object.assign(styles.root, style);
    styles.content = Object.assign(styles.content, contentStyle);
    styles.body = Object.assign(styles.body, bodyStyle);
    styles.actionsContainer = Object.assign(styles.actionsContainer, actionsContainerStyle);
    styles.overlay = Object.assign(styles.overlay, overlayStyle);
    styles.title = Object.assign(styles.title, titleStyle);

    const actionContainer = React.children.count(actions) > 0 && (
        <div className={actionsContainerClassName} style={prepareStyles(style.actionsContainer)}>
          {React.children.toArray(actions)}
        </div>
      );
    let titleElement = title;
    if (React.isValidElement(title)) {
      titleElement = React.cloneElement(title, {
        className: title.props.className || titleClassName,
        style: prepareStyles(Object.assign(style.title, title.props.style)),
      })
    } else if (typeof title === 'string') {
      titleElement = (
        <h3 className={titleClassName} style={prepareStyles(style, title)}>
          {title}
        </h3>
      )
    }

    return (
      <div className={className} style={prepareStyles(styles.root)}>
        {open && <EventListener target="window" onKeyUp={this.handleKeyup} onResize={this.handleResize}/>}
        <ReactTransitionGroup
          component="div"
          ref="dialogWindow"
          transitionAppear={true}
          transitionAppearTimeout={450}
          transitionEnter={true}
          transitionEnterTimeout={450}
        >
          {open &&
          <TransitionItem className={contentClassName} style={styles.content}>
            <Paper zDepth={5}>
              {titleElement}
              <div ref="dialogContent" className={bodyClassName} style={prepareStyles(styles.body)}>
                {children}
              </div>
              {actionContainer}
            </Paper>
          </TransitionItem>}
        </ReactTransitionGroup>

      </div>
    )
  }

}

class Dialog extends Component {

}
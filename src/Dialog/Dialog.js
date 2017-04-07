/**
 * 对话框
 * Created by zhouzhen on 2017/2/11.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import RenderToLayer from '../internal/RenderToLayer';
import Paper from '../Paper';

import ReactTransitionGroup from 'react-addons-transition-group';

class TransitionItem extends Component { //外层动画盒子
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    style: {},
  };

  componentWillUnmount() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  }

  componentWillAppear(callback) {
    const spacing = this.context.muiTheme.baseTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: `translate(0, ${spacing.desktopKeylineIncrement}px)`,
      },
    });

    this.enterTimeout = setTimeout(callback, 450); // matches transition duration
  }

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate(0, 0)',
      },
    });

    this.leaveTimeout = setTimeout(callback, 450); // matches transition duration
  }

  render() {
    const {
      style,
      children,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    return (
      <div {...other} style={prepareStyles(Object.assign({}, this.state.style, style))}>
        {children}
      </div>
    );
  }
}

function getStyles(props, context) {
  const {
    autoScrollBodyContent,
    open,
  } = props;

  const {
    baseTheme: {
      spacing,
      palette,
    },
    dialog,
    zIndex,
  } = context.muiTheme;

  const gutter = spacing.desktopGutter;
  const borderScroll = `1px solid ${palette.borderColor}`;

  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex: zIndex.dialog,
      top: 0,
      left: open ? 0 : -10000,
      width: '100%',
      height: '100%',
      transition: open ?
        transitions.easeOut('0ms', 'left', '0ms') :
        transitions.easeOut('0ms', 'left', '450ms'),
    },
    content: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      transition: transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: zIndex.dialog,
    },
    actionsContainer: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
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
      fontSize: dialog.titleFontSize,
      lineHeight: '32px',
      fontWeight: 400,
      marginBottom: autoScrollBodyContent ? -1 : 0,
      borderBottom: autoScrollBodyContent ? borderScroll : 'none',
    },
    body: {
      fontSize: dialog.bodyFontSize,
      color: dialog.bodyColor,
      padding: `${props.title ? 0 : gutter}px ${gutter}px ${gutter}px`,
      boxSizing: 'border-box',
      overflowY: autoScrollBodyContent ? 'auto' : 'hidden',
    },
  };
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
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    //this.positionDialog();
  }

  componentDidUpdate() {
    //this.positionDialog();
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
    } = this.props;

    if (!open) {
      return;
    }

    const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const container = ReactDOM.findDOMNode(this);
    const dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
    const dialogContent = ReactDOM.findDOMNode(this.refs.dialogContent);
    const minPaddingTop = 16;

    // Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    dialogContent.style.height = '';

    const dialogWindowHeight = dialogWindow.offsetHeight;
    let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
    if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

    // Vertically center the dialog window, but make sure it doesn't
    // transition to that position.
    if (repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = `${paddingTop}px`;
    }

    // Force a height if the dialog is taller than clientHeight
    if (autoDetectWindowHeight || autoScrollBodyContent) {
      const styles = getStyles(this.props, this.context);
      styles.body = Object.assign(styles.body, bodyStyle);
      let maxDialogContentHeight = clientHeight - 2 * 64;

      if (title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;

      if (React.Children.count(actions)) {
        maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
      }

      dialogContent.style.maxHeight = `${maxDialogContentHeight}px`;
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

  handleTouchTapOverlay = () => {
    console.log("handleTouchTapOverlay");
    this.requestClose(false);
  };

  handleKeyUp = (event) => {
    if (keycode(event) === 'esc') {
      this.requestClose(false);
    }
  };

  handleResize = () => {
    this.positionDialog();
  };

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
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    styles.root = Object.assign(styles.root, style);
    styles.content = Object.assign(styles.content, contentStyle);
    styles.body = Object.assign(styles.body, bodyStyle);
    styles.actionsContainer = Object.assign(styles.actionsContainer, actionsContainerStyle);
    styles.overlay = Object.assign(styles.overlay, overlayStyle);
    styles.title = Object.assign(styles.title, titleStyle);

    const actionsContainer = React.Children.count(actions) > 0 && (
        <div className={actionsContainerClassName} style={prepareStyles(styles.actionsContainer)}>
          {React.Children.toArray(actions)}
        </div>
      );

    let titleElement = title;
    if (React.isValidElement(title)) {
      titleElement = React.cloneElement(title, {
        className: title.props.className || titleClassName,
        style: prepareStyles(Object.assign(styles.title, title.props.style)),
      });
    } else if (typeof title === 'string') {
      titleElement = (
        <h3 className={titleClassName} style={prepareStyles(styles.title)}>
          {title}
        </h3>
      );
    }

    return (
      <div className={className} style={prepareStyles(styles.root)}>
        {open &&
        <EventListener
          target="window"
          onKeyUp={this.handleKeyUp}
          onResize={this.handleResize}
        />
        }
        <ReactTransitionGroup
          component="div"
          ref="dialogWindow"
          transitionAppear={true}
          transitionAppearTimeout={450}
          transitionEnter={true}
          transitionEnterTimeout={450}
        >
          {open &&
          <TransitionItem
            className={contentClassName}
            style={styles.content}
          >
            <Paper zDepth={4}>
              {titleElement}
              <div
                ref="dialogContent"
                className={bodyClassName}
                style={prepareStyles(styles.body)}
              >
                {children}
              </div>
              {actionsContainer}
            </Paper>
          </TransitionItem>
          }
        </ReactTransitionGroup>
        <Overlay
          show={open}
          className={overlayClassName}
          style={styles.overlay}
          onClick={this.handleTouchTapOverlay}
          /*onTouchTap={this.handleTouchTapOverlay}*/
        />
      </div>
    );
  }
}


class Dialog extends Component {
  static PropTypes={
    /**
     * actionButton接受一个react element或者react element的数组
     */
    actions:PropTypes.node,
    /**
     * 添加到action按钮的容器元素上面的class名
     */
    actionsContainerClassName:PropTypes.string,
    /**
     * 覆盖一些action按钮容器的行内样式
     */
    actionsContainerStyle:PropTypes.object,
    /**
     * 如果设置为true，Dialog会有一个等同可视区域高度的最大高度。
     */
    autoDetectWindowHeight: PropTypes.bool,
    /**
     * 如果为true，Dialog中的boy content拥有自适应滚动能力
     */
    autoScrollBodyContent: PropTypes.bool,
    /**
     * dialog的容器的class名
     */
    bodyClassName: PropTypes.string,
    /**
     * dialog的容器的行内样式
     */
    bodyStyle: PropTypes.object,
    /**
     * dialog的主体.
     */
    children: PropTypes.node,
    /**
     * 根容器class.
     */
    className: PropTypes.string,
    /**
     * content的class.
     */
    contentClassName: PropTypes.string,
    /**
     * content的行内样式.
     */
    contentStyle: PropTypes.object,
    /**
     * 模态框
     * 这将导致用户必须使用dialog的action按钮之一才能逃离
     * 点击dialog主体部分之外将不会触发onRequestClose
     */
    modal: PropTypes.bool,
    /**
     * 当dialog被在外面点击或者点击按钮时 发生的回调函数
     * @param {bool} buttonClicked 将被传入，表示是否是按钮点击导致触发的回调.
     */
    onRequestClose: PropTypes.func,
    /**
     * 控制dialog是否显示
     */
    open: PropTypes.bool.isRequired,
    /**
     * 遮罩层的class
     */
    overlayClassName: PropTypes.string,
    /**
     * 遮罩层的行内样式
     */
    overlayStyle: PropTypes.object,
    /**
     * 确定对话框的内容更新时是否应该重置位置
     */
    repositionOnUpdate: PropTypes.bool,
    /**
     * 根节点容器的行内样式
     */
    style: PropTypes.object,
    /**
     * dialog的标题，可以是数字、字符串、元素或者包含它们的数组
     */
    title: PropTypes.node,
    /**
     * title标题的class
     */
    titleClassName: PropTypes.string,
    /**
     * title的行内样式
     */
    titleStyle: PropTypes.object,
  };

  static contextTypes={
    muiTheme:PropTypes.object.isRequired,
  };

  static defaultProps={
    autoDetectWindowHeight:true,
    autoScrollBodyContent:false,
    modal:false,
    repositionOnUpdate:true,
  };

  renderLayer=()=>{//免去上下文，this指代Dialog
    return (
      <DialogInline {...this.props} />
    );
  };

  render(){
    return (
      <RenderToLayer render={this.renderLayer} open={true} useLayerForClickAway={false} />
    )
  }
}

export default Dialog;
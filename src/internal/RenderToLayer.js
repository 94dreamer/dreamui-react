/**
 * 点击渲染层
 * Created by zhouzhen on 2017/4/4.
 */
import {Component, PropTypes} from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';//销毁指定容器内的所有React节点

import Dom from '../utils/dom';

class RenderToLayer extends Component {
  static propTypes = {
    componentClickAway: PropTypes.func,
    open: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    useLayerForClickAway: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  onClickAway = (event) => {
    if (event.defaultPrevented) {//被阻止了默认事件
      return;
    }

    if (!this.props.componentClickAway) {//没有点击回调
      return;
    }

    if (!this.props.open) {//没有打开
      return;
    }

    const el = this.layer;
    if (event.target !== el && event.target === window ||
      (document.documentElement.contains(event.target) && !Dom.isDescendant(el, event.target))) {
      this.props.componentClickAway(event);//点击layer之外的部分，就触发回调
    }
  };

  getLayer() {
    return this.layer;
  }

  unrenderLayer() { //卸载
    if (!this.layer) {
      return;
    }

    if (this.props.useLayerForClickAway) {
      this.layer.style.position = 'relative';
      this.layer.removeEventListener('touchstart', this.onClickAway);
      this.layer.removeEventListener('click', this.onClickAway);
    } else {
      window.removeEventListener('touchstart', this.onClickAway);
      window.removeEventListener('click', this.onClickAway);
    }

    unmountComponentAtNode(this.layer);//销毁指定容器内的所有React节点
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  /**
   * componentDidMount() 和 componentDidUpdate() 会调用此方法
   * 将react的干涉层面提升到了全局的DOM级别
   */
  renderLayer() { //相当于重新定义了render方法
    const {
      open,
      render,
    } = this.props;

    if (open) {
      if (!this.layer) {//创建一个div放到body内部，
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);

        if (this.props.useLayerForClickAway) {
          this.layer.addEventListener('touchstart', this.onClickAway);
          this.layer.addEventListener('click', this.onClickAway);
          this.layer.style.position = 'fixed';
          this.layer.style.top = 0;
          this.layer.style.bottom = 0;
          this.layer.style.left = 0;
          this.layer.style.right = 0;
          this.layer.style.zIndex = this.context.muiTheme.zIndex.layer;
        } else {
          setTimeout(() => {
            window.addEventListener('touchstart', this.onClickAway);
            window.addEventListener('click', this.onClickAway);
          }, 0);
        }
      }

      const layerElement = render();
      this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
    } else {
      this.unrenderLayer();
    }
  }

  render() {
    return null;
  }
}

export default RenderToLayer;
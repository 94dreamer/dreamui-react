/**
 * Created by zhouzhen on 2017/4/4.
 */
import {Component , PropTypes} from 'react';
import {unstable_renderSubtreeIntoContainer,unmountComponentAtNode} from 'react-dom';

import Dom from '../utils/dom';

class RenderToLayer extends Component{
  static propTypes={
    componentClickAway: PropTypes.func,
    open:PropTypes.bool.isRequired,
    render:PropTypes.func.isRequired,
    useLayerForClickAway: PropTypes.bool,
  }

  static defaultProps={
    useLayerForClickAway:true
  }
}
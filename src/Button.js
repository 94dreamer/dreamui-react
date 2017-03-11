/**
 * Created by zhouzhen on 2017/2/11.
 */
import React, {
  Component,
  PropTypes,
} from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {Size, Style, radius, round, active, disabled} = this.props;
    return (
      <div></div>
    );
  }
}

Button.propTypes = {};
Button.defaultProps = {};

export default Button;


/*
props:
 Size: string 按钮大小
 lg
 sm
 xs

 Style: string 按钮颜色
 primary
 secondary
 warning
 success
 danger
 link

 radius: bool 圆角样式
 round: bool 椭圆样式
 active: bool 是否激活
 disabled: bool 是否禁用
 */
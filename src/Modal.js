/**
 * Created by zhouzhen on 2017/2/12.
 */
import React, {
  Component,
  PropTypes,
} from 'react';

class Modal extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

Modal.propTypes = {};
Modal.defaultProps = {};

export default Modal;


fnResize();
var k = null;
window.addEventListener("resize", function () {
  clearTimeout(k);
  k = setTimeout(fnResize, 300);
}, false);
function fnResize() {
  document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth) / 15 + 'px';
}
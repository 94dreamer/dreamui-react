/**
 * Created by zhouzhen on 2017/3/30.
 */
import {PropTypes} from 'react';

export default {
  corners: PropTypes.oneOf([
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ]),//角落

  horizontal: PropTypes.oneOf(['left', 'middle', 'right']),//水平

  vertical: PropTypes.oneOf(['top', 'center', 'bottom']),//垂直

  origin:PropTypes.shape({
    horizontal:this.horizontal,
    vertical:this.vertical
  }),

  cornersAndCenter:PropTypes.oneOf([
    'bottom-center',
    'bottom-left',
    'bottom-right',
    'top-center',
    'top-left',
    'top-right',
  ]),

  stringOrNumber:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  zDepth:PropTypes.oneOf([0,1,2,3,4,5]),

}
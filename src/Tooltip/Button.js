/**
 * Created by zhouzhen on 2017/2/11.
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import classnames from 'classnames';


const buttonStyles = {
  border: '1px solid red',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10,
};

const Button = ({children, onClick}) => (
  <button style={buttonStyles} onClick={onClick}>
   {children}
  </button>
);

Button.defaultProps = {};
Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Button;
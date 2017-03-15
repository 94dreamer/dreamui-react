/**
 * Created by zhouzhen on 2017/2/10.
 */
'use strict';
import React from 'react';
import Button from'./Button';
import Alert from'./Alert';

if (!React) {
  throw new Error("DreamUIReact must  require React!");
}

module.exports = {
  version: '__version__',
  Button:Button,
  Alert: Alert,
};
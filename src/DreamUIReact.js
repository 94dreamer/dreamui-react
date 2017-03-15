/**
 * Created by zhouzhen on 2017/2/10.
 */
'use strict';
import React from 'react';
import * as DreamUIReact from './index';
if (!React) {
  throw new Error("DreamUIReact must  require React!");
}

// module.exports=DreamUIReact;
module.exports = {
  version: '__version__',
  ...DreamUIReact,
};

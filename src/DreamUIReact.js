/**
 * Created by zhouzhen on 2017/2/10.
 */
'use strict';

import React from 'react';

if(!React){
  throw new Error("DreamUIReact must  require React!");
}

module.exports={
  version:'__version__',

  Alert: require('./Alert'),
};
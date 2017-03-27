/**
 * Created by zhouzhen on 2017/3/27.
 * transtions 过渡动画函数
 */
export default {
  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut(duration,property,delay,easyFunction){
    easyFunction=easyFunction||this.easeInOutFunction;

    if(property && Object.prototype.toString.call(property)==='[object Array]'){
      let transtions='';
      for(let i=0;i<property.length;i++){
        if(transtions) transtions+=',';
        transtions+=this.create(duration,property[i],delay,easyFunction)
      }
      return transtions;
    }else {
      return this.create(duration,property,delay,easyFunction);
    }

  },

  create(duration,property,delay,easeFunction){
    duration=duration || '450ms';
    property=property || 'all';
    delay=delay || '0ms';
    easeFunction=easeFunction || 'linear';

    return `${property} ${duration} ${easeFunction} ${delay}`
  },
};
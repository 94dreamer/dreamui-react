### 1.在react组件中一个元素绑定onClick事件，点击后总会向上传播，如何阻止冒泡？有什么解决方案

React 为提高性能，有自己的一套事件处理机制，相当于将事件代理到全局进行处理，也就是说监听函数并未绑定到DOM元素上。因此，如果你禁止react事件冒泡e.stopPropagation()，你就无法阻止原生事件冒泡；你禁用原生事件冒泡e.nativeEvent.stopPropagation()，React的监听函数就调用不到了。

正确的姿势，应该是判断event.target对象，是否是目标对象、或包含的对象、或被包含的对象，来决定是否触发事件。以下函数就可以用来判断包含性：

```
function contains(root, n) {
    var node = n;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
Demo:

handleClick (e) {
    if(e.target.nodeName === 'li'){
        // do something
    }
    if(contains(this.root, e.target)){
        // do something
    }
}
```


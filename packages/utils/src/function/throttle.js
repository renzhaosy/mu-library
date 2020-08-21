// 节流
// 一定时间内只允许一次
// 通过设置一个flag来表示当前状态为正在请求中，如若已在请求中，则不允许再次请求，请求完成，刷新该flag来允许新的请求提交：

function throttle(func, wait, options) {
  let previous = 0;
  let timer, context, args, result;

  if (!options)
    options = {
      leading: true, // 是否设置节流前缘 保证第一次调用的func会立即执行，否则第一次调用也必须等待wait时间
      trailing: true, // 是否设置节流后缘 当最近一次尝试调用func时，如果func不能立即执行，会延后func的执行
    };

  const later = function () {
    // 执行时，刷新最近一次调用时间
    previous = new Date().getTime();
    timer = null;
    result = func.apply(context, args);
    // 再次检查timer,因为在执行func期间可能有新的timer被设置，
    // 如若timer被清空了，则代表没有再等待执行的func，则清空context、args
    if (!timer) context = args = null;
  };
  const throttleFn = function () {
    let cur = new Date().getTime();

    // 是否是第一次调用， 是否是节流前缘
    if (!previous && options.leading === fasle) {
      // 非节流前缘的，第一次调用会延时执行
      previous = cur;
    }

    let remain = wait - (cur - previous);

    context = this;
    args = arguments;

    // remaining<=0： 不需要等待
    // remain > wait: 等价于cur < previous,即previous 的刷新比now晚
    // 发生在 当我们当前尝试调用时，并且设置了当前时间点cur之后，此时上次延时的函数later 开始执行，并且刷新了 previous，就出现了 cur < previous的情况。 此时允许当前的func开始执行（既不会停止上一次的函数执行，也不会停止当前的函数执行），两次的返回结果取最近一次。

    if (remain <= 0 || remain > wait) {
      // 清除之前设置的延时执行
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      later();
    } else if (!timer && options.trailing !== false) {
      // 不立即执行的函数，延后执行
      timer = setTimeout(later, remain);
    }

    return result;
  };

  throttleFn.cancel = function () {
    clearTimeout(timer);
    previous = 0;
    timer = context = args = null;
  };

  return throttleFn;
}


debounce





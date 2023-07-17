/* eslint-disable */
import React, { useRef, useEffect, useMemo, forwardRef, useImperativeHandle, Ref } from 'react';
import lottie from 'lottie-web';

export default forwardRef((props, ref) => {
  // 设置props的默认值
  const { loop = true, renderer = 'svg', path = '', animationData, autoplay = true } = props;

  // 设置动画渲染的容器
  const containerEle = useRef(null);
  // 对外暴露的ref对象
  const lottieAnimation = useRef(null);

  // 指定想父级调用组件暴露的ref对象，方便元素控制当前动画的播放与暂停
  useImperativeHandle(ref, () => ({
    // 获取当前动画对象实例
    getInstance: () => lottieAnimation.current,
    // 播放，继续播放
    play: () => {
      lottieAnimation.current.play();
    },
    // 暂停动画
    pause: () => {
      lottieAnimation.current.pause();
    },
    // 停止动画，区别于暂停动画pause()
    stop: () => {
      lottieAnimation.current.stop();
    },
  }));

  // 缓存动画的相关配置
  const animationOptions = useMemo(() => {
    const options = {
      loop,
      renderer,
      autoplay,
    };

    // 优先取animationData
    if (animationData) {
      options.animationData = animationData;
    } else {
      options.path = path;
    }

    return options;
  }, [loop, renderer, path, animationData, autoplay]);

  useEffect(() => {
    if (!containerEle.current) {
      return;
    }

    // 渲染动画
    const lottieAnimationItem = lottie.loadAnimation({
      container: containerEle.current,
      ...animationOptions,
    });

    // 将渲染后的动画示例对象赋值给lottieAnimation.current，对外暴露
    lottieAnimation.current = lottieAnimationItem;

    // 一定要注意这里的对象销毁，避免内存泄露，以及重复渲染动画
    return () => {
      // 重置为null
      lottieAnimation.current = null;
      // 销毁动画对象
      lottieAnimationItem.destroy();
    };
  }, [animationOptions]);

  // 因为lottie动画是无线宽高的，所以这里直接设置渲染的容器宽度、高度为父级元素100%即可
  return <div ref={containerEle} style={{ width: '100%', height: '100%' }}></div>;
});

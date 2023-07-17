/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Lottie from './Lottie';
import animationData from './data.json';
import './index.less';

const LoadingSelf = (props) => {
  const lottieRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <div className="loading_self">
      {props.children}

      {props.showLoading && (
        <div className={classNames('lottie_wrap', { [props.loadingClassName]: props.loadingClassName })}>
          <div className="lottie">
            <Lottie
              ref={lottieRef}
              animationData={animationData}
              // path="http://bnq-test-all.oss-cn-shanghai.aliyuncs.com/accm/dev/photo/8ac2f38384f1a9140184f56bb5ba0015.json?Expires=4826238388&OSSAccessKeyId=LTAI5t5wLbdz7a6rhVvqaKNs&Signature=%2BCXSwbYaadatvRAU0z3x4mzlRfQ%3D"
            />
          </div>
        </div>
      )}
    </div>
  );
};

LoadingSelf.propTypes = {
  showLoading: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  loadingClassName: PropTypes.string,
};

LoadingSelf.defaultProps = {
  showLoading: false,
  isFullScreen: false,
  loadingClassName: '',
};

export default LoadingSelf;

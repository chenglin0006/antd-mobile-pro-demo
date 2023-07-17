import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { rnToolV2 } from 'web-message-for-rn';
import { Tools } from '@/util';
import BackImg from '../images/headerBack.png';
import './index.less';

const Index = memo((props) => {
  const { title, backFun, rightElement, style, leftElement, hideLeft } = props;
  useEffect(() => {
    if (Tools.isJuApp()) {
      // document.title = '审批详情';
      rnToolV2.sendMsgToRN('customConfig', { hideNav: true }, (info) => {
        console.log('======隐藏头部', info);
      });
    }
  }, []);
  return (
    <div className={`base-entry-page-header ${Tools.isIOS() ? 'is-ios' : ''}`} style={style}>
      <div className="img-wrapper">
        {hideLeft ? null : leftElement || <img className="back" onClick={backFun} alt="" src={BackImg} />}
      </div>

      <span className="title-span">{title}</span>
      <div className="right-element">{rightElement}</div>
    </div>
  );
});
Index.propTypes = {
  title: PropTypes.string,
  backFun: PropTypes.func,
  rightElement: PropTypes.element,
  style: PropTypes.object,
  leftElement: PropTypes.element,
  hideLeft: PropTypes.bool,
};
Index.defaultProps = {
  title: '',
  style: {},
  rightElement: null,
  leftElement: null,
  backFun: () => {},
  hideLeft: false,
};
export default Index;

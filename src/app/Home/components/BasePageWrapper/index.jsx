import React, { memo } from 'react';
import PropTypes from 'prop-types';
import WrapperHeader from './WrapperHeader';
import WrapperFooter from './WrapperFooter';
import './index.less';

const Index = memo((props) => {
  const { backFun, title, hideLeft, rightElement, className, leftElement, bottomElement } = props;

  return (
    <div className={`base-entry-wrap-page ${className}`}>
      <WrapperHeader
        hideLeft={hideLeft}
        title={title}
        leftElement={leftElement}
        rightElement={rightElement}
        backFun={backFun}
      />
      <div className="base-entry-wrap-page-content">{props.children}</div>
      {bottomElement ? <WrapperFooter>{bottomElement}</WrapperFooter> : null}
    </div>
  );
});

Index.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  rightElement: PropTypes.object,
  backFun: PropTypes.func,
  bottomElement: PropTypes.object,
  leftElement: PropTypes.object,
  hideLeft: PropTypes.bool,
};

Index.defaultProps = {
  className: '',
  title: '',
  leftElement: null,
  rightElement: null,
  bottomElement: null,
  hideLeft: false,
  backFun: () => {},
};

export default Index;

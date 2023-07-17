import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';
import './index.less';

function PopupHeader({ onClose, onConfirm }) {
  return (
    <div className="popup-header">
      <Button fill="none" size="mini" style={{ color: '#3478f6' }} onClick={onClose}>
        取消
      </Button>
      <Button fill="none" size="mini" style={{ color: '#3478f6' }} onClick={onConfirm}>
        确定
      </Button>
    </div>
  );
}

PopupHeader.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

PopupHeader.defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
};

export default PopupHeader;

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import camera from '../../images/upload.png';
import './index.less';

const UploadBox = forwardRef((props, ref) => {
  const { multiple, children } = props;
  return (
    <div className="upload-box">
      {children || (
        <div className="selfUpload">
          <img src={camera} alt="" />
        </div>
      )}
      <input
        type="file"
        accept="image/*,.pdf,.xls,.xlsx,.doc,.pptx,.ppt,.docx"
        id="uploadFile"
        ref={ref}
        multiple={multiple}
      />
    </div>
  );
});
UploadBox.propTypes = {
  multiple: PropTypes.bool,
  children: PropTypes.element,
};
UploadBox.defaultProps = {
  multiple: true,
  children: null,
};
export default UploadBox;

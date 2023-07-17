import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageViewer } from 'antd-mobile';
import { PictureOutline } from 'antd-mobile-icons';
import './index.less';

function ImageItem({ handleDelete, isSuccess, fileUrl, isDelete, index, fileList }) {
  const imageRef = useRef();
  const [imgSource, setImeSource] = useState({
    images: [],
    visible: false,
    currentIndex: 0,
  });
  const handlePreviewImage = () => {
    imageRef.current.swipeTo(index, false);
    setImeSource({
      visible: true,
      images: fileList,
    });
  };
  const handleClose = () => {
    setImeSource({
      visible: false,
    });
  };
  return (
    <>
      <div className={`adm-image-item ${(index + 1) % 3 === 0 ? 'last-line-item' : ''}`}>
        <div className="adm-image" onClick={handlePreviewImage}>
          {isSuccess ? (
            <img src={fileUrl} className="" alt="" />
          ) : (
            <div className="adm-image-tip">
              <PictureOutline />
            </div>
          )}
        </div>
        {isDelete && (
          <div className="delete-wrapper" onClick={handleDelete}>
            <img className="delete-icon" alt="" />
          </div>
        )}
      </div>
      <ImageViewer.Multi
        ref={imageRef}
        images={imgSource.images}
        onClose={handleClose}
        visible={imgSource.visible}
        defaultIndex={imgSource.currentIndex}
      />
    </>
  );
}
ImageItem.propTypes = {
  handleDelete: PropTypes.func,
  isSuccess: PropTypes.bool,
  fileUrl: PropTypes.string.isRequired,
  isDelete: PropTypes.bool,
  fileList: PropTypes.array,
  index: PropTypes.number,
};
ImageItem.defaultProps = {
  handleDelete: () => {},
  isSuccess: true,
  isDelete: true,
  fileList: [],
  index: 0,
};
export default ImageItem;

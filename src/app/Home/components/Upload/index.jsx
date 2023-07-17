/* eslint-disable */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Toast, Modal, SpinLoading } from 'antd-mobile';
import _ from 'lodash';
import { Tools } from '@/util';
import { ImageItem, FileItem, UploadBox } from './Item';
import './index.less';
import useFun from '../../useFun';

function Upload(props) {
  const {
    taskAttachmentList,
    onChange,
    maxCount,
    uploadSuccess,
    uploadFail,
    isPreview,
    size,
    uploadTitle,
    limit,
    uploadTip,
    multiple,
    children,
  } = props;
  const uploadRef = useRef();
  const uploadFileList = useRef();
  const areaFileList = useRef([]);
  const [imgList, setImgList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const { common } = useDispatch();
  const { isImage } = useFun();

  const closeLoading = (id) => {
    const filterList = areaFileList.current.filter((item) => item.id !== id);
    areaFileList.current = filterList;
    setAreaList(filterList);
  };

  // 判断当前图片是否有效
  const checkImageExists = (fileUrl) => {
    return new Promise((resolve) => {
      const image = new Image(fileUrl);
      image.src = fileUrl;
      image.onload = () => {
        resolve(fileUrl);
      };
      image.onerror = () => {
        resolve(null);
      };
    });
  };
  const handleUploadError = (err, id) => {
    closeLoading(id);
    uploadFail && uploadFail(err);
  };
  const handleUploadSuccess = async (res, file, i) => {
    console.log('fileName', file.name);
    let resObj = {};
    if (res.code === 0) {
      const { fileUrl, fid } = res?.content;
      const data = await checkImageExists(fileUrl);
      resObj = {
        fid,
        fileUrl,
        fileName: file.name,
        isSuccess: !!data,
      };
      // 关闭loading
      closeLoading(`${file.lastModified}-${i}`);
      uploadSuccess && uploadSuccess(resObj);
      typeof onChange === 'function' &&
        onChange(_.unionBy([...(uploadFileList.current || []), { ...resObj }], 'fileUrl'));
    } else {
      handleUploadError(res, `${file.lastModified}-${i}`);
    }
    document.getElementById('uploadFile').value = '';
  };

  const handleUpload = async (files) => {
    if (files.length) {
      // 开启loading填充
      const areaListFileList = files.map((item, index) => ({
        id: `${item.lastModified}-${index}`,
      }));
      setAreaList(areaListFileList);
      areaFileList.current = areaListFileList;
    }
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const res = await common.upload(file);
          handleUploadSuccess(res, file, i);
        } catch (e) {
          handleUploadError(e, `${file.lastModified}-${i}`);
        }
      }
    }
  };
  const onCountExceed = (exceed) => {
    if (exceed > maxCount) {
      const count = exceed - maxCount;
      Toast.show(`最多选择 ${maxCount} 份文件，你多选了 ${count} 份`);
      return false;
    }
    const length = uploadFileList.current ? uploadFileList.current.length : 0;
    if (exceed + length > limit) {
      const count = exceed + length - limit;
      Toast.show(`最多上传 ${limit} 份文件，你多选了 ${count} 份`);
      return;
    }
    return true;
  };
  const beforeUpload = () => {
    // 重置loading填充区域
    setAreaList([]);
    areaFileList.current = [];
    const files = [...uploadRef.current.files];
    console.log('files', files);
    if (!onCountExceed(files.length)) return;
    if (!_.isEmpty(files)) {
      const handleFiles = files.map((i) => {
        i.isSize = size ? i.size / 1024 / 1024 <= size : true;
        return i;
      });
      const errFiles = handleFiles.filter((f) => !f.isSize);
      if (!_.isEmpty(errFiles)) {
        Modal.alert({
          className: 'error-upload-tip',
          content: (
            <div>
              {errFiles.map((i) => (
                <span>
                  {i.name}:{!i.isSize ? `请选择小于 ${size}M 的图片` : ''}
                  {!i.isImage ? `${!i.isSize ? '，' : ''}图片格式仅支持png/jpeg/jpg/gif` : ''}
                </span>
              ))}
            </div>
          ),
        });
      }
      handleUpload(handleFiles.filter((i) => i.isSize));
    }
  };
  const handleDelete = (delFile) => {
    const fList = fileList.filter((i) => i.fid !== delFile.fid);
    const lList = imgList.filter((i) => i.fid !== delFile.fid);
    setFileList(fList);
    setImgList(lList);
    typeof onChange === 'function' && onChange(fList.concat(lList));
  };
  const handleUserMedia = (params = { video: true }) => {
    console.log(navigator, 'navigator');

    const success = () => {
      console.log('同意调用相机');
    };

    const error = (msg) => {
      console.log(`拒绝调用相机:${msg}`);
    };

    if (
      navigator?.mediaDevices?.getUserMedia ||
      navigator?.webkitGetUserMedia ||
      navigator?.mozGetUserMedia ||
      navigator?.msGetUserMedia
    ) {
      console.log('支持');
      if (navigator?.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(params)
          .then(() => success())
          .catch((e) => error(e));
      } else if (navigator?.webkitGetUserMedia) {
        navigator
          ?.webkitGetUserMedia(params)
          .then(() => success())
          .catch((e) => error(e));
      } else if (navigator?.mozGetUserMedia) {
        navigator
          ?.mozGetUserMedia(params)
          .then(() => success())
          .catch((e) => error(e));
      } else if (navigator?.msGetUserMedia) {
        navigator
          ?.msGetUserMedia(params)
          .then(() => success())
          .catch((e) => error(e));
      }
    } else {
      Toast.show('你的设备不支持访问媒体设备');
    }
  };
  const showUploadIcon = useMemo(() => {
    if (isPreview) return false;
    if (taskAttachmentList && taskAttachmentList.length) {
      return taskAttachmentList.length < limit;
    }
    return true;
  }, [limit, isPreview, taskAttachmentList]);
  useEffect(() => {
    uploadRef.current?.addEventListener('change', beforeUpload);
    return () => {
      uploadRef.current?.removeEventListener('change', beforeUpload);
    };
    // 加上这个依赖是因为 当上传组件隐藏后 事件监听监听方法失效了 应该重启进行事件监听
  }, [showUploadIcon]);
  useEffect(() => {
    if (Tools.isJuApp() && Tools.isAndroid()) {
      handleUserMedia();
    }
  }, []);
  useEffect(() => {
    if (taskAttachmentList) {
      setImgList(taskAttachmentList.filter((item) => isImage(item.fileUrl)));
      setFileList(taskAttachmentList.filter((item) => !isImage(item.fileUrl)));
      uploadFileList.current = taskAttachmentList;
    }
  }, [JSON.stringify(taskAttachmentList)]);

  return (
    <>
      <div className="taskAttachmentList">
        {limit ? <div className="max-desc">最多上传{limit}个附件</div> : null}
        <div className="image-wrapper">
          <div className="image-list">
            {imgList.map((item, index) => (
              <ImageItem
                isDelete={!isPreview && !item.hideDelete}
                key={item.fid}
                index={index}
                fileList={imgList.map((item) => item.fileUrl)}
                fileUrl={item.fileUrl}
                isSuccess={item.isSuccess}
                handleDelete={() => handleDelete(item)}
              />
            ))}
            {areaList.map((item) => (
              <div className="adm-image-uploader-cell" key={item.id}>
                <div className="image-area-wrapper">
                  <div className="adm-image-uploader-cell-loading">
                    <SpinLoading color="#ffffff" />
                    <span className="adm-image-uploader-cell-mask-message">{uploadTip}</span>
                  </div>
                </div>
              </div>
            ))}
            {showUploadIcon && (
              <UploadBox ref={uploadRef} multiple={multiple} uploadTitle={uploadTitle}>
                {children}
              </UploadBox>
            )}
          </div>
        </div>
        <div className="pdf-list">
          {fileList.map((item) => (
            <FileItem
              isDelete={!isPreview && !item.hideDelete}
              key={item.fid}
              fileUrl={item.fileUrl}
              fileName={item.fileName}
              handleDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
Upload.propTypes = {
  maxCount: PropTypes.number,
  uploadSuccess: PropTypes.func,
  uploadFail: PropTypes.func,
  isPreview: PropTypes.bool,
  size: PropTypes.number,
  uploadTitle: PropTypes.string, // 上传icon
  limit: PropTypes.number, // 最多可上传多少文件
  uploadTip: PropTypes.string, // 上传文案提示
  multiple: PropTypes.bool, // 是否可以多选
  children: PropTypes.element,
};
Upload.defaultProps = {
  maxCount: 5,
  limit: 10,
  isPreview: false,
  size: 0,
  uploadTitle: '上传',
  uploadTip: '上传中...',
  multiple: true,
  children: null,
};
export default Upload;

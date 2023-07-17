/* eslint-disable import/extensions */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../images/remove.png';
import PdfIcon from '../../../../images/pdf.png';
import ExcelIcon from '../../../../images/excel3.png';
import WordIcon from '../../../../images/word.png';
import useFun from '../../../../useFun';
import './index.less';

function FileItem({ handleDelete, fileUrl, isDelete, fileName }) {
  console.log(fileUrl, 'fileUrl');
  const { previewFun, isExcel, isWord } = useFun();

  const ImgIcon = useMemo(() => {
    if (isExcel(fileUrl)) {
      return ExcelIcon;
    }
    if (isWord(fileUrl)) {
      return WordIcon;
    }
    return PdfIcon;
  }, [fileUrl]);

  return (
    <>
      <div
        className="pdf-wrapper"
        onClick={() => {
          previewFun({ fileName, fileUrl });
        }}
      >
        <div className="file-wrapper">
          <img src={ImgIcon} alt="" />
        </div>
        <div className="file-name">{fileName}</div>
        {isDelete && (
          <div
            className="delete-wrapper"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <img className="delete-icon" src={deleteIcon} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
FileItem.propTypes = {
  handleDelete: PropTypes.func,
  fileUrl: PropTypes.string.isRequired,
  isDelete: PropTypes.bool,
  fileName: PropTypes.string,
};
FileItem.defaultProps = {
  handleDelete: () => {},
  isDelete: true,
  fileName: '未命名.pdf',
};
export default FileItem;

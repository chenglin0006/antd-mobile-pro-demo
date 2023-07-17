/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import { rnToolV2 } from 'web-message-for-rn';
import { Tools } from '@/util';

export default function useFun() {
  const toPdfPreview = (url) => {
    const ua = window.navigator.userAgent.toLocaleLowerCase();
    const isAndroid = /android/.test(ua);
    if (isAndroid) {
      history.push({
        pathname: '/complaint/service/pdf',
        state: {
          filePath: url,
          title: '文件预览',
        },
      });
    } else {
      Tools.pushWebView(url, '文件预览');
    }
  };

  const previewFun = ({ fileName, fileUrl }) => {
    const isPdf = fileName.endsWith('pdf');
    if (isPdf) {
      rnToolV2.sendMsgToRN(
        'router',
        {
          link: `app://PDFReader?title=预览文件&pdfURL=${fileUrl}`,
        },
        () => {},
      );
    } else {
      rnToolV2.sendMsgToRN(
        'openFile',
        {
          file: {
            name: fileName,
            url: fileUrl,
          },
        },
        (info) => {
          console.log('info', info);
        },
      );
    }
  };

  const isPdf = (fileUrl) => {
    return fileUrl.endsWith('.pdf');
  };

  const isWord = (fileUrl) => {
    return /\.(doc|docx)$/.test(fileUrl);
  };

  const isExcel = (fileUrl) => {
    return /\.(xlsx|xls)$/.test(fileUrl);
  };

  const isImage = (fileUrl) => {
    return /\.(png|jpe?g|gif|svg)$/.test(fileUrl);
  };

  const statusEnum = [
    { name: '发起反馈', id: 1 },
    { name: '处理中', id: 2 },
    { name: '处理完成', id: 3 },
  ];

  return {
    previewFun,
    toPdfPreview,
    isPdf,
    isWord,
    isExcel,
    isImage,
    statusEnum,
  };
}

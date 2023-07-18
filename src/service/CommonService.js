/* eslint-disable no-param-reassign */
import { Remote } from '../util';

class CommonService {
  getCurrentUser = (params) => {
    return Remote.get('/user/getCurrentUser', params);
  };

  upload = (file) => {
    return Remote.post(
      '/api/fileUpload/uploadFileWithFileSuffix',
      { file, bucket: 'bajanju-p' },
      { urlType: 'oss', type: 'file' },
    );
  };
}

export default CommonService;

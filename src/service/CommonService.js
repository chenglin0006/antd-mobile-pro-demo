/* eslint-disable no-param-reassign */
import { Remote } from '../util';

class CommonService {
  getCurrentUser = (params) => {
    return Remote.get('/user/getCurrentUser', params);
  };

  getTodoMetaData = (params) => {
    return Remote.get('/source/meta', params);
  };

  getRoleList(params) {
    return Remote.get(`/taskUpgradeConfig/getRoleListByTaskTypeId`, params);
  }

  getArrayList(params) {
    return Remote.get(`/taskUpgradeConfig/listStaticUserGroup`, params);
  }

  getJobList(params) {
    return Remote.get(`/taskUpgradeConfig/getJobTitleListForUserInJob`, params);
  }

  getEmployeeListByKeyword(params) {
    return Remote.get(`/taskUpgradeConfig/getUserListByKeyword`, params);
  }

  uploadFile(params) {
    const { fileType, needSuffix, ...restParams } = params;
    let url = '/fileUpload/uploadFile';
    if (needSuffix) {
      url = '/fileUpload/uploadFileWithFileSuffix';
    }
    return Remote.post(url, restParams, {
      urlType: 'aliOss',
      type: 'file',
    });
  }
}

export default CommonService;

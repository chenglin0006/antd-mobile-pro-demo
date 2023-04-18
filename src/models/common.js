import CommonService from '@/service/CommonService';

const Services = new CommonService();

export default {
  state: {
    currentUser: {},
    isInQiankun: !!window.__POWERED_BY_QIANKUN__,
    systemEnum: [],
    handleStatusEnum: [],
    instanceStatusEnum: [], // 审批状态枚举
    taskStatusEnum: [], // 任务状态枚举
    isShop: false, // 是否为店铺管理页面
  },
  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    // 获取用户信息
    async getCurrentUser() {
      const { data } = await Services.getCurrentUser();
      const { userInfo } = data;
      console.log(data, 11111111);
      this.save({
        currentUser: {
          realName: userInfo.realName,
          username: userInfo.username,
          userNo: userInfo.user,
        },
      });
      return data;
    },

    async getTodoMetaData() {
      const { data } = await Services.getTodoMetaData();
      this.save({
        systemEnum: data?.systemList || [],
        handleStatusEnum: data?.handleStatus || [],
        instanceStatusEnum: data?.instanceStatus || [],
        taskStatusEnum: data?.taskFlowStatus || [],
      });
      return data;
    },

    async logout() {
      // message.error('登录失败, 请在通用管理后台重新登录后拿到accessToken后再访问');
      // localhost.bnq.com.cn:8009?accessToken=xxx
      // https://todo-dev.bnqoa.com?accessToken=xxx
    },

    async getRoleList(params) {
      const { data = [] } = await Services.getRoleList(params);
      return data;
    },
    async getArrayList(params) {
      const { data = [] } = await Services.getArrayList(params);
      return data;
    },
    async getJobList(params) {
      const { data = [] } = await Services.getJobList(params);
      return data;
    },
    async getEmployeeListByKeyword(params) {
      const { data = [] } = await Services.getEmployeeListByKeyword(params);
      return data;
    },

    async uploadFile(params) {
      params.bucket = 'bnq-zhima';
      const { content } = await Services.uploadFile(params);
      return content;
    },
  },
};

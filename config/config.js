const config = {
  projectName: '统一待办',
  projectDesc: '待办',
  // 自定义icon地址，用于menu，使用参考：https://ant.design/components/icon-cn/#components-icon-demo-scriptUrl
  // 可以添加多个
  iconScriptUrl: ['//at.alicdn.com/t/font_2704727_ssy6wgjae0e.js'],
  // logo
  defaultLogo: 'https://res1.bnq.com.cn/6e45fcfa-573d-4a07-82a0-20a960adaec1',
  // 默认头像
  defaultAvatar: 'https://res1.bnq.com.cn/d51704b0-7aa8-4c4d-a3f1-6d576ede7a2d',
  // 百安居纯汉字logo
  defaultImg: 'https://res1.bnq.com.cn/e1c98656-6539-44ab-9884-6d8bd5de0ef8',
  // 主题样式
  theme: {
    // antd for pc，参考：https://ant.design/docs/react/customize-theme-cn
    'primary-color': '#3478f6',
    'link-color': '#3478F6',
    'primary-color-hover': '#2A6DE8',
    'border-radius-base': '4px',
    // antd-mobile for，参考：https://mobile.ant.design/docs/react/customize-theme-cn
    'brand-primary': '#1890FF',
    '@ant-prefix': 'todocenter',
  },
  menus: [
    {
      name: '统一待办',
      icon: 'icon-yuyuedanguanli2',
      path: '/mytodocenter',
      children: [
        {
          name: '数据源列表',
          path: '/mytodocenter/datasource/list',
        },
        {
          name: '流程数据',
          path: '/mytodocenter/processdata',
          children: [
            {
              name: '审批管理',
              path: '/mytodocenter/processdata/approval/list',
            },
            {
              name: '任务管理',
              path: '/mytodocenter/processdata/task/list',
            },
          ],
        },
        {
          name: '待办事项',
          path: '/mytodocenter/todeal',
          children: [
            {
              name: '审批管理',
              path: '/mytodocenter/todeal/approval/list',
            },
            {
              name: '任务管理',
              path: '/mytodocenter/todeal/task/list',
            },
          ],
        },
        {
          name: '审批',
          icon: 'icon-yuyuedanguanli2',
          path: '/mytodocenter/approval',
          children: [
            {
              name: '全部',
              path: '/mytodocenter/approval/all',
            },
            {
              name: '待审批',
              path: '/mytodocenter/approval/waiting_handle',
            },
            {
              name: '已审批',
              path: '/mytodocenter/approval/handled',
            },
            {
              name: '稍后处理',
              path: '/mytodocenter/approval/deal_later',
            },
            {
              name: '我发起的',
              path: '/mytodocenter/approval/my_apply',
            },
            {
              name: '我被驳回的',
              path: '/mytodocenter/approval/been_rejected',
            },
            {
              name: '抄送我的',
              path: '/mytodocenter/approval/cc_me',
            },
          ],
        },
        {
          name: '任务',
          icon: 'icon-yuyuedanguanli2',
          path: '/mytodocenter/task',
          children: [
            {
              name: '全部',
              path: '/mytodocenter/task/all',
            },
            {
              name: '逾期任务',
              path: '/mytodocenter/task/be_overdue_task',
            },
            {
              name: '今日任务',
              path: '/mytodocenter/task/today_task',
            },
            {
              name: '明日任务',
              path: '/mytodocenter/task/tomorrow_task',
            },
            {
              name: '近7日任务',
              path: '/mytodocenter/task/seven_days_task',
            },
          ],
        },
        {
          name: '门店管理',
          icon: 'icon-yuyuedanguanli2',
          path: '/mytodocenter/shop',
          children: [
            {
              name: '门店管理',
              path: '/mytodocenter/shop/list',
            },
          ],
        },
        {
          name: '管理驾驶仓',
          path: '/mytodocenter/statistic',
          children: [
            {
              name: '数据看板',
              path: '/mytodocenter/statistic/index',
            },
            {
              name: '赔付清单',
              path: '/mytodocenter/statistic/compensation/list',
            },
            {
              name: '升级数据清单',
              path: '/mytodocenter/statistic/upgrade',
            },
            {
              name: '关联商品清单',
              path: '/mytodocenter/statistic/relatedGoods',
            },
          ],
        },
        {
          name: '服务中心设置',
          path: '/mytodocenter/serviceSetting',
          children: [
            {
              name: '类型设置',
              path: '/mytodocenter/serviceSetting/complainTypeLevel',
            },
            {
              name: '内部服务类型设置',
              path: '/mytodocenter/serviceSetting/twoComplainType',
            },
          ],
        },
        {
          name: '清单',
          path: '/mytodocenter/listing',
          children: [
            {
              name: '任务清单',
              path: '/mytodocenter/listing/task/list',
            },
            {
              name: '责任清单',
              path: '/mytodocenter/listing/duty/list',
            },
            {
              name: '客服任务清单',
              path: '/mytodocenter/listing/serviceTask',
            },
          ],
        },
        {
          name: '内部服务',
          path: '/mytodocenter/inlisting',
          children: [
            {
              name: '任务清单',
              path: '/mytodocenter/inlisting/task/taskList',
            },
            {
              name: '数据看板',
              path: '/mytodocenter/inlisting/twoindex',
            },
          ],
        },
      ],
    },
    // {
    //   name: '审批',
    //   icon: 'icon-yuyuedanguanli2',
    //   path: '/mytodocenter/approval',
    //   children: [
    //     {
    //       name: '全部',
    //       path: '/mytodocenter/approval/all',
    //     },
    //     {
    //       name: '待审批',
    //       path: '/mytodocenter/approval/waiting_handle',
    //     },
    //     {
    //       name: '已审批',
    //       path: '/mytodocenter/approval/handled',
    //     },
    //     {
    //       name: '我发起的',
    //       path: '/mytodocenter/approval/me_start',
    //     },
    //     {
    //       name: '我驳回的',
    //       path: '/mytodocenter/approval/me_reject',
    //     },
    //   ],
    // },
    // {
    //   name: '任务',
    //   icon: 'icon-yuyuedanguanli2',
    //   path: '/mytodocenter/task',
    //   children: [
    //     {
    //       name: '全部',
    //       path: '/mytodocenter/task/all',
    //     },
    //     {
    //       name: '今日任务',
    //       path: '/mytodocenter/task/today',
    //     },
    //     {
    //       name: '明日任务',
    //       path: '/mytodocenter/task/tomorrow',
    //     },
    //     {
    //       name: '近7日任务',
    //       path: '/mytodocenter/task/7days',
    //     },
    //   ],
    // },
  ],
};

module.exports = config;

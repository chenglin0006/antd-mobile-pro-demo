export default [
  {
    path: '/home',
    exact: true,
    text: '仪表盘',
    page: () => {
      return import('@/app/Home');
    },
  },
];

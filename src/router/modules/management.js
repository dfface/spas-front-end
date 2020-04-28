export default [
  {
    path: '/management/user',
    name: 'ManagementUser',
    component: () => import('../../components/management/User')
  },
  {
    path: '/management/office',
    name: 'ManagementOffice',
    component: () => import('../../components/management/Office')
  }
]

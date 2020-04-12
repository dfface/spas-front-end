export default [
  {
    path: '/report/new',
    name: 'ReportNew',
    component: () => import('../../components/report/New')
  },
  {
    path: '/report/detail/:id',
    name: 'ReportDetail',
    props: true,
    component: () =>  import('../../components/report/Detail')
  },
  {
    path: '/report/history',
    name: 'ReportHistory',
    component: () => import('../../components/report/History')
  }
]

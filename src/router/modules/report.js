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
    props: {isGov: true},
    component: () => import('../../components/report/History')
  },
  {
    path: '/report/evaluate-history',
    name: 'ReportEvaluateHistory',
    props: {isGov: false},
    component: () => import('../../components/report/History')
  },
  {
    path: '/report/evaluating',
    name: 'ReportEvaluating',
    component: () => import('../../components/report/Evaluating')
  }
]

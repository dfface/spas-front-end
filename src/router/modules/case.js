export default [
  {
    path: '/case/new',
    name: 'CaseNew',
    component: () => import('../../components/case/New')
  },
  {
    path: '/case/detail/:caseId',
    name: 'CaseDetail',
    props: true,
    component: () => import('../../components/case/Detail')
  },
  {
    path: '/case/handling',
    name: 'CaseHandling',
    component: () => import('../../components/case/Handling') // 大BUG：不是components 不要加s
  },
  {
    path: '/case/history',
    name: 'CaseHistory',
    component: () => import('../../components/case/History')
  },
  {
    path: '/case/auditing',
    name: 'CaseAuditing',
    component: () => import('../../components/case/Auditing')
  }
]

export default [
  {
    path: '/suggestion/new/:id?',
    name: 'SuggestionNew',
    props: true,
    component: () => import('../../components/suggestion/New')
  },
  {
    path: '/suggestion/detail/:id',
    name: 'SuggestionDetail',
    props: true,
    component: () => import('../../components/suggestion/Detail')
  },
  {
    path: '/suggestion/history',  // 不能掉最开头的斜杠
    name: 'SuggestionHistory',
    component: () => import('../../components/suggestion/History')
  },
  {
    path: '/suggestion/associate',
    name: 'SuggestionAssociate',
    component: () => import('../../components/suggestion/Associate')
  }

]

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
  }
]

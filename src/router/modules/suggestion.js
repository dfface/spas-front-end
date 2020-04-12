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
    props: {isGov: false},
    component: () => import('../../components/suggestion/History')
  },
  {
    path: '/suggestion/associate',
    name: 'SuggestionAssociate',
    component: () => import('../../components/suggestion/Associate')
  },
  {
    path: '/suggestion/replying',
    name: 'SuggestionReplying',
    component: () => import('../../components/suggestion/Replying')
  },
  {
    path: '/suggestion/reply-history',
    name: 'SuggestionReplyHistory',
    props: {isGov: true},
    component: () => import('../../components/suggestion/History')
  }

]

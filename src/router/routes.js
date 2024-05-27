import MainLayout from 'layouts/MainLayout.vue';
import LoginPage from 'pages/login.vue';
import LoginLayout from 'layouts/LoginLayout.vue';
import authGuard from '../guards/authGuard';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [

      {
        path: '/home', name: 'home', component: () => import('pages/IndexPage.vue'), beforeEnter: authGuard,
      },
      {
        path: '/pacientes', name: 'pacientes', component: () => import('pages/paginaPaciente.vue'), beforeEnter: authGuard,
      },
      {
        path: '/userPage', name: 'userPage', component: () => import('src/pages/userPage.vue'), beforeEnter: authGuard,
      },
      {
        path: '/paginaSobre', name: 'paginaSobre', component: () => import('pages/paginaSobre.vue'), beforeEnter: authGuard,
      },
      {
        path: '/addNoticias', name: 'addNoticia', component: () => import('pages/addNoticias.vue'), beforeEnter: authGuard,
      },
      {
        path: '/addPacientes/:id?', name: 'addPaciente', component: () => import('pages/addPacientes.vue'), beforeEnter: authGuard,
      },
      {
        path: '/noticia/:id',
        name: 'NoticiaPage',
        component: () => import('pages/noticia.vue'),
        beforeEnter: authGuard,
      },
      {
        path: '/paciente/:id',
        name: 'PacientePage',
        component: () => import('pages/paciente.vue'),
        beforeEnter: authGuard,
      },
      {
        path: '/prontuario/:id',
        name: 'ProntuarioPage',
        component: () => import('pages/prontuario.vue'),
        beforeEnter: authGuard,
      },
      {
        path: '/addProntuario/:id',
        name: 'addProntuario',
        component: () => import('pages/addProntuario.vue'),
        beforeEnter: authGuard,
      },
      {
        path: '/minhaFicha', name: 'minhaFicha', component: () => import('pages/minhaFicha'), beforeEnter: authGuard,
      },
      {
        path: '/info', name: 'informacoes', component: () => import('pages/infoPage'), beforeEnter: authGuard,
      },
    ],
  },

  {
    path: '',
    component: LoginLayout,
    children: [
      { path: '', name: 'login_', component: LoginPage },
      { path: '/recuperar', name: 'recuperar', component: () => import('pages/recuperacao.vue') },
      {
        path: '/novaSenha/:token',
        name: 'novaSenha',
        component: () => import('pages/novaSenha.vue'),
        props: true,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;

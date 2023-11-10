// eslint-disable-next-line func-names
export default function (to, from, next) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Usuário não autenticado, redireciona para a página de login
    next({ name: 'login_' });
  } else {
    // Usuário autenticado, permite o acesso à rota solicitada
    next();
  }
}

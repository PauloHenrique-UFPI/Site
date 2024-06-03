import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://tbkoch.com.br/api2/' });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };

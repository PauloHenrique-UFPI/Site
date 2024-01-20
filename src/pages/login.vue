<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-md" style="min-width: 35%;">
      <q-card class="my-card0">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <h2 style="text-align: center;">Login</h2>
          <q-input rounded outlined v-model="username" label="E-mail" :readonly="loading" />

          <q-input rounded outlined v-model="password" @keyup.enter="submitForm"
          type="password" label="Senha" :readonly="loading"/>
          <div class="q-gutter-md q-mt-md q-mb-md q-flex q-items-end">
            <router-link to="/recuperar" class="text-primary">
              Esqueceu a senha?
            </router-link>
          </div>
          <div class="card0">
            <q-btn
              unelevated
              rounded
              @click="submitForm"
              color="red"
              icon="send"
              label="Enviar"
              v-show="showButton"
            />
            <q-spinner
              :size="80"
              :color="loading ? 'red' : 'transparent'"
              v-show="!showButton"
            />
          </div>
        </q-form>
      </q-card>
    </div>

    <q-dialog v-model="missingFieldsDialog"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        Existem campos obrigatórios que devem ser preenchidos.
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha de autenticação</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível fazer login. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { QSpinner } from 'quasar';

export default {
  name: 'login_',
  components: {
    QSpinner,
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      showButton: true,
      persistent: false,
      missingFieldsDialog: false,
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();

      if (this.username && this.password) {
        try {
          this.loading = true;
          this.showButton = false;

          const payload = {
            email: this.username,
            password: this.password,
          };

          const response = await api.post('/login', payload);
          const { token } = response.data;
          const { rule } = response.data;
          const { idPaciente } = response.data;

          localStorage.setItem('token', token);
          localStorage.setItem('auth', rule);
          localStorage.setItem('idPaciente', idPaciente);

          this.$router.push('/home');
        } catch (error) {
          this.persistent = true;
        } finally {
          this.loading = false;
          this.showButton = true;
        }
      } else {
        this.missingFieldsDialog = true;
      }
    },
  },
};
</script>

<style scoped>
.my-card0 {
  top: 10%;
  padding: 10%;
  width: 100%;
}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

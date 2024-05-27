<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-md login">
      <q-card class="my-card0">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <div class="imagem_login">
            <img alt="logo" src="../assets/logo.png" > 
          </div>
         
          <q-input rounded outlined v-model="username" label="E-mail" :readonly="loading" />

          <q-input rounded 
          outlined 
          v-model="password" 
          @keyup.enter="submitForm"
          label="Senha" 
          :readonly="loading" 
          :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="q-gutter-md q-mt-md q-mb-md q-flex q-items-end">
            <router-link to="/recuperar" class="text-primary">
              Esqueceu a senha?
            </router-link>
          </div>
          <div class="card0">
            <q-btn
              unelevated
              rounded
              class="glossy"
              @click="submitForm"
              color="red"
              v-show="showButton"
            >
              <span>Entrar</span>
              <q-icon name="login" class="q-ml-sm"/>
            </q-btn>
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
import { ref } from 'vue';

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
      isPwd: ref(true),
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

.login {
  min-width: 40%;
  
}

.my-card0 {
  top: 10%;
  padding: 20px;
  width: 100%;
}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.titulo_login {
  text-align: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.imagem_login {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .login {
    min-width: 100%;
  }
  .my-card0 {
  top: 5%;
  padding: 20px;
  width: 100%;
}
 
}
</style>

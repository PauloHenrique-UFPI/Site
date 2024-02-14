<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-md" style="min-width: 35%;">
      <q-card class="my-card0">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
        <div class="d-flex flex-center text-center q-mb-md">
        <q-avatar size="100px" class="flex-center">
            <img src="../assets/logo.png" alt="Logo">
          </q-avatar>
        </div>
          <h6>Por favor digite seu email para recuperar sua senha: </h6>
          <q-input rounded outlined v-model="username" label="E-mail" :readonly="loading" />
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
        Existem campos obrigatórios que devem ser preenchidos de forma correta: exemplo@email.com.
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha em enviar Email</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível Enviar o Email para redefinicão de senha.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="notifyOK" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-green-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Email para redifinição enviado</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Por favor, verifique sua caixa de e-mail para prosseguir.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" @click="redirecionarParaLogin" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { QSpinner } from 'quasar';
import validator from 'validator';

export default {
  name: 'login_',
  components: {
    QSpinner,
  },
  data() {
    return {
      username: '',
      loading: false,
      showButton: true,
      persistent: false,
      notifyOK: false,
      missingFieldsDialog: false,
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();

      if (validator.isEmail(this.username)) {
        try {
          this.loading = true;
          this.showButton = false;

          const payload = {
            email: this.username,
          };

          await api.post('/esqueci', payload);

          this.notifyOK = true;
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
    redirecionarParaLogin() {
      window.location.href = '/';
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

<template>
  <q-layout view="hHh Lpr fFf" :class="{'dark-theme': darkMode}">
    <head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </head>

    <q-header elevated class="bg-negative text-white" height-hint="98">

      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="logo" src="../assets/logo.png">
          </q-avatar>
          TB Koch
          <router-link to="/home" class="toolbar-title">
            <q-avatar>
              <img alt="logo" src="../assets/logo.png">
            </q-avatar>
            TB KOCH
          </router-link>
        </q-toolbar-title>

        <div class="q-pa-md">
      <q-btn-dropdown
        class="glossy"
        color="bg-negative"

      >
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <q-icon left name="settings" />

          </div>
        </template>

      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Configurações</div>
          <q-toggle v-model="darkMode" checked-icon="nights_stay"
        color="black" unchecked-icon="light_mode" >Trocar Tema</q-toggle>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-btn icon="image_search" label="Marcação"
          stack glossy color="blue" @click="abrirDialogo"/>
          <!-- aqui !!!!!!!!!!!!! -->

          <div class="text-subtitle1 q-mt-md q-mb-xs"></div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
            @click="fazerLogoff"
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab to="/home" label="Notícias" />
        <q-route-tab to="/userPage" label="Usuários" v-if="!isUser && !isAgente"/>
        <q-route-tab to="/pacientes" label="Pacientes" v-if="!isUser" />
        <q-route-tab to="/minhaFicha" label="Minha Ficha" v-if="isUser" />
        <q-route-tab to="/paginaSobre" label="Sobre nós" />
      </q-tabs>

    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-negative text-white" height-hint="98">

    </q-footer>

    <FooterPage />

  </q-layout>

  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <template v-if="!loading">
        <q-card-section class="items-center">
          <div>
        <q-item-label header align="center" class="custom-header-label">
          Imagem para Marcação
        </q-item-label>
      </div>
      <q-item-label align="center">
        <h6>Por favor, esteja ciente de que:</h6>
        <li>Apenas imagens de escarro devem ser enviadas</li>
        <li>Faça o download da imagem quando disponível</li>
        <li>É necessário esperar o processamento da imagem</li>
      </q-item-label>
      <q-file
        filled
        bottom-slots
        v-model="model"
        label="Imagem de Escarro"
        :accept="acceptedFileTypes"
        counter
        style="margin-top: 10px;"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="clearFile"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint>
          Tamanho da imagem
        </template>
      </q-file>
        </q-card-section>
        <q-card-actions align="center">
        <q-btn label="Fechar" color="red" v-close-popup />
        <q-btn label="Enviar" color="green" @click="envio" />
      </q-card-actions>
      </template>
      <template v-else>
        <q-card-section align="center" class="items-center">
          <q-spinner :size="50" color="red" />
        </q-card-section>
      </template>

    </q-card>
  </q-dialog>

  <q-dialog v-model="showImage" persistent>
    <q-card>
      <img v-if="showImage" :src="uploadedImageUrl" alt="Imagem Enviada" />
      <q-card-actions align="center">
        <q-btn label="Fechar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>

  </q-dialog>

</template>

<script>
import { ref, watch } from 'vue';
import { api } from 'boot/axios';
import FooterPage from '../components/FooterPage.vue';

export default {
  components: {
    FooterPage,
  },
  setup() {
    const rightDrawerOpen = ref(false);
    const darkMode = ref(false);
    const showDialog = ref(false);
    const model = ref(null);
    const loading = ref(false);
    const uploadedImageUrl = ref('');
    const showImage = ref(false);

    watch(darkMode, (newVal) => {
      document.documentElement.classList.toggle('dark-theme', newVal);
      // Aqui você pode adicionar qualquer lógica adicional para personalizar seu tema
    });

    function fazerLogoff() {
      // Lógica para o logoff
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      window.location.href = '/';
    }
    function abrirDialogo() {
      showDialog.value = true;
    }
    function clearFile() {
      model.value = null;
    }
    const envio = async () => {
      try {
        loading.value = true;
        const formData = new FormData();
        formData.append('file', model.value);
        console.log(model);
        const response = await api.post(
          'https://hunterph.com.br/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            responseType: 'arraybuffer',
          },
        );

        if (response.status === 200) {
          const blob = new Blob([response.data], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);

          uploadedImageUrl.value = imageUrl;
          showImage.value = true;
        }
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };
    return {
      rightDrawerOpen,
      darkMode,
      fazerLogoff,
      showDialog,
      abrirDialogo,
      model,
      acceptedFileTypes: 'image/*',
      clearFile,
      loading,
      uploadedImageUrl,
      showImage,
      envio,

    };
  },
  computed: {

    isUser() {
      const auth = localStorage.getItem('auth');
      return auth === 'user';
    },
    isAgente() {
      const auth = localStorage.getItem('auth');
      return auth === 'agente';
    },
  },
};
</script>

<style scoped>
.toolbar-title {
  color: #ffffff;
  font-family: Arial, sans-serif;
  text-decoration: none;
  transition: 0.2s opacity;
}
.toolbar-title:hover {
  opacity: 0.8;
}

/* Estilos específicos para o tema escuro */
.loading {

width: 100px;
height: 100px;
flex-wrap: wrap;
justify-content: center;
border: 5px solid #ccc;
border-top-color: #e90808;
border-radius: 50%;
animation: spin 1s linear infinite;
margin: 0 auto;

}
.custom-header-label {
  font-size: 24px;
  font-family: 'Courier New';
  font-weight: bold;
  padding: 10px;
  border: 10px solid #f95d10;
  background-color: #FFFF00;
  border-radius: 10px;
  color: #000000;
  margin-bottom: 20px;
}
.dark-theme {
  background-color: #000000;
  color: #807e7e;
}

.logoff-button {
  background-color: #ccc;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>

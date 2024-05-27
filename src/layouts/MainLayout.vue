<template>
  <q-layout view="hHh Lpr fFf" :class="{'dark-theme': darkMode}">
    <head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </head>

    <q-header elevated class="bg-negative text-white" height-hint="98">

      <q-toolbar>
        <q-toolbar-title>
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
        
        <q-btn outline rounded color="grey" label="Logout" icon="logout"
        v-close-popup
          @click="fazerLogoff"/>
        <!-- <div class="column">
          <div class="text-h6 q-mb-md">Configurações</div>
          <q-toggle v-model="darkMode" checked-icon="nights_stay"
        color="black" unchecked-icon="light_mode" >Trocar Tema</q-toggle>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
        </div> -->
      </div>
    </q-btn-dropdown>
  </div>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab to="/home" label="Notícias" />
        <q-route-tab to="/userPage" label="Usuários" v-if="!isUser && !isAgente && !isMed"/>
        <q-route-tab to="/pacientes" label="Pacientes" v-if="!isUser" />
        <q-route-tab to="/minhaFicha" label="Minha Ficha" v-if="isUser" />
        <q-route-tab to="/paginaSobre" label="Sobre nós" v-if="!isUser"/>
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

</template>

<script>
import { ref, watch } from 'vue';
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
      localStorage.removeItem('cookie');
      window.location.href = '/';
    }
    function abrirDialogo() {
      showDialog.value = true;
    }
    function clearFile() {
      model.value = null;
    }
   
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
    isMed() {
      const auth = localStorage.getItem('auth');
      return auth === 'med';
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
  background-color: #6b6565;
  color: #000000;
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

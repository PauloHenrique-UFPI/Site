<template>
  <q-layout view="hHh Lpr fFf" :class="{'dark-theme': darkMode}">

    <q-header elevated class="bg-negative text-white" height-hint="98">

      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="logo" src="../assets/logo.png">
          </q-avatar>
          TB Koch
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
          <q-avatar size="72px">
            <img src="../assets/profile2.jpeg">
          </q-avatar>

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
        <q-route-tab to="/userPage" label="Usuários" />
        <q-route-tab to="/pacientes" label="Pacientes" />
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
      <!-- <div> link e mais links depois</div> -->
    </q-footer>

  </q-layout>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const rightDrawerOpen = ref(false);
    const darkMode = ref(false);

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

    return {
      rightDrawerOpen,
      darkMode,
      fazerLogoff,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para o tema escuro */
.dark-theme {
  background-color: #373636;
  color: #c6c6c6;
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

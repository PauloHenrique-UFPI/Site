<template>
  <q-layout view="hHh Lpr fFf">

    <q-header elevated class="bg-negative text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="logo" src="../assets/logo.png">
          </q-avatar>
          TB Koch
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-negative text-white" height-hint="98">
    <!-- <div> link e mais links depois</div> -->
  </q-footer>
  </q-layout>

</template>

<script>
const linkList = [
  {
    title: 'Pacientes',
    caption: 'lista de Pacientes',
    icon: 'school',
    name: 'pacientes',
  },
  {
    title: 'Pacientes',
    caption: 'lista de Pacientes',
    icon: 'school',
    name: 'pacientes',
  },
];
import { ref } from 'vue';

export default {
  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },

  data() {
    return {
      linkList,
    };
  },
};

</script>

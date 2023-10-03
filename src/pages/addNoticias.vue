<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-lg" style="width: 70%;">
    <q-card class="card3">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >

      <div><h2>Noticia</h2></div>
        <q-input
          filled
          v-model="titulo"
          label="Título *"
          hint="Título para sua Noticia"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite um título']"
        />
        <q-input
          filled
          v-model="prefacio"
          label="Préfacio *"
          hint="Breve descrição da noticia"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor digite um Préfacio']"
        />

        <q-file filled bottom-slots v-model="img" label="Imagem" counter accept="image/*">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            Imagem para ser anexada a notica
          </template>
        </q-file>

        <q-editor
                    v-model="descricao"
                    min-height="5rem"
                    label="Nota"
                    filled
                    autogrow
                    :rules="[(val) => val.length != 0 || 'Nota inválida']"
                    :toolbar="[
                      [
                        {
                          label: $q.lang.editor.align,
                          icon: $q.iconSet.editor.align,
                          fixedLabel: true,
                          list: 'only-icons',
                          options: ['left', 'center', 'right', 'justify'],
                        },
                      ],
                      [
                        'bold',
                        'italic',
                        'strike',
                        'underline',
                      ],
                      ['token', 'custom_btn'],
                      ['print', 'fullscreen'],
                      [
                        {
                          label: $q.lang.editor.fontSize,
                          icon: $q.iconSet.editor.fontSize,
                          fixedLabel: true,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7',
                          ],
                        },
                      ],
                    ]"

                  />

        <div>
          <q-btn label="Enviar" type="submit"  @click="submitForm"
          icon="send" color="red"/>

          <q-btn label="Cancelar" to="/" color="primary" flat/>
        </div>
      </q-form>
  </q-card>
  </div>

  </q-page>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  data() {
    return {
      titulo: '',
      prefacio: '',
      img: null, // Alterado para null em vez de uma string vazia
      descricao: '',
      date: ref('2000/00/00'),
      loading: false,
    };
  },
  setup() {
    return {
      model: ref(null),
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();

      try {
        const token = localStorage.getItem('token');
        const formData = new FormData(); // Criar objeto FormData

        // Adicionar campos ao objeto FormData
        formData.append('titulo', this.titulo);
        formData.append('img', this.img);
        formData.append('desc_curta', this.prefacio);
        formData.append('desc_longa', this.descricao);

        await api.post('https://api-koch.onrender.com/create-new', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Definir o cabeçalho correto para enviar o arquivo
          },
        });
        // eslint-disable-next-line no-alert

        this.$router.push('/home');
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.request.response);
      } finally {
        this.loading = false; // Desativar a animação de carregamento
      }
    },
  },
});
</script>

<style lang="scss">

.card3{
  top: 10%;
  padding: 8%;
  width: 100%;
}
</style>

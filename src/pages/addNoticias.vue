<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-lg" style="width: 70%;">
      <div v-if="loading" class="loading-animation"></div>

      <div v-else >
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
  </div>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha ao criar notícia</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível criar a notícia. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="missingFieldsDialog"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        Todos os campos devem ser preenchidos.
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

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
      img: null,
      descricao: '',
      date: ref('2000/00/00'),
      loading: false,
      persistent: false,
      missingFieldsDialog: false,
    };
  },
  setup() {
    return {
      model: ref(null),
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

  mounted() {
    if (this.isUser || this.isAgente) {
      this.$router.push({ name: 'home' });
    }
  },

  methods: {
    async submitForm(event) {
      event.preventDefault();
      if (this.titulo && this.prefacio && this.descricao && this.img) {
        try {
          const token = localStorage.getItem('token');
          const formData = new FormData();
          this.loading = true;

          formData.append('titulo', this.titulo);
          formData.append('img', this.img);
          formData.append('desc_curta', this.prefacio);
          formData.append('desc_longa', this.descricao);

          await api.post('/create-new', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          this.$router.push('/home');
        } catch (error) {
          this.persistent = true;
          this.loading = false;
        } finally {
          this.loading = false;
        }
      } else {
        this.missingFieldsDialog = true;
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
.loading-animation {

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

</style>

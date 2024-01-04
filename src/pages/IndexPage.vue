<template>
  <q-page class="page_noticias flex justify-center">
      <div class="container">

        <div v-if="isLoading" class="loading-animation"></div>

        <div v-else >
          <q-input
            v-model="filtro"
            filled
            outlined
            class="search-bar"
            placeholder="Pesquisar notícias..."
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <div class="add" style="position: abs;" v-if="!isUser && !isAgente">
            <q-fab

            vertical-actions-align="right"
            color="red"
            glossy
            icon="keyboard_arrow_up"
            direction="up"
            >
              <q-fab-action  color="green" to="/addNoticias" icon="add" label="Add Noticia" />
              <q-fab-action color="amber" @click="atualizarAtivo = !atualizarAtivo">
                <template v-if="atualizarAtivo">
                  <q-icon name="cancel" />
                  Cancelar
                </template>
                <template v-else>
                  <q-icon name="edit" />
                  Atualizar
                </template>
              </q-fab-action>
              <!-- <q-fab-action
                color="yellow"
                @click="abrirUpNoticia"
                icon="add"
                label="Atualizar Noticia"
              /> -->
              <q-fab-action color="red" @click="deletarAtivo = !deletarAtivo">
                <template v-if="deletarAtivo">
                  <q-icon name="cancel" />
                  Cancelar
                </template>
                <template v-else>
                  <q-icon name="delete" />
                  Deletar
                </template>
              </q-fab-action>
            </q-fab>
          </div>
          <div class="noticias">
            <div class="q-ma-md q-pa-md"
              style="display: flex; flex-wrap: wrap; justify-content: center;">
              <div v-for="(post, index) in noticiasFiltradas"
                :key="index"
                class="q-ma-sm"
                style="flex-basis: 33.33%;"
                @click="selecionarNoticia(post)">
                <q-card
                class="card relative-position"
                @click="deletarAtivo ? exibirConfirmacaoDeletar(post.id, index)
                : atualizarAtivo ? abrirUpNoticia(post.id)
                : exibirNoticia(post)">
                  <div class="titulo"> {{ post.titulo }} </div>
                  <q-img
                    :src="post.img"
                    spinner-color="primary"
                    class="img"
                  />
                  <div class="descricao"> {{ post.desc_curta }}</div>
                  <!-- <q-btn
                    v-if="!isUser && !isAgente"
                    label="Selecionar"
                    @click.stop="selecionarNoticia(post)"
                  /> -->
                </q-card>
            </div>
          </div>
        </div>
        </div>
      </div>

      <q-dialog v-model="confirmacaoDeletar">
      <q-card>
        <q-card-section>

          <q-card-text>
            Tem certeza de que deseja excluir esta notícia?
          </q-card-text>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="grey" @click="cancelarExclusao" />
          <q-btn label="Confirmar" color="negative" @click="executarExclusao" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Falha na Exclusão</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Não foi possível excluir a notícia. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogAdicionarPedido" >
            <q-card>
              <q-card-section>
                <h3 class="titulo-noticia">Atualizar notícia</h3>
                    <q-input
                    outlined
                    v-model="titulo"
                    label="Novo título *"
                    :rules="[ val => val && val.length > 0 || 'Por favor digite um título']"
                    />
                    <q-input
                    outlined
                    v-model="prefacio"
                    label="Novo préfacio *"
                    :rules="[ val => val && val.length > 0 || 'Por favor digite um Préfacio']"
                    />
                    <q-file filled bottom-slots
                    v-model="img"
                    label="Imagem"
                    counter accept="image/*"
                    >
                      <template v-slot:prepend>
                        <q-icon name="cloud_upload" @click.stop.prevent />
                      </template>
                      <template v-slot:append>
                        <q-icon name="close"
                        @click.stop.prevent="model = null"
                        class="cursor-pointer"
                        />
                      </template>

                      <template v-slot:hint>
                        Imagem para ser anexada a notica
                      </template>
                    </q-file>
                    <q-input
                    outlined
                    v-model="descricao"
                    label="Nova descrição *"
                    :rules="[ val => val && val.length > 0 || 'Por favor digite um descrição']"
                    />
              </q-card-section>
              <q-card-actions align="center">
                <q-btn label="Cancelar" color="red" @click="fecharUpNoticia" />
                <q-btn label="Adicionar" color="green" @click="submitFormUpNoticia" />
              </q-card-actions>
            </q-card>
      </q-dialog>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      isLoading: true,
      listaNoticias: [],
      deletarAtivo: false,
      atualizarAtivo: false,
      confirmacaoDeletar: false,
      indexExclusao: null,
      filtro: '',
      persistent: false,
      dialogAdicionarPedido: false,
      titulo: '',
      prefacio: '',
      img: null,
      descricao: '',
      noticiaSelecionada: null,
      descLongaFormatada: '',
    };
  },
  mounted() {
    this.carregarNoticias();
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
    noticiasFiltradas() {
      return this.listaNoticias.filter((noticia) => {
        const termoPesquisa = this.filtro.toLowerCase();
        return (
          noticia.titulo.toLowerCase().includes(termoPesquisa)
        || noticia.desc_curta.toLowerCase().includes(termoPesquisa)
        );
      });
    },
  },
  methods: {
    async carregarNoticias() {
      try {
        const response = await api.get('https://api-koch.onrender.com/noticias');
        this.listaNoticias = response.data.groups;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },

    exibirConfirmacaoDeletar(id, index) {
      this.indexExclusao = index;
      this.id = id;
      if (this.deletarAtivo) {
        this.indexExclusao = index;
        this.confirmacaoDeletar = true;
      }
    },

    cancelarExclusao() {
      this.indexExclusao = null;
      this.confirmacaoDeletar = false;
    },

    async executarExclusao() {
      const token = localStorage.getItem('token');
      if (this.indexExclusao !== null) {
        try {
          await api.delete(`https://api-koch.onrender.com/delete-new/${this.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.listaNoticias.splice(this.indexExclusao, 1);
        } catch (error) {
          this.persistent = true;
        }

        this.cancelarExclusao();
      }
    },
    selecionarNoticia(post) {
      this.noticiaSelecionadaId = post.id;
      console.log(post.id);
    },

    exibirNoticia(post) {
      const { id } = post;
      this.$router.push({ name: 'NoticiaPage', params: { id } });
    },
    abrirUpNoticia(id) {
      if (id) {
        this.noticiaSelecionada = this.listaNoticias.find((noticia) => noticia.id === id);

        if (this.noticiaSelecionada) {
          this.noticiaSelecionada.descLongaFormatada = this.noticiaSelecionada.desc_longa.replace(/<[^>]*>/g, '');
          this.titulo = this.noticiaSelecionada.titulo;
          this.prefacio = this.noticiaSelecionada.desc_curta;
          this.img = this.noticiaSelecionada.img;
          this.descricao = this.noticiaSelecionada.descLongaFormatada;
          this.dialogAdicionarPedido = true;
        }
      } else {
        alert('ID da notícia não fornecido');
      }
    },
    fecharUpNoticia() {
      this.titulo = '';
      this.prefacio = '';
      this.img = null;
      this.descricao = '';
      this.noticiaSelecionada = null;
      this.dialogAdicionarPedido = false;
    },
    async submitFormUpNoticia(event) {
      event.preventDefault();
      const token = localStorage.getItem('token');
      const formData = new FormData();
      this.loading = true;

      if (this.titulo) {
        formData.append('titulo', this.titulo);
      }
      if (this.img) {
        formData.append('img', this.img);
      }
      if (this.prefacio) {
        formData.append('desc_curta', this.prefacio);
      }
      if (this.descricao) {
        formData.append('desc_longa', this.descricao);
      }

      if (this.noticiaSelecionadaId) {
        await api.put(
          `https://api-koch.onrender.com/alter-new/${this.noticiaSelecionadaId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      }
      this.dialogAdicionarPedido = false;
      this.atualizarAtivo = false;
      this.carregarNoticias();
    },
  },
});

</script>

<style lang="scss">
.page_noticias {

  &__list{
    width: 80%;
  }
}
.baixo{
  position: relative;
  top: 100px;
  width: 100%;
}
.add{
  position: fixed;

  left:85%;
  top: 85%;
  z-index: 2;

}
.search-bar {
  position: fixed;
  top: 14%;
  right: 1%;
  z-index: 2;
  width: 300px;
  padding: 5px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgb(54, 52, 52);
  font-size: 16px;
  border-radius: 10px;
  }
  @media (max-width: 768px) {
  .search-bar {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
}

.card{
  height: 400px;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #ccc;

}
.titulo-noticia{
    font-size: 24px;
    font-family: 'Courier New';
    font-weight: bold;
    border: 5px solid #e90808;
    border-radius: 10px;
    color: #000000;
    margin-bottom: 20px;
    padding: 12px;
  }
.img{
  object-fit: cover; width: 200px; height: 200px;
}
.titulo{
  padding: 5%;
}
.descricao{
  padding: 5%;
}
.titulo{
  font-size: large;
  font-weight: bold;

}
.container {
  display: flex;
  justify-content: center;
  align-items: center;

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

.card:active {
  background-color: #119fca; /* cor de fundo quando clicado */
  border: 1px solid #40e812; /* borda quando clicado */
}
.card:hover {
  background-color: #c9bebe; /* cor de fundo quando hover */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

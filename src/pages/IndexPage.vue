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
          <div class="add" style="position: abs;" v-if="!isUser">
            <q-fab

            vertical-actions-align="right"
            color="red"
            glossy
            icon="keyboard_arrow_up"
            direction="up"
            >
              <q-fab-action  color="green" to="/addNoticias" icon="add" label="Add Noticia" />
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
                style="flex-basis: 33.33%;">
                <q-card class="card" @click="deletarAtivo ?
                exibirConfirmacaoDeletar(post.id, index) : exibirNoticia(post)">
                  <div class="titulo"> {{ post.titulo }} </div>
                  <q-img
                    :src="post.img"
                    spinner-color="primary"
                    class="img"
                  />
                  <div class="descricao"> {{ post.desc_curta }}</div>
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
          <q-btn label="Cancelar" color="primary" @click="cancelarExclusao" />
          <q-btn label="Confirmar" color="negative" @click="executarExclusao" />
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
      confirmacaoDeletar: false,
      indexExclusao: null,
      filtro: '',
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
        console.log(error);
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
        console.log(token);
        try {
          await api.delete(`https://api-koch.onrender.com/delete-new/${this.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.listaNoticias.splice(this.indexExclusao, 1);
        } catch (error) {
          console.log(error);
        }

        this.cancelarExclusao();
      }
    },

    exibirNoticia(post) {
      const { id } = post;
      this.$router.push({ name: 'NoticiaPage', params: { id } });
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

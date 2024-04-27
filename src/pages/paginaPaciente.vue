<template>
  <q-page class="page_noticias flex justify-center">
    <div class="pagina_noticia-List__lits" style="  display: flex;
  justify-content: center;
  align-items: center;">
    <div v-if="isLoading" class="loading-animation" st></div>

    <div v-else>

      <q-input
          v-model="filtro"
          filled
          outlined
          class="search-bar2"
          placeholder="Pesquisar pacientes..."
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

      <div class="add"
      style="position: fixed; right: 2rem; bottom: 2rem; "
      v-if="!isUser">
        <q-fab
          v-model="fabRight"
          vertical-actions-align="right"
          color="red"
          glossy
          icon="keyboard_arrow_up"
          direction="up"
        >
          <q-fab-action color="green" to="/addPacientes" icon="add" label="Add Paciente" />
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
          <q-fab-action color="red" @click="deletarAtivo = !deletarAtivo" v-if="!isAgente
           && isMed && isUser">
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

        <div class="q-my-lg">
          <q-list class="q-gutter-y-md">
            <div class="q-ma-md q-pa-md" style="display:
            flex; flex-wrap: wrap; justify-content: center;">
              <div v-for="(post, index) in pacienteFiltrados" :key="index" class="q-ma-sm my-card">
                <q-card class="card2" @click="deletarAtivo ?
                exibirConfirmacaoDeletar(post.id, index)
                : atualizarAtivo ? abrirUpPaciente(post)
                : exibirNoticia(post)">
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-medium text-subtitle2 text-red-7 q-mt-sm q-mb-xs">
                        {{ post.nome }}
                      </div>
                      <div class="text-italic">{{ post.unidade_tratamento }}</div>
                      <div class="text-caption text-grey">
                        {{ post.profissao }}
                      </div>
                    </q-card-section>
                </q-card-section>
              </q-card>

              </div>
            </div>
          </q-list>
        </div>
      </div>
  </div>
  </q-page>

  <q-dialog v-model="confirmacaoDeletar">
      <q-card>
        <q-card-section>

          <q-card-text class="text-weight-medium text-subtitle1">
            Tem certeza de que deseja excluir este paciente?
          </q-card-text>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="grey" @click="cancelarExclusao" />
          <q-btn label="Confirmar" color="negative" @click="executarExclusao" />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>

import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({

  data() {
    return {
      lista: [],
      isLoading: true,
      deletarAtivo: false,
      confirmacaoDeletar: false,
      indexExclusao: null,
      filtro: '',
      atualizarAtivo: false,
    };
  },

  mounted() {
    this.carregaPaciente();
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
    pacienteFiltrados() {
      return this.lista.filter((paciente) => {
        const termoPesquisa = this.filtro.toLowerCase();
        return (
          paciente.nome.toLowerCase().includes(termoPesquisa)
        || paciente.unidade_tratamento.toLowerCase().includes(termoPesquisa)
        );
      });
    },
  },
  methods: {
    async carregaPaciente() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/pacientes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.lista = response.data.groups;
        this.isLoading = false;

        if (this.isUser) {
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
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
        try {
          await api.delete(`/delete-paciente/${this.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.lista.splice(this.indexExclusao, 1);
        } catch (error) {
          // console.log(error);
        }

        this.cancelarExclusao();
      }
    },
    exibirNoticia(post) {
      const { id } = post;
      this.$router.push({ name: 'PacientePage', params: { id } });
    },
    abrirUpPaciente(post) {
      const { id } = post;
      this.$router.push({ name: 'addPaciente', params: { id } });
    },

  },
});

</script>

<style lang="scss">

.add{

left: 85%;
top: 75%;
z-index: 2;
}
.page_noticias {
  &__list {
    width: 80%;
  }
}

@media (max-width: 700px) {
  .card2 {
    margin-top: 50px;
  }
}

.card2 {
  flex-basis: 20%;
  width: 250px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.card2:active {
  background-color: #119fca; /* cor de fundo quando clicado */
  border: 1px solid #27e812; /* borda quando clicado */
}
.card2:hover {
  background-color: #c9bebe; /* cor de fundo quando hover */
}

.loading-animation {

width: 100px;
height: 100px;
flex-wrap: wrap;
justify-content: center;
align-items: center;
border: 5px solid #ccc;
border-top-color: #e90808;
border-radius: 50%;
animation: spin 1s linear infinite;
margin: 0 auto;

}
.search-bar2 {
  position: fixed;
  top: 20%;
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
  .search-bar2 {
    position: fixed;
    margin-top: 40px;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
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

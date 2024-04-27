<template>
    <q-page>
      <div v-if="isLoading" class="loading-animation"></div>
      <div v-else>
        <div class="q-pa-md">
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn
              type="submit"
              :loading="submitting"
              @click="showAddDialog = true"
              label="Adicionar Usuário"
              class="q-mt-md"
              color="green"
            />

          </q-card-actions>

          <q-table
            flat bordered
            title="Tabela de Usuários"
            :rows="rows"
            row-key="id"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                <q-td key="tipo" :props="props">{{ props.row.tipo }}</q-td>
                <q-td>
                  <q-btn class="q-ml-md" color="red"
                   @click="confirmDeleteRow(props.row.id)">Deletar</q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <q-dialog v-model="showDeleteDialog">
            <q-card>
              <template v-if="!loadingAdd">
                <q-card-section>
                Tem certeza de que deseja excluir este <strong>usuário</strong> ?
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn color="negative" label="Cancelar" @click="closeDeleteDialog" />
                  <q-btn color="positive" label="Confirmar" @click="deleteRow" />
                </q-card-actions>
              </template>

              <template v-else>
              <q-card-section align="center">
                <q-spinner :size="50" color="red" />
              </q-card-section>
            </template>

            </q-card>
          </q-dialog>
          <q-dialog v-model="showAddDialog" maximized @close="clearFields">
          <q-card class="my-card" style="max-width: 500px; max-height: 510px; padding: 10px;">
            <template v-if="!loadingAdd">
              <h3 class="titulo">Novo Usuário</h3>
              <q-card-section>

                <q-input
                    filled
                    v-model="newUser.nome"
                    label="Nome *"
                    hint="Nome do Usuário"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                  />
                  <q-input
                    filled
                    v-model="newUser.email"
                    label="E-mail *"
                    hint="Email para login"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                  />
                  <q-input
                    filled
                    v-model="newUser.password"
                    label="Senha *"
                    hint="Senha para login"
                    lazy-rules
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                    </q-input>
                <q-input
                    filled
                    v-model="newUser.number"
                    label="Nº Telefone *"
                    hint="Qual o Número"
                    mask="(##) # ####-####"
                    class="campo"
                    :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                    type="tel"
                  />
                <q-select
                    filled
                    v-model="newUser.rule"
                    :options="options"
                    label="Tipo de Usuário *"
                    hint="Selecione na Lista"
                    :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                    />
                  <q-select
                    v-if="newUser.rule === 'user'"
                    filled
                    v-model="newUser.idPaciente"
                    use-input
                    input-debounce="0"
                    label="Simple filter"
                    :options="filteredOptions"
                    @filter="filterFn"
                    style="width: 250px"
                    behavior="dialog"
                    clearable
                    option-label="nome"
                   :option-value="getId"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
              </q-card-section>
              <q-card-actions align="center">
                <q-btn color="grey" label="Cancelar" @click="clearFieldsAndClose" />
                <q-btn color="positive" label="Salvar" @click="submitForm" />
              </q-card-actions>
            </template>

            <template v-else>
              <q-card-section align="center" style="top: 35%;">
                <q-spinner-ball :size="100" color="red" />
              </q-card-section>
            </template>

          </q-card>
        </q-dialog>

        <q-dialog v-model="showErro"
          persistent transition-show="scale" transition-hide="scale">
          <q-card class="bg-red-7 text-white" style="width: 300px">
            <q-card-section>
              <div class="text-h6 text-white">Atenção</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-white">
              Os campos não podem ser vazios !
            </q-card-section>

            <q-card-actions align="center" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        </div>
      </div>
    </q-page>

</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const submitting = ref(false);
    const rows = ref([]);
    const isLoading = ref(true);
    const loadingAdd = ref(false);

    const showAddDialog = ref(false);
    const showDialogErro = ref(false);
    const showDialogOK = ref(false);
    const showErro = ref(false);

    const mensagem = '';

    const newUser = ref({
      nome: '',
      email: '',
      password: '',
      number: '',
      rule: '',
      idPaciente: null,
    });
    const showDeleteDialog = ref(false);
    const selectedRow = ref(null);

    const clearFields = () => {
      newUser.value.nome = '';
      newUser.value.email = '';
      newUser.value.password = '';
      newUser.value.number = '';
      newUser.value.rule = '';
      newUser.value.idPaciente = '';
    };

    const clearFieldsAndClose = () => {
      clearFields();
      showAddDialog.value = false;
    };

    const confirmDeleteRow = (row) => {
      selectedRow.value = row;
      showDeleteDialog.value = true;
    };

    const closeDeleteDialog = () => {
      showDeleteDialog.value = false;
    };

    const deleteRow = async () => {
      loadingAdd.value = true;
      const index = rows.value.findIndex((row) => row.id === selectedRow.value);
      const token = localStorage.getItem('token');
      if (index !== -1) {
        rows.value.splice(index, 1);
        try {
          const response = await api.delete(`/delete-user/${selectedRow.value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { groups } = response.data;

          rows.value = groups.map((group) => ({
            id: group.id,
            nome: group.name,
            email: group.email,
            tipo: group.rule,
          }));
        } catch (error) {
          loadingAdd.value = false;
        // this.isLoading = false;
        } finally {
          loadingAdd.value = false;
        }
      }
      showDeleteDialog.value = false;
    };

    onMounted(async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/contatos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        isLoading.value = false;
        // console.log(response);
        const { groups } = response.data;

        rows.value = groups.map((group) => ({
          id: group.id,
          nome: group.name,
          email: group.email,
          tipo: group.rule,
        }));
      } catch (error) {
        isLoading.value = false;
        // this.isLoading = false;
      }
    });

    const submitForm = async () => {
      try {
        loadingAdd.value = true;
        if (newUser.value.nome !== '' && !newUser.value.email !== ''
        && !newUser.value.number !== '' && !newUser.value.password !== ''
        && !newUser.value.rule !== '') {
          const token = localStorage.getItem('token');
          const formData = new FormData();

          formData.append('name', newUser.value.nome);
          formData.append('email', newUser.value.email);
          formData.append('number', newUser.value.number);
          formData.append('password', newUser.value.password);
          formData.append('rule', newUser.value.rule);

          if (newUser.value.rule === 'user') {
            formData.append('id_paciente', newUser.value.idPaciente.id);
          }
          await api.post('/create-user', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          window.location.reload();
        } else {
          showErro.value = true;
          mensagem.value = 'Todos os Campos são Obrigatorios !';
        }
      } catch (error) {
        console.error(error);
        loadingAdd.value = false;
      } finally {
        loadingAdd.value = false;
      }
    };

    return {
      submitting,
      clearFieldsAndClose,
      rows,
      showAddDialog,
      newUser,
      showDeleteDialog,
      selectedRow,
      isLoading,
      confirmDeleteRow,
      closeDeleteDialog,
      deleteRow,
      clearFields,
      options: [
        'adm', 'med', 'agente', 'user',
      ],
      submitForm,
      showDialogErro,
      showDialogOK,
      loadingAdd,
      showErro,
      mensagem,
      isPwd: ref(true),
      
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

  data() {
    return {
      options2: [],
      filteredOptions: [],
    };
  },

  mounted() {
    this.carregaPaciente();
    if (this.isUser || this.isAgente || this.isMed) {
      this.$router.push({ name: 'home' });
    }
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
        this.options2 = response.data.groups;

        if (this.isUser) {
          this.$router.push({ nome: 'home' });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    filterFn(val, update) {
      console.log('Options before filter:', this.options2);
      console.log('Filtered options before update:', this.filteredOptions);
      if (val === '') {
          update(() => {
              this.filteredOptions = this.options2;
          });
          return;
      }
      update(() => {
          const needle = val.toLowerCase();
          // eslint-disable-next-line
          this.filteredOptions = this.options2.filter(v => v.nome.toLowerCase().includes(needle));
      });
    },

    getId(option) {
      return option.id;
    },
  },
};
</script>

<style scoped>
  .loading-animation {
    position: fixed;
    top: 50%;
    left: 50%;
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

  .titulo{
    font-size: 24px;
    font-family: 'Courier New';
    text-align: center;
    font-weight: bold;
    border: 5px solid #e90808;
    border-radius: 10px;
    color: #000000;
    margin-bottom: 20px;
    padding: 12px;
  }
</style>

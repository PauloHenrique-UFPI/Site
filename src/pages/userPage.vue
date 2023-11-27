<template>
    <div class="q-pa-md">
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          type="submit"
          :loading="submitting"
          @click="showAddDialog = true"
          label="Adicionar Usuário"
          class="q-mt-md"
          color="teal"

        />
      </q-card-actions>
      <q-table
        flat bordered
        title="Tabela de Usuários"
        :rows="rows"
        :columns="columns"
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

      <!-- Modal de Edição -->
      <!-- <q-dialog v-model="showEditDialog">
        <q-card class="my-card">
          <q-card-section>
            <q-input
              filled
              v-model="selectedRow.nome"
              label="Nome *"
              lazy-rules
              :rules="[ val => val && val.length > 0]"
            />
            <q-input
              filled
              v-model="selectedRow.email"
              label="Email *"
              lazy-rules
              :rules="[ val => val && val.length > 0]"
            />
            <q-select
              square filled
              v-model="selectedRow.tipo"
              :options="options"
              label="Tipo *" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" label="Cancelar" @click="showEditDialog = false" />
            <q-btn color="positive" label="Salvar" @click="saveRow" />
          </q-card-actions>
        </q-card>
      </q-dialog> -->

      <q-dialog v-model="showDeleteDialog">
        <q-card>
          <q-card-section>
            Tem certeza de que deseja excluir este <strong>usuário</strong> ?
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" label="Cancelar" @click="closeDeleteDialog" />
            <q-btn color="positive" label="Confirmar" @click="deleteRow" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showAddDialog" maximized @close="clearFields">
      <q-card class="my-card" style="max-width: 400px; max-height: 400px;">
        <h4 align="center" style="padding: 2%;">Novo Usuário</h4>
        <q-card-section>
          <!-- Campos de entrada para o novo usuário -->
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
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
              type="password"
            />
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
            :options="options2"
            label="Usuário Vinculado *"
            hint="Selecione na Lista"
            option-label="nome"
            :option-value="getId"
            />

        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="negative" label="Cancelar" @click="clearFieldsAndClose" />

          <q-btn color="positive" label="Salvar" @click="submitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const submitting = ref(false);
    const rows = ref([]);

    const showAddDialog = ref(false);
    const newUser = ref({
      nome: '',
      email: '',
      password: '',
      number: '',
      rule: '',
      idPaciente: null,
    });
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const selectedRow = ref(null);

    const clearFields = () => {
      // Limpar os campos ao fechar a caixa de diálogo
      newUser.value.nome = '';
      newUser.value.email = '';
      newUser.value.password = '';
      newUser.value.number = '';
      newUser.value.rule = '';
      newUser.value.idPaciente = '';
    };

    const clearFieldsAndClose = () => {
      // Limpar os campos e fechar a caixa de diálogo
      clearFields();
      showAddDialog.value = false;
    };
    const editRow = (row) => {
      selectedRow.value = { ...row };
      showEditDialog.value = true;
    };

    const saveRow = () => {
      const index = rows.value.findIndex((row) => row.id === selectedRow.value.id);
      if (index !== -1) {
        rows.value[index] = { ...selectedRow.value };
      }
      showEditDialog.value = false;
    };

    const confirmDeleteRow = (row) => {
      selectedRow.value = row;
      showDeleteDialog.value = true;
    };

    const closeDeleteDialog = () => {
      showDeleteDialog.value = false;
    };

    const deleteRow = () => {
      const index = rows.value.findIndex((row) => row.id === selectedRow.value.id);
      if (index !== -1) {
        rows.value.splice(index, 1);
      }
      showDeleteDialog.value = false;
    };

    onMounted(async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('https://api-koch.onrender.com/contatos', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        // console.log(response);
        const { groups } = response.data;

        rows.value = groups.map((group) => ({
          id: group.id,
          nome: group.name,
          email: group.email,
          tipo: group.rule,
        }));
      } catch (error) {
        // this.isLoading = false;
      }
    });

    const submitForm = async () => {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('name', newUser.value.nome);
        formData.append('email', newUser.value.email);
        formData.append('number', newUser.value.number);
        formData.append('password', newUser.value.password);
        formData.append('rule', newUser.value.rule);

        if (newUser.value.idPaciente !== '') {
          formData.append('id_paciente', newUser.value.idPaciente.id);
          console.log(newUser.value.idPaciente.id);
        }

        await api.post('https://api-koch.onrender.com/create-user', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      submitting,
      clearFieldsAndClose,
      rows,
      showAddDialog,
      newUser,
      showEditDialog,
      showDeleteDialog,
      selectedRow,
      editRow,
      saveRow,
      confirmDeleteRow,
      closeDeleteDialog,
      deleteRow,
      clearFields,
      options: [
        'adm', 'agente', 'user',
      ],
      submitForm,
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
    filteredOptions() {
      const term = this.searchTerm.toLowerCase();
      return this.options2.filter((option) => option.nome.toLowerCase().includes(term));
    },
  },

  data() {
    return {
      searchTerm: '',
      options2: [], // Suas opções fixas
      selectedOption: null,
    };
  },

  mounted() {
    this.carregaPaciente();
    if (this.isUser || this.isAgente) {
      this.$router.push({ nome: 'home' });
    }
  },
  methods: {
    async carregaPaciente() {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('https://api-koch.onrender.com/pacientes', {
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
    selectOption(option) {
      // Atualiza a opção selecionada
      this.selectedOption = option;
    },
    getId(option) {
      return option.id;
    },
  },
};
</script>

<template>
  <div class="q-pa-md">
    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn
        type="submit"
        :loading="submitting"
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
          <q-td key="Id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="Nome" :props="props">{{ props.row.name }}</q-td>
          <q-td key="Email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="Tipo" :props="props">{{ props.row.tipo }}</q-td>
          <q-td>
            <q-btn color="orange" @click="editRow(props.row)">Editar</q-btn>
            <q-btn class="q-ml-md" color="red" @click="confirmDeleteRow(props.row)">Deletar</q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Modal de Edição -->
    <q-dialog v-model="showEditDialog">
      <q-card class="my-card">
        <q-card-section>
          <q-input
            filled
            v-model="selectedRow.name"
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
          <!-- Outros campos de edição -->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="negative" label="Cancelar" @click="showEditDialog = false" />
          <q-btn color="positive" label="Salvar" @click="saveRow" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

    <q-dialog v-model="showAddDialog">
      <q-card class="my-card">
        <q-card-section>
          <q-input
            filled
            v-model="newUser.name"
            label="Nome *"
            lazy-rules
            :rules="[ val => val && val.length > 0]"
          />
          <q-input
            filled
            v-model="newUser.email"
            label="Email *"
            lazy-rules
            :rules="[ val => val && val.length > 0]"
          />
          <q-input
            filled
            v-model="newUser.password"
            label="Senha *"
            type="password"
            lazy-rules
            :rules="[ val => val && val.length > 0]"
          />
          <q-input
            filled
            v-model="newUser.number"
            label="Número *"
            lazy-rules
            :rules="[ val => val && val.length > 0]"
          />
          <q-input
            filled
            v-model="newUser.rule"
            label="Regra *"
            lazy-rules
            :rules="[ val => val && val.length > 0]"
          />
          <q-input
            filled
            v-model="newUser.id_paciente"
            label="ID do Paciente *"
            lazy-rules
            :rules="[ val => val && val.length > 0]"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="negative" label="Cancelar" @click="showAddDialog = false" />
          <q-btn color="positive" label="Adicionar" @click="addUser" />
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
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const selectedRow = ref(null);

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
          name: group.name,
          email: group.email,
          tipo: group.rule,
        }));
      } catch (error) {
        // console.error('Erro ao carregar dados da API:', error);
      }
    });

    return {
      submitting,
      rows,
      showEditDialog,
      showDeleteDialog,
      selectedRow,
      editRow,
      saveRow,
      confirmDeleteRow,
      closeDeleteDialog,
      deleteRow,
    };
  },
  mounted() {
    // console.log(this.rows.data);
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

          await api.post('https://api-koch.onrender.com/create-new', formData, {
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
    // editRow(row) {
    //   this.selectedRow = { ...row }; // Clona os dados da linha selecionada
    //   this.showEditDialog = true;
    // },
    // saveRow() {
    //   // Encontre a linha correspondente na matriz e atualize-a
    //   const index = this.rows.findIndex((row) => row.id === this.selectedRow.id);
    //   if (index !== -1) {
    //     this.rows[index] = { ...this.selectedRow };
    //   }
    //   this.showEditDialog = false;
    // },
    // confirmDeleteRow(row) {
    //   this.selectedRow = row;
    //   this.showDeleteDialog = true;
    // },
    // closeDeleteDialog() {
    //   this.showDeleteDialog = false;
    // },
    // deleteRow() {
    //   const index = this.rows.findIndex((row) => row.id === this.selectedRow.id);
    //   if (index !== -1) {
    //     this.rows.splice(index, 1);
    //   }
    //   this.showDeleteDialog = false;
    // },
  },
};
</script>

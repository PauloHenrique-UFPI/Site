<template>
  <div class="q-pa-md">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: 'Id',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'Nome',
          required: true,
          label: 'Nome',
          align: 'center',
          field: 'name',
          sortable: true,
        },
        {
          name: 'Email',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'email',
          sortable: true,
        },
        {
          name: 'Tipo',
          required: true,
          label: 'Tipo',
          align: 'left',
          field: 'tipo',
          sortable: true,
        },
        {
          name: 'Ações',
          required: true,
          label: 'Ações',
          align: 'left',
        },
      ],
      rows: [
        {
          id: 1,
          name: 'João',
          email: 'Joao@gmail.com',
          tipo: 'ADM',
        },
        {
          id: 2,
          name: 'Paulo',
          email: 'Paulo@gmail.com',
          tipo: 'AGENTE',
        },
        {
          id: 3,
          name: 'Lucas',
          email: 'Lucas@gmail.com',
          tipo: 'USER',
        },
      ],
      showEditDialog: false,
      showDeleteDialog: false,
      selectedRow: null,
    };
  },
  methods: {
    editRow(row) {
      this.selectedRow = { ...row }; // Clona os dados da linha selecionada
      this.showEditDialog = true;
    },
    saveRow() {
      // Encontre a linha correspondente na matriz e atualize-a
      const index = this.rows.findIndex((row) => row.id === this.selectedRow.id);
      if (index !== -1) {
        this.rows[index] = { ...this.selectedRow };
      }
      this.showEditDialog = false;
    },
    confirmDeleteRow(row) {
      this.selectedRow = row;
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
    deleteRow() {
      const index = this.rows.findIndex((row) => row.id === this.selectedRow.id);
      if (index !== -1) {
        this.rows.splice(index, 1);
      }
      this.showDeleteDialog = false;
    },
  },
};
</script>

<template>
  <div>
    <q-table
      :rows="users"
      row-key="id"
      :columns="columns"
      :rows-per-page-options="[]"
      :selected-rows-label="selectedRowsLabel"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <q-btn @click="addUser" color="primary" icon="add">Adicionar</q-btn>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :selected="props.row.id === selectedUserId">
          <q-td v-for="col in props.cols" :key="col.name">
            {{ row[col.name] }}
          </q-td>
          <q-td>
            <q-btn @click="editUser(props.row.id)" color="primary"
            icon="edit" :visible="props.row.id === selectedUserId"></q-btn>
            <q-btn @click="removeUser(props.row.id)" color="negative"
            icon="delete" :visible="props.row.id === selectedUserId"></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    users: Array, // Os dados dos usuários
    addUser: Function, // Função para adicionar usuário
    editUser: Function, // Função para editar usuário
    removeUser: Function, // Função para remover usuário
  },
  data() {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'email',
          sortable: true,
        },
      ],
      selectedUserId: null, // ID do usuário selecionado
    };
  },
  computed: {
    selectedRowsLabel() {
      return this.selectedUserId ? '1 selecionado' : '';
    },
  },
  methods: {

    onRowClick(row) {
      // Definir a linha selecionada quando uma linha é clicada
      this.selectedUserId = row.id === this.selectedUserId ? null : row.id;
    },
  },
};
</script>

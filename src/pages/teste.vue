<template>
  <div>

    <div class="table-container">
      <q-table
        :rows="tableData"
        :columns="tableColumns"
        style="min-width: 100%;"
        :style-rows="customRowStyles"
        :rows-per-page-options="[]"
      >

        <template v-slot:top-right>
          <q-btn @click="showAddUserDialog" color="primary" label="Adicionar Usuário"></q-btn>
        </template>

        <!-- Essa parte do codigo esta atrapalhando a exebição da tabela-->
      <!-- <template v-slot:body-cell="props">
        <q-td :props="props" @click="showUserDetails(props.row)">
          {{ props.row[props.field] }}
        </q-td>
      </template> -->

      </q-table>
    </div>

    <q-dialog v-model="addUserDialog">
      <q-card>
        <q-card-section>

          <q-form @submit="addUser">
            <q-input v-model="newUser.name" label="Nome"></q-input>
            <q-input v-model="newUser.email" label="Email"></q-input>
            <q-input v-model="newUser.tipo" label="Tipo"></q-input>

          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn type="submit" color="primary"  @click="addUser" label="Adicionar"></q-btn>
          <q-btn @click="addUserDialog = false" label="Cancelar"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog v-model="userDetailsDialog">
      <q-card>
        <q-card-section>
          <h4>Detalhes do Usuário</h4>
          <p><strong>Nome:</strong> {{ selectedUser.name }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Tipo:</strong> {{ selectedUser.tipo }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn type="submit" color="orange" label="Editar"></q-btn>
          <q-btn type="submit" color="red" label="Excluir"></q-btn>
          <q-btn @click="userDetailsDialog = false"  color="blue" label="Fechar"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'userPage',
  data() {
    return {
      tableData: [
        {
          id: 1, name: 'João', email: 'Joao@gmail.com', tipo: 'ADM',
        },
        {
          id: 2, name: 'Paulo', email: 'Paulo@gmail.com', tipo: 'Agente',
        },
        {
          id: 3, name: 'Aline', email: 'Aline@gmail.com', tipo: 'User',
        },

      ],
      tableColumns: [
        {
          name: 'Id', required: true, label: 'Id', align: 'left', field: 'id', sortable: true,
        },
        {
          name: 'Nome', required: true, label: 'Nome', align: 'center', field: 'name', sortable: true,
        },
        {
          name: 'Email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true,
        },
        {
          name: 'Tipo', required: true, label: 'Tipo', align: 'left', field: 'tipo', sortable: true,
        },
      ],
      customRowStyles: {
        'custom-row': true,
      },
      addUserDialog: false,
      userDetailsDialog: false,
      selectedUser: null,
      newUser: {
        id: null,
        name: '',
        email: '',
        tipo: '',
      },
      tableActions: [
        {
          slot: 'top-right',
          label: 'Adicionar Usuário',
          icon: 'add',
          color: 'primary',
          click: this.showAddUserDialog,
        },
      ],
    };
  },
  methods: {
    showAddUserDialog() {
      this.newUser = {
        id: null,
        name: '',
        email: '',
        tipo: '',
      };
      this.addUserDialog = true;
    },
    addUser() {
      this.tableData.push({
        id: this.tableData.length + 1,
        name: this.newUser.name,
        email: this.newUser.email,
        tipo: this.newUser.tipo,
      });

      this.addUserDialog = false;
    },

    removeUser(user) {
      const index = this.tableData.indexOf(user);
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }
    },

    showUserDetails(user) {
      this.selectedUser = user;
      this.userDetailsDialog = true;
    },
  },
};
</script>

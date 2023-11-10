<template>
  <div class="page-paciente">
    <div v-if="isLoading" class="loading-animation"></div>

    <div v-else>
      <div class="news-page" v-if="pacienteChave">
        <h1 class="title">Ficha Médica</h1>

        <div class="patient-info">
          <div v-if="pacienteChave.nome" class="info-item info-item-rectangle">
            <strong>Nome do Paciente:</strong> {{ pacienteChave.nome }}
          </div>
          <div v-if="pacienteChave.data_nasc" class="info-item info-item-rectangle">
            <strong>Data de Nascimento:</strong> {{ formatDate(pacienteChave.data_nasc) }}
          </div>
          <div v-if="pacienteChave.nome_mae" class="info-item info-item-rectangle">
            <strong>Nome da Mãe:</strong> {{ pacienteChave.nome_mae }}
          </div>
          <div v-if="pacienteChave.telefone" class="info-item info-item-rectangle">
            <strong>Telefone:</strong> {{ pacienteChave.telefone }}
          </div>
          <div v-if="pacienteChave.endereco" class="info-item info-item-rectangle">
            <strong>Endereço:</strong> {{ pacienteChave.endereco }}
          </div>
          <div v-if="pacienteChave.img_trat" class="info-item">
            <strong>Exemplo de Exame:</strong>
            <img :src="pacienteChave.img_trat" alt="Exemplo de Exame" class="exam-image">
          </div>
          <div class="container">
          <q-btn
            class="botao btn-fixed-width"
            color="red"
            label="Calendário"
            icon="calendar_month"
            @click="redirecionar(pacienteChave)"
          />
        </div>
        </div>

      </div>
    </div>

    <q-dialog v-model="carregou" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-red-7 text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-white">Falha ao carregar ficha de paciente</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-white">
            Não foi possível carregar sua ficha. Tente novamente mais tarde.
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>

</template>
1
<script>
import { api } from 'boot/axios';

export default {
  name: 'PacientePage',
  data() {
    return {
      isLoading: true,
      pacienteChave: null,
      prontuarioChave: false,
      showProntuarioDialog: false,
      prontuarioInfo: null,
      carregou: false,

    };
  },
  mounted() {
    const idPaciente = localStorage.getItem('idPaciente');
    this.carregaPaciente(idPaciente);
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    async carregaPaciente(id) {
      const token = localStorage.getItem('token');
      const url = `https://api-koch.onrender.com/paciente/${id}`;
      if (id == null) {
        this.carregou = true;
      }

      try {
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.pacienteChave = response.data;
      } catch (error) {
        this.isLoading = false;
        this.carregou = true;
      } finally {
        this.isLoading = false;
      }
    },

    redirecionar(paciente) {
      const { id } = paciente;
      this.$router.push({ name: 'calendarioP', params: { id } });
    },

  },
};
</script>

<style scoped>
.page-paciente {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
.title {
  font-size: 54px;
  margin-bottom: 20px;
}

.patient-info {
  border: 1px solid #ccc;
  padding: 10px;
}

.info-item {
  margin-bottom: 10px;
}

.info-item-rectangle {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.exam-image {
  max-width: 100%;
  margin-bottom: 10px;
}

.medical-history {
  list-style: none;
  padding: 0;
  margin: 0;
}

.medical-history li {
  margin-bottom: 10px;
}

.registro-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.registro-date {
  margin-bottom: 5px;
}

.registro-description {
  margin-bottom: 10px;
}

.registro-treatment {
  margin-bottom: 10px;
}

.prescricoes {
  margin-top: 10px;
}
</style>

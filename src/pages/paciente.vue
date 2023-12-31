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

        <h3 style="padding: 15px;">Prontuário</h3>
        <div class="container" v-if="prontuarioChave">
          <q-btn
            class="botao btn-fixed-width"
            color="red"
            label="Visualizar Prontuário"
            icon="assignment"
            @click="showProntuarioDialog = true"
          />
        </div>

        <div class="container" v-if="!prontuarioChave">
          <q-btn
            class="botao btn-fixed-width"
            color="red"
            label="Adicionar Prontuário"
            icon="add"
            @click="adicionar(pacienteChave)"
          />
        </div>
      </div>
    </div>

    <q-dialog v-model="showProntuarioDialog">

      <q-card>
        <q-card-section>
          <ul class="medical-history">
            <div class="q-dialog-title"><strong>Informações do Prontuário</strong></div>
              <div class="registro-item">
                <div class="registro-date"><strong>Tipo:</strong>
                  {{ prontuarioInfo.tipo }}</div>
                <div class="registro-description"><strong>População Especifica:</strong>
                  {{ prontuarioInfo.popu_especifica }}</div>
                <div class="registro-description"><strong>Beneficiario:</strong>
                  {{ prontuarioInfo.beneficiario }}</div>
                <div class="registro-description"><strong>Tipo da doença:</strong>
                  {{ prontuarioInfo.tipo_doenca }}</div>
                <div class="registro-description"><strong>Extrapulmonar:</strong>
                  {{ prontuarioInfo.se_extrapulmonar }}</div>
                <div class="registro-description"><strong>Agravos:</strong>
                  {{ prontuarioInfo.agravos }}</div>
                <div class="registro-description"><strong>Diagnostico:</strong>
                  {{ prontuarioInfo.diagnostico }}</div>
                <div class="registro-description"><strong>Radiografia:</strong>
                  {{ prontuarioInfo.radiografia }}</div>
                <div class="registro-description"><strong>HIV:</strong>
                  {{ prontuarioInfo.hiv }}</div>
              </div>

          </ul>
        </q-card-section>
          <q-card-actions align="center">
            <q-btn
            label="Fechar"
            color="red"
            @click="showProntuarioDialog = false"
          />
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

    };
  },
  mounted() {
    this.carregaPaciente(this.$route.params.id)
      .then(() => {
        this.verificarProntuario(this.$route.params.id);
      });
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    async carregaPaciente(id) {
      const token = localStorage.getItem('token');
      const url = `https://api-koch.onrender.com/paciente/${id}`;
      try {
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pacienteChave = response.data;
      } catch (error) {
        // console.log(error);
      }
    },
    async verificarProntuario(id) {
      const token = localStorage.getItem('token');
      const url = `https://api-koch.onrender.com/prontuarioId/${id}`;
      try {
        const resposta = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.prontuarioChave = true;
        this.prontuarioInfo = resposta.data;

        this.isLoading = false;
      } catch (error) {
        this.prontuarioChave = false;
        this.isLoading = false;
      }
    },

    exibir(paciente) {
      const { id } = paciente;
      this.$router.push({ name: 'ProntuarioPage', params: { id } });
    },
    adicionar(paciente) {
      const { id } = paciente;
      this.$router.push({ name: 'addProntuario', params: { id } });
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

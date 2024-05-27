<template>
  <div class="page-paciente">
    <div v-if="isLoading" class="loading-animation"></div>

    <div class="carro" v-else>
      <div class="row justify-right">
        <q-btn-toggle
          v-model="slide"
          :options="[
            { label: 'Dados Pessoais', value: 'dados' },
            { label: 'Calendário', value: 'calendario' },
          ]"
        />
      </div>
      <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"

        >
          <q-carousel-slide name="dados" class="column no-wrap center">
            <!-- Dados pessoais do Paciente -->
            <div v-if="pacienteChave" class="q-gutter-md">
              <q-card class="my-card" flat bordered>
                <q-card-section vertical >
                    <div class="custom-separator">
                      <q-icon name="history_edu" />
                        <div class="separator-icon">
                          <h6><span>Dados Pessoais</span></h6>
                        </div>
                      <q-icon name="history_edu" />
                    </div>
                    <div class="q-pa-md">
                      <div class="q-gutter-md row items-start" >
                        <q-input v-model="pacienteChave.nome" filled hint="Paciente"
                        disable class="inputM" />
                        <q-input v-model="pacienteChave.nome_mae" filled hint="Mãe"
                        disable class="inputM" />
                        <q-input v-model="pacienteChave.naturalidade" filled hint="Naturalidade"
                        disable class="inputM" />

                        <q-input v-model="pacienteChave.profissao" filled hint="Profissão"
                        disable class="inputP" />

                        <q-input v-model="pacienteChave.cartao_sus" filled  hint="Cartão SUS"
                        disable class="inputP" />

                        <q-input v-model="pacienteChave.telefone" filled type="tel"
                         hint="Número de Telefone"  disable class="inputP" />

                        <q-input v-model="pacienteChave.n_sinan"
                        filled type="url" hint="Número Sinan" disable />

                        <q-input v-model="pacienteChave.unidade_tratamento"
                        filled hint="Unidade Cadastro"
                        disable class="inputM" />

                        <q-input v-model="pacienteChave.unidade_cad"
                        filled hint="Unidade Tratamento"
                        disable class="inputM" />

                      </div>
                    </div>
                </q-card-section>
              </q-card>
              </div>
          </q-carousel-slide>
          <q-carousel-slide name="calendario" class="column no-wrap center">
              <FullCalendar :options="calendarOptions" />
              <q-dialog v-model="dialogVisible" v-if="!isUser" >
                <q-card>
                  <q-card-section>
                    <q-input v-model="eventTitle" label="Título do Evento" />

                    <q-input
                      filled
                      v-model="selectedTime"
                      label="Horário do evento"
                      mask="time"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="selectedTime">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn label="Adicionar Evento" color="green" @click="addEvent" />
                    <q-btn label="Cancelar" color="red" @click="closeDialog" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
          </q-carousel-slide>
        </q-carousel>

      </div>

      <q-separator spaced inset vertical dark />

      <div>TB Koch - 2024 </div>
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

    <q-dialog v-model="showEventDetails">
      <q-card>
        <q-card-section>
          <p>{{ selectedEvent.title }}</p>
          <q-separator class="my-separator" />
          <p>Data: {{ selectedEvent.date }}</p>
          <p>Hora: {{ selectedEvent.time }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" color="primary" @click="closeEventDetails" />
          <q-btn label="Excluir" color="negative"
           @click="deleteEvent(selectedEvent)" v-if="!isUser"  />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="erro" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Algo deu Errado !</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          {{ mensagem }}
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="adicionouEvento" persistent transition-show="scale" transition-hide="scale" >
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha ao criar Evento</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível criar seu eventos. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="removeuEvento" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha ao excluir Evento</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível excluir seu evento. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDialog" persistent>
    <q-card>
      <template v-if="!loading">
        <q-card-section class="items-center">
          <div>
        <q-item-label header align="center" class="custom-header-label">
          Imagem para Marcação
        </q-item-label>
      </div>
      <q-item-label align="center">
        <h6>Por favor, esteja ciente de que:</h6>
        <li>Apenas imagens de escarro devem ser enviadas</li>
        <li>Faça o download da imagem quando disponível</li>
        <li>É necessário esperar o processamento da imagem</li>
      </q-item-label>
      <q-file
        filled
        bottom-slots
        v-model="imgPred"
        label="Imagem de Escarro"
        :accept="acceptedFileTypes"
        counter
        style="margin-top: 10px;"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="clearFile"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint>
          Tamanho da imagem
        </template>
      </q-file>
        </q-card-section>
        <q-card-actions align="center">
        <q-btn label="Fechar" color="red" v-close-popup />
        <q-btn label="Enviar" color="green" @click="envio" />
      </q-card-actions>
      </template>
      <template v-else>
        <q-card-section align="center" class="items-center">
          <q-spinner :size="50" color="red" />
        </q-card-section>
      </template>

    </q-card>
  </q-dialog>

</template>

<script>
import { api } from 'boot/axios';
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  QDialog, QCard, QCardSection, QInput, QBtn,
} from 'quasar';

export default {
  components: {
    FullCalendar,
    QDialog,
    QCard,
    QCardSection,
    QInput,
    QBtn,
  },
  name: 'PacientePage',
  data() {
    return {
      isLoading: true,
      pacienteChave: null,
      prontuarioChave: false,
      showProntuarioDialog: false,
      prontuarioInfo: null,
      slide: ref('dados'),
      text: '',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
      carregouEventos: false,
      adicionouEvento: false,
      removeuEvento: false,
      calendarOptions: {

        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        eventClick: this.handleEventClick,
        dateClick: this.handleDateClick,
        events: [],
        eventRender: this.handleEventRender,
      },
      dialogVisible: false,
      eventTitle: '',
      selectedDate: '',
      selectedTime: '00:00',
      repeatWeekly: false,
      showEventDetails: false,
      selectedEvent: {
        id: 0,
        title: '',
        date: '',
        time: '',
      },
      listaExames: [],
      mensagem: '',
      erro: false,
      imgPred: null,
      loading: false,
      uploadedImageUrl: '',
      showDialog: false,
      feedback: [],

    };
  },
  computed: {
    isUser() {
      const auth = localStorage.getItem('auth');
      return auth === 'user';
    },
  },
  mounted() {
    const idPaciente = localStorage.getItem('idPaciente');
    this.carregaPaciente(idPaciente)
      .then(() => {
        this.verificarProntuario(idPaciente);
        this.carregarEventos(idPaciente);
        this.carregarExames(idPaciente);
      });
  },
  methods: {
    formatDatePublish(date) {
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    async carregaPaciente(id) {
      const token = localStorage.getItem('token');
      const url = `/paciente/${id}`;
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
      const url = `/prontuarioId/${id}`;
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

    handleEventClick(info) {
      const clickedEvent = info.event;
      this.selectedEvent = {
        id: clickedEvent.id,
        title: clickedEvent.title,
        date: moment(clickedEvent.start).format('YYYY-MM-DD'),
        time: moment(clickedEvent.start).format('HH:mm'),
      };
      this.showEventDetails = true;
    },
    handleDateClick(arg) {
      this.selectedDate = arg.dateStr;
      this.dialogVisible = true;
    },

    closeDialog() {
      this.dialogVisible = false;
      this.eventTitle = '';
      this.selectedDate = '';
      this.selectedTime = '00:00';
      this.repeatWeekly = false;
    },
    closeEventDetails() {
      this.showEventDetails = false;
      this.selectedEvent = {
        id: 0,
        title: '',
        date: '',
        time: '',
      };
    },
    handleEventRender(info) {
      const eventElement = info.el;
      eventElement.classList.add('clickable');
    },
    async carregarEventos(id) {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/eventos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const eventosDaApi = response.data.groups;

        this.calendarOptions.events = eventosDaApi.map((evento) => ({
          id: evento.id,
          title: evento.tittle,
          date: evento.date,
        }));
      } catch (error) {
        this.erro = true;
        this.mensagem = 'Não foi possivel carregar os Eventos';
      }
    },
    async carregarExames(id) {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/exame/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.listaExames = response.data.groups;
      } catch (error) {
        this.erro = true;
        this.mensagem = 'Não foi possivel carregar os Exames';
      }
    },
  },
};
</script>

<style scoped>
.carro {
  height: 100%;

}
.custom-separator {
  display: flex;
  align-items: center;
}

.inputM {
  min-width: 250px;
}
.inputP {
  min-width: 100px;
}
.separator-line {
  flex-grow: 1;
  height: 2px;
  background-color: black;
}

.separator-icon {
  margin: 0 10px;  /* Ajuste conforme necessário */
}

.page-paciente {
  max-width: 95%;
  margin: 0 auto;
  top: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
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
  width: 100%;
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

.q-btn-toggle {
  max-width: 100%;
  overflow-x: auto;
}

.clickable {
  cursor: pointer;
}
</style>

<template>
  <div>
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

          <!-- <q-checkbox v-model="repeatWeekly">Repetir toda semana</q-checkbox> -->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Adicionar Evento" color="green" @click="addEvent" />
          <q-btn label="Cancelar" color="red" @click="closeDialog" />
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
  </div>
  <q-dialog v-model="carregouEventos" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha ao carregar Eventos</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível carregar seus eventos. Tente novamente mais tarde.
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
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import axios from 'axios';
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
  data() {
    return {
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
      selectedTime: '07:00',
      repeatWeekly: false,
      showEventDetails: false,
      selectedEvent: {
        id: 0,
        title: '',
        date: '',
        time: '',
      },
    };
  },
  computed: {
    isUser() {
      const auth = localStorage.getItem('auth');
      return auth === 'user';
    },
  },
  mounted() {
    this.carregarEventos(this.$route.params.id);
  },

  methods: {
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

    async addEvent() {
      const formData = new FormData();
      formData.append('tittle', this.eventTitle);
      formData.append('data', `${this.selectedDate}T${this.selectedTime}`);
      formData.append('paciente', this.$route.params.id);

      try {
        const token = localStorage.getItem('token');
        await axios.post('https://api-koch.onrender.com/create-evento', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.carregarEventos(this.$route.params.id);
        this.closeDialog();
      } catch (error) {
        this.adicionouEvento = true;
      }
    },

    async deleteEvent(eventToDelete) {
      const idToDelete = parseInt(eventToDelete.id, 10);
      const index = this.calendarOptions.events.findIndex(
        (event) => event.id === idToDelete,
      );

      if (index !== -1) {
        const token = localStorage.getItem('token');
        try {
          await axios.delete(`https://api-koch.onrender.com/delete-evento/${idToDelete}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          this.calendarOptions.events.splice(index, 1);
          this.closeEventDetails();
        } catch (error) {
          this.removeuEvento = true;
        }
      }
    },

    closeDialog() {
      this.dialogVisible = false;
      this.eventTitle = '';
      this.selectedDate = '';
      this.selectedTime = '07:00';
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
        const response = await axios.get(`https://api-koch.onrender.com/eventos/${id}`, {
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
        this.carregouEventos = true;
      }
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>

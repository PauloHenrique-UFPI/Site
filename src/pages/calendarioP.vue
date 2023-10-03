<template>
  <div>
    <FullCalendar :options="calendarOptions" />
    <q-dialog v-model="dialogVisible">
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

          <q-checkbox v-model="repeatWeekly">Repetir toda semana</q-checkbox>
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
          <q-btn label="Excluir" color="negative" @click="deleteEvent(selectedEvent)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
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
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        eventClick: this.handleEventClick,
        dateClick: this.handleDateClick,
        events: [
          { id: 1, title: 'Dia de retorno a PAM', date: '2023-08-08T10:00' },
          { id: 2, title: 'Dia de tomar medicação', date: '2023-08-02T14:30' },
        ],
        eventRender: this.handleEventRender,
      },
      dialogVisible: false,
      eventTitle: '',
      selectedDate: '',
      selectedTime: '10:00',
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
    addEvent() {
      const newEvent = {
        id: Date.now(),
        title: this.eventTitle,
        date: `${this.selectedDate}T${this.selectedTime}`,
      };

      this.calendarOptions.events.push(newEvent);

      if (this.repeatWeekly) {
        const startDate = moment(this.selectedDate);
        for (let i = 1; i <= 26; i += 1) {
          const newDate = startDate.clone().add(i * 7, 'days').format('YYYY-MM-DD');
          this.calendarOptions.events.push({
            id: Date.now() + i,
            title: this.eventTitle,
            date: `${newDate}T${this.selectedTime}`,
          });
        }
      }
      this.closeDialog();
    },
    deleteEvent(eventToDelete) {
      const idToDelete = parseInt(eventToDelete.id, 10);
      const index = this.calendarOptions.events.findIndex(
        (event) => event.id === idToDelete,
      );

      if (index !== -1) {
        this.calendarOptions.events.splice(index, 1);
        this.closeEventDetails();
      }
    },

    closeDialog() {
      this.dialogVisible = false;
      this.eventTitle = '';
      this.selectedDate = '';
      this.selectedTime = '10:00';
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
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>

<template>
  <div class="page-paciente">
    <div class="addFeed" style="position: abs;" v-if="!isUser && !isAgente && !isMed">
      <q-btn
      padding="lg"
      color="orange"
      round
      icon="add_comment"
      @click="feedbackDialog = true"
     />
    </div>
    <div v-if="isLoading" class="loading-animation"></div>

    <div class="carro" v-else>
      <div class="row justify-right">
        <q-btn-toggle
          v-model="slide"
          :options="[
            { label: 'Dados Pessoais', value: 'dados' },
            { label: 'Calendário', value: 'calendario' },
            { label: 'Acompanhamento', value: 'acompanhamento' },
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
          <q-carousel-slide name="acompanhamento" class="column no-wrap center">
            <div class="q-ma-md q-pa-md"
              style="display: flex; flex-wrap: wrap; justify-content: center;"><div class="q-pa-md" style="max-width: 350px">
                <div v-if="feedbackInfo">
                  <q-card>
                    <q-card-section>
                      <ul class="medical-history">
                        <div class="q-dialog-title"><strong></strong></div>
                        <h6 style="color: green; text-align: center;">Informações Feedback</h6>
                          <div class="registro-item">
                            <div class="registro-date"><strong>Escolaridade:</strong>
                              {{ feedbackInfo.escolaridade }}</div>
                            <div class="registro-description"><strong>Zona de Habitação:</strong>
                              {{ feedbackInfo.zona_habitacao }}</div>
                            <div class="registro-description"><strong>Sexo:</strong>
                              {{ feedbackInfo.sexo }}</div>  
                            <div class="registro-description"><strong>Faixa Etária:</strong>
                              {{ feedbackInfo.faixa_etaria }}</div>
                            <div class="registro-description"><strong>Renda Familiar:</strong>
                            {{ feedbackInfo.renda_familiar }}</div> 
                            <div class="registro-description"><strong>Quantidade de Familiares:</strong>
                            {{ feedbackInfo.qtd_familiares }}</div> 
                            <div class="registro-description"><strong>Etnia:</strong>
                            {{ feedbackInfo.etnia }}</div>
                            <div class="registro-description"><strong>Tempo de Tratamento:</strong>
                            {{ feedbackInfo.tempo_trat }}</div> 
                            <div class="registro-description"><strong>Apoio Familiar:</strong>
                            {{ feedbackInfo.apoio_familiar }}</div> 
                            <div class="registro-description"><strong>Informativo:</strong>
                            {{ feedbackInfo.info }}</div> 
                            <div class="registro-description"><strong>Alimentação:</strong>
                            {{ feedbackInfo.alimentacao }}</div> 
                            <div class="registro-description"><strong>Apoio Ubs:</strong>
                            {{ feedbackInfo.apoio_ubs }}</div> 
                            <div class="registro-description"><strong>Expectativa:</strong>
                            {{ feedbackInfo.expectativa }}</div>           
                          </div>
                      </ul>
                    </q-card-section>
                  </q-card>
                </div>
              </div>

              <div class="q-pa-md" style="max-width: 350px" v-if="!isAgente">
                <q-list bordered>
                  <h6 style="color: orange; text-align: center;">Teste de Bacilos</h6>
                  <q-separator />
                  <div v-if="listaExames.length > 0">
                    <div v-for="(post, index) in listaExames"
                    :key="index">
                      <q-item>
                      <q-item-section avatar>
                        <q-avatar rounded>
                          <img  :src="post.img">
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        {{ formatDatePublish(post.date) }} </q-item-section>
                      <q-item-section>

                        <q-btn outline color="primary"
                        icon="image_search" @click="mostrarImg(post.img, post.data)" />
                        <q-btn outline color="primary"
                        icon="download" @click="downloadImage(post.img)" />

                      </q-item-section>
                    </q-item>
                    </div>
                  </div>
                  <div v-else>
                      <p>Nenhum exame disponível no momento.</p>
                  </div>

                  <q-separator />
                  <q-card-actions align="center" class="bg-white text-teal">
                    <q-btn
                    dark-percentage
                    unelevated
                    color="orange"
                    text-color="grey-9"
                    @click="showDialog = !showDialog"
                    icon="cloud_upload"
                    style="width: 100px"
                  />
                  </q-card-actions>

                </q-list>
              </div>
              
              <div class="q-pa-md" style="max-width: 350px">
                <div v-if="prontuarioInfo">
                  <q-card>
                    <q-card-section>
                      <ul class="medical-history">
                        <div class="q-dialog-title"><strong></strong></div>
                        <h6 style="color: blue; text-align: center;">Informações Complementares</h6>
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

                  </q-card>
                </div>

                <div class="container" v-else>
                    <q-btn
                      class="botao btn-fixed-width"
                      color="red"
                      label="Adicionar Dados Complementares"
                      icon="add"
                      @click="adicionar(pacienteChave)"
                    />
                </div>
              </div>
            </div>

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
          <p style="text-align: center;">{{ selectedEvent.title }}</p>
          
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

    <q-dialog v-model="showImg" persistent>
      <q-card class="my-card">
        <img :src="imgS">
        <q-card-actions align="center">
          <q-btn label="Fechar" color="red" @click="fecharImg()" />
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

  <q-dialog v-model="feedbackDialog">
    <q-card style="width: 600px">
      <q-card-section>
        <q-form @submit.prevent="submitAnswer">
          <h6 style="text-align: center">{{ currentQuestion }}</h6>

            <div v-if="currentQuestionIndex === 0" 
              class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="escolaridade" val="Fundamental" 
              label="Fundamental" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="escolaridade" val="Médio"
               label="Médio" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="escolaridade" val="Superior"
              label="Superior" color="green" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 1" 
            class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="zona_h" val="Zona Rural" 
              label="Zona Rural" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="zona_h" val="Zona Urbana"
              label="Zona Urbana" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 2" 
            class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="sexo" val="Masculino" 
              label="Masculino" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="sexo" val="Feminino"
              label="Feminino" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="sexo" val="Outros"
               label="Outros" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 3" 
            class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="faixa_etaria" val="1 - 10 anos" 
              label="1 - 10 anos" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="faixa_etaria" val="11 - 20 anos"
              label="11 - 20 anos" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="faixa_etaria" val="21 - 30 anos"
               label="21 - 30 anos" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="faixa_etaria" val="31 - 50"
              label="31 - 50" color="cyan" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="faixa_etaria" val="mais de 51 anos"
              label="mais de 51 anos" color="green" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 4" 
            class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="renda_familiar" val="Menos de um Salário" 
              label="Menos de um Salário" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="renda_familiar" val="R$1.412 - R$2.824"
              label="R$1.412 - R$2.824" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="renda_familiar" val="R$2.824 - R$4.236"
               label="R$2.824 - R$4.236" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="renda_familiar" val="Mais de R$4.236"
              label="Mais de R$4.236" color="cyan" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 5" 
            class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="qtd_familiar" val="Vivo sozinho(a)" 
              label="Vivo sozinho(a)" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="qtd_familiar" val="2 há 4 pessoas"
              label="2 há 4 pessoas" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="qtd_familiar" val="3 há 6 pessoas"
               label="3 há 6 pessoas" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="qtd_familiar" val="Mais de 7 pessoas"
              label="Mais de 7 pessoas" color="green" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 6" 
              class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="usoD_d" val="Álcool" 
              label="Álcool" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="usoD_d" val="Cigarro"
              label="Cigarro" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="usoD_d" val="Álcool e cigarro"
               label="Álcool e cigarro" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="usoD_d" val="Outros"
              label="Outros" color="cyan" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="usoD_d" val="Nunca usei"
              label="Nunca usei" color="green" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 7" 
              class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="etnia" val="Branco" 
              label="Branco" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="etnia" val="Pardo"
              label="Pardo" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="etnia" val="Negro"
               label="Negro" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="etnia" val="Indíngena"
              label="Indíngena" color="cyan" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="etnia" val="Amarelo"
              label="Amarelo" color="green" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div v-if="currentQuestionIndex === 8" 
            class="p1 q-gutter-sm" >
              <q-radio keep-color v-model="tempoT" val="1 a 3 meses" 
              label="1 a 3 meses" color="teal" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="tempoT" val="3 a 6 meses"
              label="3 a 6 meses" color="orange"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="tempoT" val="6 a 9 meses"
               label="6 a 9 meses" color="red"  checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="tempoT" val="mais de 9 meses"
              label="mais de 9 meses" color="cyan" checked-icon="task_alt" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div  v-if="currentQuestionIndex === 9" class="p1 q-gutter">
              <q-radio keep-color v-model="familia" val="Ruim" 
              label="Ruim" color="red" checked-icon="sentiment_dissatisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="familia" val="Regular"
              label="Regular" color="grey"  checked-icon="sentiment_neutral" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="familia" val="Bom"
               label="Bom" color="green"  checked-icon="sentiment_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="familia" val="Ótimo"
              label="Ótimo" color="blue" checked-icon="sentiment_very_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div  v-if="currentQuestionIndex === 10" class="p1 q-gutter-sm">
              <q-radio keep-color v-model="informativo" val="Não sei nada" 
              label="Ruim" color="red" checked-icon="sentiment_dissatisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="informativo" val="Regular"
              label="Regular" color="grey"  checked-icon="sentiment_neutral" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="informativo" val="Bom"
               label="Bom" color="green"  checked-icon="sentiment_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="informativo" val="Ótimo"
              label="Ótimo" color="blue" checked-icon="sentiment_very_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div  v-if="currentQuestionIndex === 11" class="p1 q-gutter">
              <q-radio keep-color v-model="alimentacao" val="Ruim" 
              label="Ruim" color="red" checked-icon="sentiment_dissatisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="alimentacao" val="Regular"
              label="Regular" color="grey"  checked-icon="sentiment_neutral" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="alimentacao" val="Bom"
               label="Bom" color="green"  checked-icon="sentiment_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="alimentacao" val="Ótimo"
              label="Ótimo" color="blue" checked-icon="sentiment_very_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div  v-if="currentQuestionIndex === 12" class="p1 q-gutter">
              <q-radio keep-color v-model="apoioUBS" val="Ruim" 
              label="Ruim" color="red" checked-icon="sentiment_dissatisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="apoioUBS" val="Regular"
              label="Regular" color="grey"  checked-icon="sentiment_neutral" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="apoioUBS" val="Bom"
               label="Bom" color="green"  checked-icon="sentiment_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="apoioUBS" val="Ótimo"
              label="Ótimo" color="blue" checked-icon="sentiment_very_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

            <div  v-if="currentQuestionIndex === 13" class="p1 q-gutter">
              <q-radio keep-color v-model="exepctativa" val="Ruim" 
              label="Ruim" color="red" checked-icon="sentiment_dissatisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="exepctativa" val="Regular"
              label="Regular" color="grey"  checked-icon="sentiment_neutral" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="exepctativa" val="Bom"
               label="Bom" color="green"  checked-icon="sentiment_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
              <q-radio keep-color v-model="exepctativa" val="Ótimo"
              label="Ótimo" color="blue" checked-icon="sentiment_very_satisfied" 
              unchecked-icon="panorama_fish_eye"/>
            </div>

          <div style="margin-top: 10px; display: flex; justify-content: space-between;">
            <q-card-actions class="bg-white text-teal">
              <q-btn
                v-if="currentQuestionIndex > 0"
                round
                color="white"
                icon="arrow_back"
                class="text-black"
                @click="previousQuestion"
              />
            </q-card-actions>
            <q-card-actions class="bg-white text-teal">
              <q-btn v-if="currentQuestionIndex === 13" label="ENVIAR" @click="feedbackAdd"></q-btn>
            </q-card-actions>
            <q-card-actions class="bg-white text-teal">
              <q-btn
                v-if="currentQuestionIndex < 13"
                round
                type="submit"
                color="white"
                icon="east"
                class="text-black"
              />
            </q-card-actions> 
          </div>
        </q-form>
      </q-card-section>
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
import axios from 'axios';
import FileSaver from 'file-saver';
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
      feedbackInfo: null,
      slide: ref('dados'),
      text: '',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
      carregouEventos: false,
      adicionouEvento: false,
      removeuEvento: false,
      calendarOptions: {
        timeZone: 'UTC', 
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
      showImg: false,
      imgS: '',
      imgDisc: '',
      feedbackDialog: false,
      questions: [
        'Qual o seu nível de escolaridade?',
        'Qual sua zona de habitação?',
        'Qual seu sexo?',
        'Qual sua faixa etária?',
        'Qual sua renda familiar?',
        'Qual pessoas moram na sua casa?',
        'Você faz ou já fez uso de entorpecentes?',
        'A qual etnia você acredita pertencer?',
        'A quanto tempo está sendo tratado?', 
        'Como é o Apoio Familiar que você recebe?', 
        'O quão bem informado sobre sua doença você é?',
        'Como você classifica sua alimentação?',
        'Como você classifica o Apoio da UBS você recebe?',
        'Em escala o quanto você acredita esta melhorando?'],
      currentQuestionIndex: 0,
      answer: '',
      escolaridade: '',
      zona_h: '',
      sexo: '',
      faixa_etaria: '',
      renda_familiar: '',
      qtd_familiar: '',
      usoD_d: '',
      etnia: '',
      tempoT: '',
      familia: '',
      informativo: '',
      alimentacao: '',
      apoioUBS: '',
      exepctativa: '',

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
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  mounted() {
    this.carregaPaciente(this.$route.params.id)
      .then(() => {
        this.verificarProntuario(this.$route.params.id);
        this.verificarFeed(this.$route.params.id);
        this.carregarEventos(this.$route.params.id);
        this.carregarExames(this.$route.params.id);
      });
  },
  methods: {
    async envio() {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append('file', this.imgPred);
        const response = await api.post(
          'https://tbkoch.com.br/api1/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            responseType: 'arraybuffer',
          },
        );

        if (response.status === 200) {
          const blob = new Blob([response.data], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);

          this.uploadedImageUrl = imageUrl;

          // Obter o nome do arquivo da própria imagem
          const filename = this.imgPred.name;
          const token = localStorage.getItem('token');
          const now = new Date();
          const year = now.getUTCFullYear();
          const month = String(now.getUTCMonth() + 1).padStart(2, '0');
          const day = String(now.getUTCDate()).padStart(2, '0');
          const hours = String(now.getUTCHours()).padStart(2, '0');
          const minutes = String(now.getUTCMinutes()).padStart(2, '0');
          const seconds = String(now.getUTCSeconds()).padStart(2, '0');
          const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');

          const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
          const imgFormData = new FormData();
          imgFormData.append('nome', 'Teste');
          imgFormData.append('date', isoString);
          imgFormData.append('paciente', this.$route.params.id);
          imgFormData.append('img', blob, filename);
          const imgResponse = await api.post(
            '/create-exame',
            imgFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          console.log(imgResponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        window.location.reload();
      }
    },

    clearFile() {
      this.imgPred = null;
    },

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

    async verificarFeed(id) {
      const token = localStorage.getItem('token');
      const url = `/feedback/${id}`;
      try {
        const resposta = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.feedbackInfo = resposta.data;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },

    async downloadImage(url) {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      FileSaver.saveAs(blob, 'image.jpg');
    },

    mostrarImg(img, disc) {
      this.imgS = img;
      this.imgDisc = disc;
      this.showImg = true;
    },

    fecharImg() {
      this.imgS = '';
      this.imgDisc = '';
      this.showImg = false;
    },

    dialogIMG() {
      this.showDialog = true;
      console.log(this.showDialog);
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

    async addEvent() {
      const formData = new FormData();
      formData.append('tittle', this.eventTitle);
      formData.append('data', `${this.selectedDate}T${this.selectedTime}`);
      formData.append('paciente', this.$route.params.id);
      console.log(`${this.selectedDate}T${this.selectedTime}`);

      try {
        const token = localStorage.getItem('token');
        await api.post('/create-evento', formData, {
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
          await api.delete(`/delete-evento/${idToDelete}`, {
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

    async feedbackAdd() {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('escolaridade', this.escolaridade);
        formData.append('zona_habitacao', this.zona_h);
        formData.append('sexo', this.sexo);
        formData.append('faixa_etaria', this.faixa_etaria);
        formData.append('renda_familiar', this.renda_familiar);
        formData.append('qtd_familiares', this.qtd_familiar);
        formData.append('uso_de_drogas', this.usoD_d);
        formData.append('etnia', this.etnia);
        formData.append('tempo_trat', this.tempoT);
        formData.append('apoio_familiar', this.familia);
        formData.append('info', this.informativo);
        formData.append('alimentacao', this.alimentacao);
        formData.append('apoio_ubs', this.apoioUBS);
        formData.append('expectativa', this.exepctativa);
        formData.append('paciente', this.$route.params.id);

        await api.post('/create-feedback', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        this.$router.push('/pacientes');
      } catch (error) {
        console.log(error);
        this.persistent = true;
      } 
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
          date: moment.utc(evento.date).format(),
        }));
        console.log('O que veio:', response.data.groups);
        // eslint-disable-next-line
        console.log('O que está:', this.calendarOptions.events);
        
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
    submitAnswer() {
      console.log('Resposta:', this.answer);
      this.answer = '';
      if (this.currentQuestionIndex < this.questions.length - 1) {
        // eslint-disable-next-line
        this.currentQuestionIndex++;
      } else {
        this.dialogVisible = false;
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        // eslint-disable-next-line
        this.currentQuestionIndex--;
      }
    },
    closeDialogfeed() {
      this.dialogVisible = false;
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

.addFeed{
  position: fixed;
  left:85%;
  top: 78%;
  z-index: 2;
}

.p1 {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>

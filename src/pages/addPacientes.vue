<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-lg">
      <div v-if="loading" class="loading-animation"></div>

      <div v-else >

        <q-card class="card4">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
          <h4 class="titulo3">
            <q-icon name="badge" color="green" />
             Dados Pessoais
            <q-icon name="badge" color="green" />
          </h4>

            <q-input
              filled
              v-model="nome"
              label="Nome *"
              hint="Qual o Nome?"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />

            <q-input
              filled
              v-model="nomeMae"
              label="Nome da Mãe *"
              hint="Qual o Nome da Mãe?"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />

            <q-input
              filled
              v-model="naturalidade"
              label="Naturalidade *"
              hint="Natural de onde?"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />
            <q-input
              filled
              v-model="profissao"
              label="Profissão *"
              hint="Trabalha com o que?"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />

            <q-input filled v-model="date" label="Data de Nascimento *"
            hint="Clique no Icone" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" locale="pt">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="aceitar" color="red" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

            <h4 class="titulo3">
              <q-icon name="house" color="orange" />
               Endereço
               <q-icon name="emoji_transportation" color="orange" />
               </h4>
            <q-input
              filled
              v-model="endereco"
              label="Endereço*"
              hint="Rua, Bairro e Nº casa"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />

            <q-select
              filled
              v-model="municipio"
              :options="options"
              label="Município*"
              hint="Selecione na Lista"
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"

              />
            <q-input
              filled
              v-model="refencia"
              label="Referência*"
              hint="Ponto de Referência"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />
            <q-input
              filled
              v-model="telefone"
              label="Nº Telefone *"
              hint="Qual o Número"
              mask="(##) # ####-####"
              class="campo"
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
            />
            <h4 class="titulo3">
              <q-icon name="medical_information" color="red" /> 
              Informações Médicas
              <q-icon name="medical_information" color="red" /> 
            </h4>
            <div class="">
                <div class="q-px-sm">
                  Forma: <strong>{{ shape }}</strong>
                </div>
                <q-radio v-model="shape" checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye" val=1 label="1 - Pulmonar" />
                <q-radio v-model="shape" checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye" val=2 label="2 - Negativa" />
                <q-radio v-model="shape" checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye" val='3' label="3 - Não realizada" />
                <q-radio v-model="shape" checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye" val='4' label="4 - Não se aplica" />
                <div class="q-px-sm">
                Você selecionou: <strong>{{ shape }}</strong>
              </div>
            </div>

            <q-input
              filled
              v-model="cartaoSus"
              label="Nº Cartão SUS *"
              hint="Qual os Digitos do cartão?"
              mask="### #### #### ####"
              class="campo"
              :rules="[
                val => val !== null && val !== '' || 'Este campo é obrigatório',

              ]"
              type="tel"
            />
            <q-input
              filled
              v-model="sinan"
              label="Nº SINAN *"
              hint="Número do SINAN?"
              class="campo"
              :rules="[
                val => val !== null && val !== '' || 'Este campo é obrigatório',
              ]"
              mask="#######"
              type="tel"
            />
            <q-input
              filled
              v-model="unidadeTratamento"
              label="Unidade de Tratamento *"
              hint="Unidade em que é tratado?"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Este campo é obrigatório']"
            />

            <q-input
              filled
              v-model="unidadeCadastro"
              label="Unidade de Cadastro *"
              hint="Unidade em que foi cadastrado?"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Este campo é obrigatório']"
            />

            <div class="flex flex-center">
              <q-btn label="Cancelar" to="/home" color="primary" flat/>
              <q-btn label="Enviar" type="submit"  @click="submitForm" icon="send" color="red"/>  
            </div>
          </q-form>
      </q-card>
    </div>
  </div>
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha ao
            {{ isUpdate ? 'atualizar': 'criar' }} Paciente</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível {{ isUpdate ? 'atualizar o': 'criar o novo' }} Paciente.
          Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="missingFieldsDialog"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        Existem campos obrigatórios que devem ser preenchidos.
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  </q-page>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  data() {
    return {
      nome: '',
      nomeMae: '',
      naturalidade: '',
      profissao: '',
      endereco: '',
      municipio: '',
      refencia: '',
      telefone: '',
      forma: 1,
      img: null,
      cartaoSus: '',
      sinan: '',
      unidadeTratamento: '',
      unidadeCadastro: '',
      date: null,
      loading: false,
      persistent: false,
      missingFieldsDialog: false,
      PacienteId: null,
      isUpdate: false,
    };
  },
  setup() {
    return {
      model: ref(null),
      shape: ref('3'),
      options: [
        'Picos', 'Vila Nova', 'Ipiranga', 'Oeiras', 'Outro',
      ],
    };
  },
  computed: {
    isUser() {
      const auth = localStorage.getItem('auth');
      return auth === 'user';
    },
  },

  mounted() {
    if (this.isUser) {
      this.$router.push({ name: 'home' });
    }
  },
  async created() {
    const token = localStorage.getItem('token');
    this.PacienteId = (this.$route.params.id);
    this.isUpdate = !!this.PacienteId;
    if (this.isUpdate) {
      try {
        const response = await api.get(`/paciente/${this.PacienteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const paciente = response.data;
        this.nome = paciente.nome;
        this.date = paciente.data_nasc;
        this.nomeMae = paciente.nome_mae;
        this.naturalidade = paciente.naturalidade;
        this.profissao = paciente.profissao;
        this.endereco = paciente.endereco;
        this.municipio = paciente.municipio;
        this.refencia = paciente.ponto_ref;
        this.telefone = paciente.telefone;
        this.forma = paciente.forma;
        this.cartaoSus = paciente.cartao_sus;
        this.sinan = paciente.n_sinan;
        this.unidadeTratamento = paciente.unidade_tratamento;
        this.unidadeCadastro = paciente.unidade_cad;
        // this.date = paciente.date;
      } catch (error) {
        console.log('Paciente não encontrado', error);
      }
    }
  },
  methods: {
    clearImage() {
      this.img = null;
    },
    async submitForm(event) {
      event.preventDefault();
      if (this.nome && this.date && this.profissao && this.naturalidade
      && this.nomeMae && this.forma && this.cartaoSus
      && this.endereco && this.municipio && this.refencia
      && this.naturalidade) {
        try {
          this.loading = true;
          const token = localStorage.getItem('token');
          const formData = new FormData();
          const dataAntiga = this.date;
          const partesData = dataAntiga.split('/');
          const novaData = new Date(`${partesData[0]}-${partesData[1]}-${partesData[2]}`);
          const dataFormatada = novaData.toISOString();

          // Adicionar campos ao objeto FormData
          formData.append('nome', this.nome);
          formData.append('data_nasc', dataFormatada);
          formData.append('naturalidade', this.naturalidade);
          formData.append('profissao', this.profissao);
          formData.append('nome_mae', this.nomeMae);
          formData.append('forma', parseInt(this.shape, 10));
          formData.append('cartao_sus', this.cartaoSus);
          formData.append('endereco', this.endereco);
          formData.append('municipio', this.municipio);
          formData.append('ponto_ref', this.refencia);
          formData.append('telefone', this.telefone);
          formData.append('n_sinan', this.sinan);
          formData.append('unidade_tratamento', this.unidadeTratamento);
          formData.append('unidade_cad', this.unidadeCadastro);

          if (!this.isUpdate) {
            await api.post('/create-paciente', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });
          } else {
            await api.put(`/alter-paciente/${this.PacienteId}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });
          }
          this.$router.push('/pacientes');
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
  },
});

</script>

<style lang="scss">

.baixo{
position: relative;
top: 100px;
width: 100%;
}
.card4{
  padding: 5%;
}
.data{
  width: 50%;
}
.loading-animation {

width: 100px;
height: 100px;
flex-wrap: wrap;
justify-content: center;
border: 5px solid #ccc;
border-top-color: #e90808;
border-radius: 50%;
animation: spin 1s linear infinite;
margin: 0 auto;
}

.titulo3 {
    font-size: 30px;
    font-family: 'Courier New';
    text-align: center;
    font-weight: bold;
    border-radius: 10px;
    color: #000000;
    margin-bottom: 20px;
  }
</style>

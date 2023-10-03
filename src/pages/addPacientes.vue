<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-lg" style="width: 70%;">

    <q-card class="card4">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <h4 class="campo"><q-icon name="edit" color="red" /> Dados Pessoais </h4>

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

        <h4 class="campo"><q-icon name="edit" color="red" /> Endereço </h4>
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
          type="tel"
        />
        <h4 class="campo"><q-icon name="edit" color="red" /> SUS </h4>
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

        <q-file filled bottom-slots v-model="img" label="Imagem" counter accept="image/*">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="clearImage" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            Imagem do exame de Escarro (não obrigatório)
          </template>
      </q-file>

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

        <div>
          <q-btn label="Enviar" type="submit"  @click="submitForm" icon="send" color="red"/>

          <q-btn label="Cancelar" to="/home" color="primary" flat/>
        </div>
      </q-form>
  </q-card>
  </div>

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
    };
  },
  setup() {
    return {
      model: ref(null),
      shape: ref('3'),
      options: [
        'Picos', 'Vila Nova', 'Ipiranga', 'Outro',
      ],
    };
  },
  methods: {
    clearImage() {
      this.img = null;
    },
    async submitForm(event) {
      event.preventDefault();

      try {
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
        formData.append('img', this.img);
        console.log('Conteúdo do objeto formData:');
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        const response = await api.post('https://api-koch.onrender.com/create-paciente', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Definir o cabeçalho correto para enviar o arquivo
          },
        });

        console.log(response);
        this.$router.push('/pacientes');
      } catch (error) {
        console.log(error);

        alert(error.request.response);
      } finally {
        this.loading = false; // Desativar a animação de carregamento
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
  padding: 10%;
  width: 100%;
}
.data{
  width: 50%;
}
</style>

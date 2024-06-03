<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-lg" style="width: 90%;">

    <q-card class="cardProntuario">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <h4 class="tituloP">
        <q-icon name="description" color="red"
        style="align-items: center;" />
        Prontuário
       </h4>

        <div>
          <h3 class="h3a">Tipo de Entrada* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Caso Novo" label="Caso Novo" color="teal" />
              <q-radio keep-color v-model="tipo" val="Reciditiva"
              label="Reciditiva" color="orange" />
              <q-radio keep-color v-model="tipo" val="Reingresso Abandono"
               label="Reingresso Abandono"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Transferência"
              label="Transferência" color="cyan" />
              <q-radio keep-color v-model="tipo" val="Pós-Óbito"
              label="Pós-Óbito" color="brown" />
              <q-radio keep-color v-model="tipo" val="Não Sabe"
              label="Não Sabe" color="purple" />
            </div>
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>

          <div>
          <h3 class="h3a" >População Especial* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="popu_especifica" val="Não" label="Não" color="teal" />
              <q-radio keep-color v-model="popu_especifica" val="Privado de Liberdade"
              label="Privado de liberdade" color="orange" />
              <q-radio keep-color v-model="popu_especifica" val="Situação de Rua"
               label="Situação de Rua"
               color="red" />
              <q-radio keep-color v-model="popu_especifica" val="Profissional de Saúde"
              label="Transferência" color="cyan" />
            </div>
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ popu_especifica }}</strong>
            </div>
          </div>

          <div>
          <h3 class="h3a">Programa de Transferência de Renda do Governo* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="beneficiario" val="Não" label="Não" color="teal" />
              <q-radio keep-color v-model="beneficiario" val="Sim" label="Sim" color="orange" />
              <q-radio keep-color v-model="beneficiario"
              val="Ignorado" label="Ignorado" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ beneficiario }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Extrapulmonar* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="se_extrapulmonar"
               val="Pleural" label="Pleural" color="teal" />
              <q-radio keep-color v-model="se_extrapulmonar" val="Ganglionar Periférico"
              label="Ganglionar Periférico" color="orange" />
              <q-radio keep-color v-model="se_extrapulmonar" val="Geniturinário"
               label="Geniturinário"
               color="red" />
              <q-radio keep-color v-model="se_extrapulmonar" val="Osteoarticular"
              label="Osteoarticular" color="cyan" />
              <q-radio keep-color v-model="se_extrapulmonar" val="Miliar"
              label="Miliar" color="brown" />
              <q-radio keep-color v-model="se_extrapulmonar" val="Não Informado"
              label="Não Informado" color="purple" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ se_extrapulmonar }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Agravos* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="agravos" val="Não" label="Não" color="green" />
              <q-radio keep-color v-model="agravos" val="AIDS" label="AIDS" color="teal" />
              <q-radio keep-color v-model="agravos" val="Alcoolismo"
              label="Alcoolismo" color="orange" />
              <q-radio keep-color v-model="agravos" val="Diabetes"
               label="Diabetes"
               color="red" />
              <q-radio keep-color v-model="agravos" val="Doença Mental"
              label="Doença Mental" color="cyan" />
              <q-radio keep-color v-model="agravos" val="Uso de Drogas Ilícitas"
              label="Uso de Drogas Ilícitas" color="brown" />
              <q-radio keep-color v-model="agravos" val="Tabagismo"
              label="Tabagismo" color="purple" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ agravos }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Basilocopia de Escarro (Diagnóstico)* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="diagnostico"
              val="Positiva" label="Positiva" color="teal" />
              <q-radio keep-color v-model="diagnostico"
              val="Negativa" label="Negativa" color="orange" />
              <q-radio keep-color v-model="diagnostico" val="Não Realizado"
              label="Não Realizado" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ diagnostico }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Radiografia do Tórax* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="radiografia"
              val="Positiva" label="Positiva" color="teal" />
              <q-radio keep-color v-model="radiografia"
              val="Negativa" label="Negativa" color="orange" />
              <q-radio keep-color v-model="radiografia" val="Não Realizado"
              label="Não Realizado" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ radiografia }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">HIV* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="hiv" val="Positiva" label="Positiva" color="teal" />
              <q-radio keep-color v-model="hiv" val="Negativa" label="Negativa" color="orange" />
              <q-radio keep-color v-model="hiv" val="Em andamento"
               label="Em andamento" color="red" />
              <q-radio keep-color v-model="hiv" val="Não Realizado"
              label="Não Realizado" color="purple" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ hiv }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Terapia Antirretroviral* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="terapia" val="Sim" label="Sim" color="teal" />
              <q-radio keep-color v-model="terapia" val="Não" label="Não" color="orange" />
              <q-radio keep-color v-model="terapia" val="Ignorado"
              label="Ignorado" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ terapia }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Histopatologia* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="histopatologia" val="Baar Positivo"
              label="Baar Positivo" color="teal" />
              <q-radio keep-color v-model="histopatologia" val="Sugestivo de TB"
              label="Sugestivo de TB" color="orange" />
              <q-radio keep-color v-model="histopatologia" val="Não Sugestivo de TB"
               label="Não Sugestivo de TB"
               color="red" />
              <q-radio keep-color v-model="histopatologia" val="Em andamento"
              label="Em andamento" color="cyan" />
              <q-radio keep-color v-model="histopatologia" val="Não realizado"
              label="Não realizado" color="brown" />

            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ histopatologia }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Cultura* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="cultura" val="Positivo"
              label="Positivo" color="teal" />
              <q-radio keep-color v-model="cultura" val="Negativo"
              label="Negativo" color="orange" />
              <q-radio keep-color v-model="cultura" val="Em andamento"
               label="Em andamento"
               color="red" />
              <q-radio keep-color v-model="cultura" val="Não realizado"
              label="Não realizado" color="cyan" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ cultura }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">TMR-TB* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="teste_sens" val="Detectável sensível à Rifampicina"
              label="Detectável sensível à Rifampicina" color="teal" />
              <q-radio keep-color v-model="teste_sens" val="Detectável Resistente à Rifampicina"
              label="Detectável Resistente à Rifampicina" color="orange" />
              <q-radio keep-color v-model="teste_sens" val="Não Detectável"
               label="Não Detectável"
               color="red" />
              <q-radio keep-color v-model="teste_sens" val="Inconclusivo"
              label="Inconclusivo" color="cyan" />
              <q-radio keep-color v-model="teste_sens" val="Não realizado"
              label="Não realizado" color="brown" />

            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ teste_sens }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Teste de Sensibilidade* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="contatos_ident" val="Resistente somente à Isoniazida"
               label="Resistente somente à Isoniazida" color="teal" />
              <q-radio keep-color v-model="contatos_ident" val="Resistente somente à Rifampicina"
              label="Resistente somente à Rifampicina" color="orange" />
              <q-radio keep-color v-model="contatos_ident"
              val="Resistente somente à Isonizaida e Rifampicina"
               label="Resistente somente à Isonizaida e Rifampicina"
               color="red" />
              <q-radio keep-color v-model="contatos_ident"
              val="Resistente a outras drogas de 1 linha"
              label="Resistente a outras drogas de 1 linha" color="cyan" />
              <q-radio keep-color v-model="contatos_ident" val="Sensível"
              label="Sensível" color="brown" />
              <q-radio keep-color v-model="contatos_ident" val="Em andamento"
              label="Em andamento" color="purple" />
              <q-radio keep-color v-model="contatos_ident" val="Não realizado"
              label="Não realizado" color="pink" />
            </div>
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ contatos_ident }}</strong>
            </div>
          </div>
          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn label="Cancelar" to="/pacientes" color="primary" flat />
            <q-btn label="Enviar" type="submit" @click="submitForm" icon="send" color="red" />
          </q-card-actions>

      </q-form>
  </q-card>
  </div>
  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha ao criar Prontuário</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível criar a Prontuário. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>

import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  data() {
    return {
      tipo: 'Caso Novo',
      popu_especifica: 'Não',
      beneficiario: 'Não',
      tipo_doenca: 'Não Informado',
      se_extrapulmonar: 'Não Informado',
      agravos: 'Não',
      diagnostico: 'Não Realizado',
      radiografia: 'Não Realizado',
      hiv: 'Não Realizado',
      terapia: 'Ignorado',
      data_ini: '2023-06-20T21:19:18.268Z',
      histopatologia: 'Não realizado',
      cultura: 'Não realizado',
      teste_sens: 'Não realizado',
      contatos_ident: 'Não realizado',
      persistent: false,

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
  methods: {
    async submitForm(event) {
      event.preventDefault();

      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('tipo', this.tipo);
        formData.append('popu_especifica', this.popu_especifica);
        formData.append('beneficiario', this.beneficiario);
        formData.append('tipo_doenca', this.tipo_doenca);
        formData.append('se_extrapulmonar', this.se_extrapulmonar);
        formData.append('agravos', this.agravos);
        formData.append('diagnostico', this.diagnostico);
        formData.append('radiografia', this.radiografia);
        formData.append('hiv', this.hiv);
        formData.append('terapia', this.terapia);
        formData.append('data_ini', this.data_ini);
        formData.append('histopatologia', this.histopatologia);
        formData.append('cultura', this.cultura);
        formData.append('teste_sens', this.teste_sens);
        formData.append('contatos_ident', this.contatos_ident);
        formData.append('paciente', this.$route.params.id);

        await api.post('/create-prontuario', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        this.$router.push('/pacientes');
      } catch (error) {
        this.persistent = true;
      }
    },
  },
});
</script>

<style >
.baixoProntuario{
position: relative;

width: 100%;
}

.tituloP {
    font-size: 30px;
    font-family: 'Courier New';
    text-align: center;
    font-weight: bold;
    border-radius: 10px;
    color: #000000;
    margin-bottom: 20px;
  }
.cardProntuario{
  padding: 5%;
  width: 100%;
}
.dataProntuario{
  width: 50%;
}
.h3a{
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
  }

.opt{
  top: 50%;
}

</style>

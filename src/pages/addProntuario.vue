<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-lg" style="width: 70%;">

    <q-card class="cardProntuario">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <h4 class="campo">
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
              <q-radio keep-color v-model="tipo" val="Não" label="Não" color="teal" />
              <q-radio keep-color v-model="tipo" val="Privado de Liberdade"
              label="Privado de liberdade" color="orange" />
              <q-radio keep-color v-model="tipo" val="Situação de Rua"
               label="Situação de Rua"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Profissional de Saúde"
              label="Transferência" color="cyan" />
            </div>
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>

          <div>
          <h3 class="h3a">Programa de Transferência de Renda do Governo* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Não" label="Não" color="teal" />
              <q-radio keep-color v-model="tipo" val="Sim" label="Sim" color="orange" />
              <q-radio keep-color v-model="tipo" val="Ignorado" label="Ignorado" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Extrapulmonar* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Pleural" label="Pleural" color="teal" />
              <q-radio keep-color v-model="tipo" val="Ganglionar Periférico"
              label="Ganglionar Periférico" color="orange" />
              <q-radio keep-color v-model="tipo" val="Geniturinário"
               label="Geniturinário"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Osteoarticular"
              label="Osteoarticular" color="cyan" />
              <q-radio keep-color v-model="tipo" val="Miliar"
              label="Miliar" color="brown" />
              <q-radio keep-color v-model="tipo" val="Não Informado"
              label="Não Informado" color="purple" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Agravos* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="AIDS" label="AIDS" color="teal" />
              <q-radio keep-color v-model="tipo" val="Alcoolismo"
              label="Alcoolismo" color="orange" />
              <q-radio keep-color v-model="tipo" val="Diabetes"
               label="Diabetes"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Doença Mental"
              label="Doença Mental" color="cyan" />
              <q-radio keep-color v-model="tipo" val="Uso de Drogas Ilícitas"
              label="Uso de Drogas Ilícitas" color="brown" />
              <q-radio keep-color v-model="tipo" val="Tabagismo"
              label="Tabagismo" color="purple" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Basilocopia de Escarro (Diagnóstico)* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Positiva" label="Positiva" color="teal" />
              <q-radio keep-color v-model="tipo" val="Negativa" label="Negativa" color="orange" />
              <q-radio keep-color v-model="tipo" val="Não Realizada"
              label="Não Realizada" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Radiografia do Tórax* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Positiva" label="Positiva" color="teal" />
              <q-radio keep-color v-model="tipo" val="Negativa" label="Negativa" color="orange" />
              <q-radio keep-color v-model="tipo" val="Não Realizada"
              label="Não Realizada" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">HIV* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Positiva" label="Positiva" color="teal" />
              <q-radio keep-color v-model="tipo" val="Negativa" label="Negativa" color="orange" />
              <q-radio keep-color v-model="tipo" val="Em andamento"
               label="Em andamento" color="red" />
              <q-radio keep-color v-model="tipo" val="Não Realizada"
              label="Não Realizada" color="purple" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Terapia Antirretroviral* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Sin" label="Sin" color="teal" />
              <q-radio keep-color v-model="tipo" val="Não" label="Não" color="orange" />
              <q-radio keep-color v-model="tipo" val="Ignorado"
              label="Ignorado" color="red" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Histopatologia* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Baar Positivo"
              label="Baar Positivo" color="teal" />
              <q-radio keep-color v-model="tipo" val="Sugestivo de TB"
              label="Sugestivo de TB" color="orange" />
              <q-radio keep-color v-model="tipo" val="Não Sugestivo de TB"
               label="Não Sugestivo de TB"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Em andamento"
              label="Em andamento" color="cyan" />
              <q-radio keep-color v-model="tipo" val="Não realizado"
              label="Não realizado" color="brown" />

            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Cultura* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Positivo"
              label="Positivo" color="teal" />
              <q-radio keep-color v-model="tipo" val="Negativo"
              label="Negativo" color="orange" />
              <q-radio keep-color v-model="tipo" val="Em andamento"
               label="Em andamento"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Não realizado"
              label="Não realizado" color="cyan" />
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">TMR-TB* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Detectável sensível à Rifampicina"
              label="Detectável sensível à Rifampicina" color="teal" />
              <q-radio keep-color v-model="tipo" val="Detectável Resistente à Rifampicina"
              label="Detectável Resistente à Rifampicina" color="orange" />
              <q-radio keep-color v-model="tipo" val="Não Detectável"
               label="Não Detectável"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Inconclusivo"
              label="Inconclusivo" color="cyan" />
              <q-radio keep-color v-model="tipo" val="Não realizado"
              label="Não realizado" color="brown" />

            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
        </div>

        <div>
          <h3 class="h3a">Teste de Sensibilidade* :</h3>
            <div class="q-gutter-sm">
              <q-radio keep-color v-model="tipo" val="Resistente somente à Isoniazida"
               label="Resistente somente à Isoniazida" color="teal" />
              <q-radio keep-color v-model="tipo" val="Resistente somente à Rifampicina"
              label="Resistente somente à Rifampicina" color="orange" />
              <q-radio keep-color v-model="tipo" val="Resistente somente à Isonizaida e Rifampicina"
               label="Resistente somente à Isonizaida e Rifampicina"
               color="red" />
              <q-radio keep-color v-model="tipo" val="Resistente a outras drogas de 1 linha"
              label="Resistente a outras drogas de 1 linha" color="cyan" />
              <q-radio keep-color v-model="tipo" val="Sensível"
              label="Sensível" color="brown" />
              <q-radio keep-color v-model="tipo" val="Em andamento"
              label="Em andamento" color="purple" />
              <q-radio keep-color v-model="tipo" val="Não realizado"
              label="Não realizado" color="pink" />
            </div>
            <div class="q-px-sm q-mt-sm">
              Você selecionou a opção: <strong>{{ tipo }}</strong>
            </div>
          </div>
          <q-btn label="Enviar" type="submit" @click="submitForm" icon="send" color="red" />
          <q-btn label="Cancelar" to="/" color="primary" flat />
      </q-form>
  </q-card>
  </div>

  </q-page>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      tipo: '',
    };
  },
});
</script>

<style >
.baixoProntuario{
position: relative;
top: 100px;
width: 100%;
}
.cardProntuario{
  padding: 10%;
  width: 100%;
}
.dataProntuario{
  width: 50%;
}
.h3a {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
  }

.titulo {
  position: fixed;
  top: 14%;
  right: 1%;
}

.opt{
  top: 50%;
}

</style>

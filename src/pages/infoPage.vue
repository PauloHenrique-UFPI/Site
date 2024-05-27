<template>
  <q-page class="page_noticias flex justify-center q-pa-md" style="width: 90%">
    <q-splitter
      v-model="splitterModel"
      class="q-my-md"
      :vertical="true"
      :reverse="true"
      style="width: 100%; height: 100%"
    >
      <!-- Barra lateral -->
      <q-page class="q-pa-md" style="width: 250px">
        <q-scroll-area style="height: 100%">
          <q-list padding>
            <q-item
              v-for="(item, index) in items"
              :key="index"
              clickable
              @click="selectItem(item)"
            >
              <q-item-section class="itens">
                <span> <q-icon :name=item.icone style="right: 1px;"/>
                  {{ item.title }} </span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-page>

      <div class="vertical-line"></div>

      <!-- Área de exibição do texto -->
      <q-page style="width: calc(100% - 250px)">
        <q-page-section>
          <template v-if="selectedItem">
          <h4 v-if="selectedItem.title==='Política de Cookies'" class="text-center" >{{ selectedItem.title }}</h4>                    
          <p v-if="selectedItem.title==='Política de Cookies'" class="text-center">{{ selectedItem.text }}</p>
          <img v-if="selectedItem.title==='Política de Cookies'" :src="selectedItem.image" alt="Descrição da imagem" class="minhaIMG"/>
          <div v-if="selectedItem.title==='Política de Privacidade'">
            <h2  class="text-center"><span style="color: rgb(68, 68, 68);">Política Privacidade</span></h2><p>
            É política do TB Koch respeitar a sua privacidade em relação a qualquer informação
            sua que possamos coletar no site <a href="https://site-eight-sigma-32.vercel.app/#/">
            TB Koch</a>, e outros sites que possuímos e operamos.</p><p><span style="color:
            rgb(68, 68, 68);">Solicitamos informações pessoais apenas quando realmente precisamos 
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu 
            conhecimento e consentimento. Também informamos por que estamos coletando e como será
            usado.</span></p><p><span style="color: rgb(68, 68, 68);">Apenas retemos as informações
            coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos
            dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos,
            bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</span></p><p>
            <span style="color: rgb(68, 68, 68);">Não compartilhamos informações de identificação 
            pessoal publicamente ou com terceiros, exceto quando exigido por lei.</span></p><p>
            <span style="color: rgb(68, 68, 68);">O nosso site pode ter links para sites externos 
            que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo
            e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas
            &nbsp;</span><a href="https://politicaprivacidade.com/" rel="noopener noreferrer"
            target="_blank" style="background-color: transparent; color: rgb(68, 68, 68);">
            políticas de privacidade</a><span style="color: rgb(68, 68, 68);">.</span></p><p>
            <span style="color: rgb(68, 68, 68);">Você é livre para recusar a nossa solicitação 
            de informações pessoais, entendendo que talvez não possamos fornecer alguns 
            dos serviços desejados.</span></p><p><span style="color: rgb(68, 68, 68);">O uso
            continuado de nosso site será considerado como aceitação de nossas práticas em torno
            de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos 
            com dados do usuário e informações pessoais, entre em contacto connosco.</span></p><p><span
            style="color: rgb(68, 68, 68);"><ul style="margin-left: 25px;"><li><span style="color: rgb(68, 68, 68);">O serviço 
            Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular
            anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio 
            é exibido para você.</span></li><li><span style="color: rgb(68, 68, 68);">Para mais informações
            sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</span>
            </li><li><span style="color: rgb(68, 68, 68);">Utilizamos anúncios para compensar os custos 
            de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies
            de publicidade comportamental usados por este site foram projetados para garantir que você 
            forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses
            e apresentando coisas semelhantes que possam ser do seu interesse.</span></li><li><span 
            style="color: rgb(68, 68, 68);">Vários parceiros anunciam em nosso nome e os cookies de 
            rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o 
            site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente 
            e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode 
            fornecê-lo para fazer uma compra.</span></li></ul><p><br></p></span></p><h3  class="text-center"><span style="color: 
            rgb(68, 68, 68);">Compromisso do Usuário</span></h3><p><span style="color: rgb(68, 68, 68);">O 
            usuário se compromete a fazer uso adequado dos conteúdos e da informação que o TB Koch oferece 
            no site e com caráter enunciativo, mas não limitativo:</span></p><ul style="margin-left: 25px;"><li><span style="color: 
            rgb(68, 68, 68);">A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a 
            à ordem pública;</span></li><li><span style="color: rgb(68, 68, 68);">B) Não difundir propaganda 
            ou conteúdo de natureza racista, xenofóbica, </span><span style="color: rgb(33, 37, 41);">
            <a href='https://betnacionalbrasil.br.com' style='color:inherit !important; text-decoration: 
            none !important; font-size: inherit !important;'>Bet Nacional</a></span><span style="color: 
            rgb(68, 68, 68);"> ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo 
            ou contra os direitos humanos;</span></li><li><span style="color: rgb(68, 68, 68);">C) 
            Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do TB Koch, 
            de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos 
            ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos 
            anteriormente mencionados.</span></li></ul><h3  class="text-center" style="margin-top: 20px;"><span style="color: rgb(68, 68, 68);">Mais 
            informações</span></h3><p><span style="color: rgb(68, 68, 68);">Esperemos que esteja 
            esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza 
            se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja 
            com um dos recursos que você usa em nosso site.</span></p><p><span style="color: 
            rgb(68, 68, 68);">Esta política é efetiva a partir de&nbsp;20 Maio de 2024 00:00</span></p>
          </div>

          <div v-if="selectedItem.title==='Termos de Uso'">
            <h2><span style="color: rgb(68, 68, 68);">1. Termos</span></h2><p><span style="color: rgb(68, 68, 68);">
            Ao acessar ao site <a href="https://site-eight-sigma-32.vercel.app/#/">TB Koch</a>, concorda em cumprir estes 
            termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas 
            as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este 
            site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </span></p><h2><span style="color: rgb(68, 68, 68);">2. Uso de Licença</span></h2><p><span style="color: rgb(68, 68, 68);
            ">É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site TB Koch , 
            apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de
            título e, sob esta licença, você não pode:&nbsp;</span></p><ol style="margin-left: 25px;"><li><span style="color: rgb(68, 68, 68);">modificar ou 
            copiar os materiais;&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">usar os materiais para qualquer finalidade 
            comercial ou para exibição pública (comercial ou não comercial);&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">
            tentar descompilar ou fazer engenharia reversa de qualquer software contido no site TB Koch;&nbsp;</span></li><li><span 
            style="color: rgb(68, 68, 68);">remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; 
            ou&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">transferir os materiais para outra pessoa ou 'espelhe' os 
            materiais em qualquer outro servidor.</span></li></ol><p><span style="color: rgb(68, 68, 68);">Esta licença será automaticamente 
            rescindida se você violar alguma dessas restrições e poderá ser rescindida por TB Koch a qualquer momento. Ao encerrar a 
            visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse,
            seja em formato eletrónico ou impresso.</span></p><h2><span style="color: rgb(68, 68, 68);">3. Isenção de responsabilidade</span>
            </h2><ol style="margin-left: 25px;"><li><span style="color: rgb(68, 68, 68);">Os materiais no site da TB Koch são fornecidos 'como estão'. TB Koch não 
            oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, 
            garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual 
            ou outra violação de direitos.</span></li><li><span style="color: rgb(68, 68, 68);">Além disso, o TB Koch não garante ou faz 
            qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site 
            ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</span></li></ol><h2><span style="color: 
            rgb(68, 68, 68);">4. Limitações</span></h2><p><span style="color: rgb(68, 68, 68);">Em nenhum caso o TB Koch ou seus fornecedores 
            serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos 
            negócios) decorrentes do uso ou da incapacidade de usar os materiais em TB Koch, mesmo que TB Koch ou um representante autorizado 
            da TB Koch tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem 
            limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações 
            podem não se aplicar a você.</span></p><h2><span style="color: rgb(68, 68, 68);">5. Precisão dos materiais</span></h2><p><span 
            style="color: rgb(68, 68, 68);">Os materiais exibidos no site da TB Koch podem incluir erros técnicos, tipográficos ou fotográficos. 
            TB Koch não garante que qualquer material em seu site seja preciso, completo ou atual. TB Koch pode fazer alterações nos materiais 
            contidos em seu site a qualquer momento, sem aviso prévio. No entanto, TB Koch não se compromete a atualizar os materiais.</span></p>
            <h2><span style="color: rgb(68, 68, 68);">6. Links</span></h2><p><span style="color: rgb(68, 68, 68);">O TB Koch não analisou todos os 
            sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica 
            endosso por TB Koch do site. O uso de qualquer site vinculado é por conta e risco do usuário.</span></p><p><br></p><h3><span 
            style="color:">Modificações</span></h3><p><span style="color: rgb(68, 68, 68);">O TB Koch pode revisar estes termos 
            de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos 
            de serviço.</span></p><h3><span style="color: rgb(68, 68, 68);">Lei aplicável</span></h3><p><span style="color: rgb(68, 68, 68);">Estes 
            termos e condições são regidos e interpretados de acordo com as leis do TB Koch e você se submete irrevogavelmente à jurisdição exclusiva 
            dos tribunais naquele estado ou localidade.</span></p>

          </div>
          </template>
          <p v-else class="text-center">Selecione um item para exibir as informações correspondentes.</p>
        </q-page-section>
      </q-page>
    </q-splitter>
  </q-page>
</template>

<script>
import privacidadeImage from '../assets/privacidade.jpg';
import cookieImage from '../assets/cookie.jpg';
import contratoImage from '../assets/contrato.jpg';

export default {
  data() {
    return {
      splitterModel: [20, 80], 
      selectedItem: null,
      items: [
      { 
        title: 'Política de Privacidade', 
        icone: 'cookie',  
        text: '',
        image: privacidadeImage,
      },
      { 
        title: 'Política de Cookies', 
        icone: 'lock', 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: cookieImage,
      },
      { 
        title: 'Termos de Uso', 
        icone: 'description', 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: contratoImage,
      },
    ],
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style>
p {
  margin-top: 10px;
  text-align: justify;
}
.itens {
  background-color: #EFE2E2; 
  border-radius: 10px; 
  padding: 3px;
}
.para{
  margin-top: 3%; 
  width: 70%;
  margin-left: 14%;
}

.minhaIMG {
  align-items: center;
  border-radius: 20px;
  margin: 0px 20px;
  width: 80%; /* Para tornar a imagem responsiva */
  margin-left: 22%;
  max-width: 500px; /* Ajuste o valor máximo conforme necessário */
  height: auto; /* Para manter a proporção */
}
</style>

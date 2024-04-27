<template>
  <q-footer class="footer-page bg-negative text-white">
    <div class="contact-container">
      <!-- <div class="emergency-contacts">
        <h5>Contatos de Emergência:</h5>
        <ul>
          <li>Contato 1: (xx) xxxx-xxxx</li>
          <li>Contato 2: (xx) xxxx-xxxx</li>
          <li>Contato 3: (xx) xxxx-xxxx</li>
        </ul>
      </div>
      <div class="additional-info">
        <h5>Informações Adicionais:</h5>
        <ul>
          <li>Endereço: Rua XYZ, 123</li>
          <li>Email: contato@tbkoch.com</li>
          <li>Horário de Atendimento: Seg-Sex, 9h-18h</li>
        </ul>
      </div> -->
      <!-- <div class="useful-links">
        <h5>Links Úteis:</h5>
        <ul>
          <li><a href="#">Política de Privacidade</a></li>
          <li><a href="#">Termos de Serviço</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div> -->
      <!-- <div class="social-media">
        <h5>Redes Sociais:</h5>
        <ul>
          <li><a href="#" target="_blank">Facebook</a></li>
          <li><a href="#" target="_blank">Twitter</a></li>
          <li><a href="#" target="_blank">Instagram</a></li>
        </ul>
      </div> -->
    </div>
    <div class="footer-text">
      <a>TB KOCH © 2024</a>
    </div>
  </q-footer>
</template>

<script>
export default {
  name: 'FooterPage',
};
</script>

<style scoped>
  .footer-page {
    border-top: 1px solid #333;
    height: auto; /* Ajuste a altura para auto para acomodar o conteúdo adicional */
    position: absolute;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    display: flex;
    padding: 10px;
  }
  
  .contact-container {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
  }

  .emergency-contacts,
  .additional-info,
  .useful-links,
  .social-media {
    margin-top: 20px;
    text-align: left;
    margin-right: 20px;
  }
  .footer-text {
    margin-top: 20px;
  }
  p, h4, li {
    margin: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  a {
    color: #ffffff;
  }
  a:hover {
    cursor: pointer;
  }
</style>

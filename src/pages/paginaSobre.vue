<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        class="rounded-borders"
      >

        <!-- Novo slide para o tutorial -->
        <q-carousel-slide name="tutorial" class="column no-wrap flex-center">
          <h2 class="name">Tutorial</h2>
          <p class="description">Aqui estão as instruções de como usar o site:</p>
          <ul>
            <li>Passo 1: Entre no nosso site, faça seu cadastro e em seguida efetue o Login.</li>
            <li>Passo 2: Em seguida navegue nas nossas funcionalides,Notícias,Pacientes.</li>
            <li>Passo 3: Dúvidas? Acesse nossa página sobre e desvende do nosso tutorial.</li>
            <li>Passo 4:Por fim, para entrar em contato acesse nossas redes sociais.</li>
          </ul>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            <div class="card-wrapper">
              <div class="card">
                <div class="image-content">
                  <span class="overlay"></span>
                  <div class="card-image">
                    <q-avatar style="width: 100%; height: 100%;">
                      <img src="../assets/paulo.jpg" alt="" class="card-img" />
                    </q-avatar>
                  </div>
                </div>
                <div class="card-content">
                  <h2 class="name">Paulo Henrique</h2>
                  <p class="description">Bacharelando em Sistemas de Informação CSHNB - Picos PI</p>
                  <div class="social-links">
                    <a href="https://www.linkedin.com/in/paulo-henrique-5792ab274" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/linkedin.png" alt="Linkedin" />
                    </a>
                    <a href="https://github.com/PauloHenrique-UFPI" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/github_PNG4.png" alt="GitHub" />
                    </a>
                <a href="mailto:hunter404paulo@gmail.com" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/gmail.png" alt="Gmail" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="image-content">
                  <span class="overlay"></span>
                  <div class="card-image">
                    <q-avatar style="width: 100%; height: 100%;">
                      <img src="../assets/dale.jpg" alt="" class="card-img" />
                    </q-avatar>
                  </div>
                </div>
                <div class="card-content">
                  <h2 class="name">Marcos Dalessandro</h2>
                  <p class="description">Bacharelando em Sistemas de Informação CSHNB - Picos PI</p>
                  <div class="social-links">
                    <a href="https://www.linkedin.com/in/marcos-dalessandro-c-148250191/" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/linkedin.png" alt="Linkedin" />
                    </a>
                    <a href="https://github.com/MarcosDalessandro" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/github_PNG4.png" alt="GitHub" />
                    </a>
                      <a href="mailto:marcosdalessandroclima@ufpi.edu.br"
                      target="_blank" rel="noopener noreferrer">
                      <img src="../assets/gmail.png" alt="Gmail" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="image-content">
                  <span class="overlay"></span>
                  <div class="card-image">
                    <q-avatar style="width: 100%; height: 100%;">
                      <img src="../assets/pedro.jpeg.jpg" alt="" class="card-img" />
                    </q-avatar>
                  </div>
                </div>
                <div class="card-content">
                  <h2 class="name">Pedro Tércio</h2>
                <p class="description">Bacharelando em Sistemas de Informação CSHNB - Picos PI </p>
                  <div class="social-links">
                    <a href="https://www.linkedin.com/in/pedro-t%C4%97rcio-9ba204243/" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/linkedin.png" alt="Linkedin" />
                    </a>
                    <a href="https://github.com/pedrotercio14" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/github_PNG4.png" alt="GitHub" />
                    </a>
                <a href="mailto:pedrotercio30@gmail.com" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/gmail.png" alt="Gmail" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="image-content">
                  <span class="overlay"></span>
                  <div class="card-image">
                    <q-avatar style="width: 100%; height: 100%;">
                      <img src="../assets/dudu.jpeg" alt="" class="card-img" />
                    </q-avatar>
                  </div>
                </div>
                <div class="card-content">
                  <h2 class="name">Eduardo S.</h2>
                <p class="description">Bacharelando em Sistemas de Informação CSHNB - Picos PI </p>
                  <div class="social-links">
                    <a href="https://www.linkedin.com/in/eduardo-de-sousa-3a02a2254" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/linkedin.png" alt="Linkedin" />
                    </a>
                    <a href="https://github.com/eduardosousaa" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/github_PNG4.png" alt="GitHub" />
                    </a>
                <a href="mailto:eduardosousa@ufpi.edu" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/gmail.png" alt="Gmail" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="[

             { label: 'Tutorial', value: 'tutorial' },
             { label: 'Desenvolvedores', value: 'map' }

          ]"
          class="custom-toggle-options"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'paginaSobre',
  setup() {
    return {
      slide: ref('tutorial'),
    };
  },
});
</script>

<style scoped>
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  display: flex;
  height: 380px;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.image-content {
  position: relative;
  width: 50%;
  border-radius: 50%;
  padding-bottom: 50%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  padding: 0;
  transition: opacity 0.3s ease;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
}
.card-img {
  width: 200%;
  height: 80%;
  object-fit: contain;
  object-position: center;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.name {
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
}

.description {
  color: #777;
  margin: 0;
}

.social-links {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.social-links a {
  display: inline-block;
  margin-right: 10px;
}

.social-links img {
  width: 24px;
  height: 24px;
}

.row {
  margin-top: 20px;
}

.q-btn-toggle {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.q-btn-toggle__content {
  padding: 5px;
}

.q-btn-toggle__option {
  min-width: 32px;
  padding: 5px;
}

.q-btn-toggle__label {
  font-size: 12px;
}
.custom-toggle-options .q-btn-toggle__option {
  background-color: red;
}

</style>

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

      <q-carousel-slide name="tutorial" class="custom-carousel-slide column no-wrap flex-center">
          <div class="sobreSite">
            <div class="q-responsive sobre-content">
              <h2 class="nameTitulo text-center">Bem-vindo ao TB KOCH</h2>
              <p class="q-ma-md q-pa-md">
                Seja muito bem vindo, somos um site inovador criado
                com o propósito de auxiliar no diagnóstico precoce
                da tuberculose. Estamos empenhados em transformar
                a abordagem tradicional de identificação desta doença,
                tornando o processo mais eficiente e acessível para todos.
                Nós, da equipe TB KOCH, estamos profundamente comprometidos
                em fazer a diferença na luta contra a tuberculose.
                Acreditamos que, com a ajuda da tecnologia e da inovação,
                podemos mudar o cenário atual  e proporcionar um futuro
                mais saudável para todos.Convidamos você a explorar nosso
                site e descobrir mais sobre nosso projeto, seus benefícios
                e a tecnologia inovadora que impulsiona nosso desenvolvimento.
                Estamos entusiasmados com o impacto positivo que nosso software
                pode ter na luta contra a tuberculose. Agradecemos sua visita
                e interesse nesta iniciativa de grande importância. Junte-se
                a nós na busca por um diagnóstico precoce e eficaz, uma missão
                  que pode salvar inúmeras vidas. Seja parte desta mudança!
              </p>
          </div>
          </div>
          
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <div class="mapBox">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.3814966837945!2d-41.455161424258684!3d-7.081694869418857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x79c1198ef9a45cb%3A0x49d2a4450d1a32ae!2sPAM%3A%20Posto%20de%20Acessoria%20M%C3%A9dica!5e0!3m2!1spt-BR!2sbr!4v1713791843195!5m2!1spt-BR!2sbr"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          toggle-color="red"
          :options="[

              { label: 'Sobre', value: 'tutorial' },
             { label: 'Localização', value: 'map' }

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

.sobre-content {
  font-size: 18px;
  padding: 10px;
}
@media (max-width: 700px) {
  .sobre-content {
    font-size: 10px;
    padding: 0;
  }
}
.sobreSite {
  width: 1000px;
  height: 400px;
}
@media (max-width: 700px) {
  .sobreSite {
    width: 400px;
    height: 400px;
  }
}
@media (max-width: 1200px) {
  .sobre-content {
    font-size: 12px;
    padding: 15px;
  }
}
.mapBox {
  position: relative;
  display: flex;
  width: 600px;
  height: 500px;
  background: #fff;
}
@media (max-width: 700px) {
  .mapBox {
    width: 300px;
    height: 200px;
  }
}
.mapBox iframe {
  width: 100%;
  height: 100%;
}
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.nameTitulo {
  font-size: 25px;
  font-weight: bold;
  margin: 10px 0;
  color: red
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
  font-size: 25px;
  font-weight: bold;
  margin: 10px 0;
}
.nameTitulo {
  font-size: 25px;
  font-weight: bold;
  margin: 10px 0;
  color: red
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

<template>
  <div class="news-page" v-if="noticia">
    <div class="news-container">

        <div class="news-text">
          <p class="news-title">{{ noticia.titulo }}</p>
          <img :src="noticia.img" alt="Imagem da Notícia" class="news-image-item">
          <p v-html="noticia.desc_longa"></p>
          <p class="news-publish-date">Publicado em: {{ formatDatePublish(noticia.created_at) }}</p>
        </div>

    </div>
  </div>
</template>

<script>
import { api } from 'boot/axios';

export default {
  name: 'NoticiaPage',
  data() {
    return {
      noticia: null,
    };
  },
  mounted() {
    this.carregaNoticia(this.$route.params.id);
  },
  methods: {
    formatDate(date) {
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    formatDatePublish(date) {
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    async carregaNoticia(id) {
      const token = localStorage.getItem('token');
      const url = `/noticia/${id}`;
      try {
        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.noticia = response.data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },

  },

};
</script>

<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.news-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  padding: 2%;
}

.news-date {
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
  color: #777;
}
.news-content {
  display: flex;
  align-items: flex-start;
}

.news-image {
  width: 30%;
  display: flex;
  background-color: #f0f0f0;
  padding: 10px;
}

.news-image-item {
  width: 100%;
  align-self: flex-start; /* Adicionado para alinhar a imagem ao início */
}

.news-text {
  width: 70%;
  padding: 20px;
}

.news-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

.news-content-text {
  font-size: 16px;
  text-align: justify;
  margin-bottom: 10px;
}

.news-publish-date {
  font-size: 14px;
  text-align: right;
  color: #777;
}
</style>

import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
data() {
return {
titulo: '',
prefacio: '',
img: null,
descricao: '',
date: ref('2000/00/00'),
loading: false,
persistent: false,
missingFieldsDialog: false,
};
},
setup() {
return {
model: ref(null),
};
},
methods: {
async submitForm(event) {
event.preventDefault();
if (this.titulo && this.prefacio && this.descricao && this.img) {
try {
const token = localStorage.getItem('token');
const formData = new FormData(); // Criar objeto FormData
this.loading = true;

// Adicionar campos ao objeto FormData
formData.append('titulo', this.titulo);
formData.append('img', this.img);
formData.append('desc_curta', this.prefacio);
formData.append('desc_longa', this.descricao);

await api.post('https://api-koch.onrender.com/create-new', formData, {
headers: {
Authorization: `Bearer ${token}`,
'Content-Type': 'multipart/form-data',
},
});

this.$router.push('/home');
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

import { createApp } from 'vue';
import App from './App.vue'; // Import the root component of your Vue project
import Quasar from 'quasar'; // Import Quasar from the installed package

const app = createApp(App);
app.use(Quasar);
app.mount('#app');

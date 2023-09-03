import { createApp } from 'vue';
import app from './app.vue';
import { Quasar } from 'quasar';

const App = createApp(app);
App.use(Quasar, { config: {} });
App.mount('#q-app');

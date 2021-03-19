import { createApp } from 'vue';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import App from './App.vue';

const app = createApp(App);

app.component('BootstrapIcon', BootstrapIcon);

app.mount('#app');

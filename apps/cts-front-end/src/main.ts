import './assets/index.postcss';
import 'vue-final-modal/style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import zhTW from '@kangc/v-md-editor/lib/lang/zh-TW';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import { VueQueryPlugin } from '@tanstack/vue-query';
import MasonryWall from '@yeger/vue-masonry-wall';
import { createVfm } from 'vue-final-modal';
import router from './router';
import App from './App.vue';

const bfmInstance = createVfm();

VMdPreview.use(githubTheme);
VMdEditor.use(githubTheme);
VMdEditor.lang.use('zh-TW', zhTW);

const app = createApp(App);

app.use(bfmInstance);
app.use(MasonryWall);
app.use(VueQueryPlugin);
app.use(VMdPreview);
app.use(VMdEditor);
app.use(router);
app.use(createPinia());
app.mount('#root');

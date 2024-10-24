declare module '*.vue';
declare module '@kangc/v-md-editor/lib/lang/zh-TW';
declare module '@kangc/v-md-editor';
declare module '@kangc/v-md-editor/lib/theme/vuepress';
declare module '@kangc/v-md-editor/lib/preview';
declare module '@kangc/v-md-editor/lib/theme/github';
declare module '*.md' {
	import type { ComponentOptions } from 'vue';

	const Component: ComponentOptions;
	export default Component;
}

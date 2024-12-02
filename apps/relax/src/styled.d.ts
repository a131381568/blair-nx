// src/styled.d.ts
import 'styled-components';
import type { Theme } from './components/styled/theme';

declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}

import 'styled-components';

import { themes } from './index';

type Theme = typeof themes.light;

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
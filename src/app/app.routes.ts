import { provideRouter, RouterConfig } from '@angular/router';

import { FocusComponent } from './board/focus/focus.component';

const routes: RouterConfig = [
  { path: '', component: FocusComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

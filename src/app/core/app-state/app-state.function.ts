import { Observable, BehaviorSubject } from 'rxjs';

import { serviceHandler }   from './service.actions';
import { userHandler }      from './user.actions';
import { AppState }         from './app-state.interface';
import { AppAction }           from './actions';

export function stateFn(initState: AppState, actions: Observable<AppAction>): Observable<AppState> {
  const combines = (s: any) => {
    let appState: AppState = {
      agents: s[0],
      userStates: s[1]
    };
    return appState;
  };
  const appStateObs: Observable<AppState> =
    serviceHandler(initState.agents, actions)
      .zip(
        userHandler(initState.userStates, actions)
      )
      .map(combines);

  return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(initState, obs) {
  const res = new BehaviorSubject(initState);
  obs.subscribe(s => res.next(s));
  return res;
}

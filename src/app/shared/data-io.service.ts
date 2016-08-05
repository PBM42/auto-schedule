import { Injectable, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { Activity } from '../board/shared';
import { DISPATCHER, STATE, action, AppState } from './';

@Injectable()
export class DataIO {

  constructor(
    @Inject(DISPATCHER) private dispatcher: Observer<action>,
    @Inject(STATE) private state: Observable<AppState>
  ) { }

}
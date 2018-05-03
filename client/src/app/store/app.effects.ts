import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {DELETE_TASK_ATTEMPT, DeleteTaskAction, GetTasksAction} from './app.actions';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TodoEffects {

  @Effect() deleteTask: Observable<Action> = this.actions$
    .ofType(DELETE_TASK_ATTEMPT)
    .map(action => (action as DeleteTaskAction).task).switchMap(task => {
      return this.http.delete(`/api/tasks/${task.id}`)
    }).map(() => new GetTasksAction())

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}

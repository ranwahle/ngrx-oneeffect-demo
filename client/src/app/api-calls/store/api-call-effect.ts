import {TimeoutError} from 'rxjs/Rx';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API_CALL_ACTION, ApiCallAction, NotifyErrorAction} from './api-call-action';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiCallEffect {
  @Effect() apiCallEffect: Observable<Action> = this.actions$
    .ofType(API_CALL_ACTION).do((action: ApiCallAction) => {
      (action as any).type =  `${action.type} : ${action.metadata.method} ${action.metadata.url}`;
    }).switchMap((action: ApiCallAction) => {

        return this.processRequest(action)
      }
    ).map((actionResponse: any) => {
      const {action, response} = actionResponse;
      // Check for error response
      if (response instanceof HttpErrorResponse || response instanceof TimeoutError) {
        if (!action.metadata.errorAction) {
          console.error('No errorAction for api call', action, response);
          return new NotifyErrorAction('Error', 'Sorry, an error occurred.');
        }
        return action.metadata.errorAction(response);
      }
      if (action.metadata.successSideActions) {
        this.runSideActions(action.metadata.successSideActions, response);
      }
      return action.metadata.successAction(response);

    });

  private runSideActions(actions: (((result: any) => Action))[], response: any) {
    actions.forEach(sideAction => this.store.dispatch(sideAction(response)));
  }

  processRequest(action: ApiCallAction) {
    const body = action.metadata.requestMapper ? action.metadata.requestMapper(action.data) : action.data;
    action.metadata.method = action.metadata.method || 'get';
    const request = this.http.request(action.metadata.method, action.metadata.url, {
      body: body
    });

    return request.map(response => {
      if (action.metadata.responseMapper) {
        response = action.metadata.responseMapper(response);
      }
      return {action, response};
    }).catch(error => {

      if (!action.metadata.responseMapper && error.status === 200) {
        return Observable.of({action, response: null});
      }
      console.error('error http', error);
      return Observable.of({action, response: error})
    });
  }


  constructor(private store: Store<any>,
              private actions$: Actions,
              private http: HttpClient) {

  }
}

import {Action} from '@ngrx/store';
import {ApiCallMetadata} from '../model/api-call-metadata';

const APP_PREFIX = 'ONE Call Effect';

export const API_CALL_ACTION = `${APP_PREFIX} API Call Action`;
export const NOTIFY_ERROR_ACTION = `${APP_PREFIX} Notify Error Action`;


/**
 * When inherited, holds data regarding API calls in it's metadata
 */
export abstract class ApiCallAction implements Action {
  public readonly type = API_CALL_ACTION;

  protected constructor(public metadata: ApiCallMetadata, public data?: any) {

  }
}


export class NotifyErrorAction implements Action {
  readonly type = NOTIFY_ERROR_ACTION;
  constructor(public title, public message) {

  }
}

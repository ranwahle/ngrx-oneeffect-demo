import {Action} from '@ngrx/store';

export interface ApiCallMetadata {
  /**
   * API url
   */
  url: string;

  /**
   * API method
   */
  method?: 'get' | 'post' | 'put' | 'delete';

  /**
   * Action to launch on success call
   * @param result
   * @returns {Action}
   */
  successAction: (result: any) =>  Action | Action;

  /**
   * Action to launch on error call
   * @param err
   * @returns {Action}
   */
  errorAction?: (err: any) => Action | Action;

  /**
   * Side effect actions to launch upon success
   */
  successSideActions?: ((result: any) =>  Action | Action)[];

  /**
   * Side effect actions to launch upon error
   */
  errorSideActions?: ((err: any) =>  Action | Action)[];

  /**
   * Maps client schema request to the server schema
   * @param clientRequest
   * @returns {any}
   */
  requestMapper?: (clientRequest: any) => any;


  /**
   * Maps server schema response to client schema
   * @param serverResponse
   * @returns {any}
   */
  responseMapper?: (serverResponse: any) => any;


}

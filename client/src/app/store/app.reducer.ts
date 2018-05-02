import {Task} from '../model/task';
import {Action, ActionReducerMap} from '@ngrx/store';
import {GET_TASKS_SUCCESS_ACTION, GetTasksActionSuccess, REMOVE_ERROR} from './app.actions';
import {NOTIFY_ERROR_ACTION} from '../api-calls/store/api-call-action';

export interface State {
  tasks: Task[];
  showError?: boolean;
}


export const reducer: ActionReducerMap<State> = {
  tasks: tasksReducer,
  showError: errorsReducer
};

export function tasksReducer(state: Task[] = [], action: Action): Task[] {
  switch (action.type) {
    case GET_TASKS_SUCCESS_ACTION: {
      return (action as GetTasksActionSuccess).tasks;
    }
    default: {
      return state;
    }
  }
}

export function errorsReducer(state = false, action: Action): boolean {
  switch (action.type) {
    case    NOTIFY_ERROR_ACTION: {
      return true;
    }
    case REMOVE_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
}

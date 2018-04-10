import {Task} from "../model/task";
import {Action, ActionReducerMap} from '@ngrx/store';
import {GET_TASKS_SUCCESS_ACTION, GetTasksActionSuccess} from './app.actions';

export interface State {
  tasks: Task[];
}


export const reducer: ActionReducerMap<State> = {
  tasks: tasksReducer
}

export function tasksReducer(state: Task[] = [], action: Action): Task[] {
  switch (action.type) {
    case GET_TASKS_SUCCESS_ACTION: {
      return (action as GetTasksActionSuccess).tasks
    }
    default: {
      return state;
    }
  }
}

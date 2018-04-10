import {ApiCallAction} from '../api-calls/store/api-call-action';
import {Action} from '@ngrx/store';
import {Task} from '../model/task';

export const GET_TASKS_SUCCESS_ACTION =  `Get Tasks Success`;

export class GetTasksAction extends ApiCallAction {
  constructor() {
    super({
        url: '/api/tasks',
      method: 'get',
      successAction: result => new GetTasksActionSuccess(result)
    })
  }
}

export class AddtaskAction extends ApiCallAction {
  constructor(public task: Task) {
    super({url: `/api/tasks`,
    method: 'post',
      successAction: () => new GetTasksAction()},
      task)
  }
}

export class UpdateTaskAction extends ApiCallAction {
  constructor(public task: Task) {
    super({url: `/api/tasks/${task.id}`,
        method: 'put',
        successAction: () => new GetTasksAction()},
      task)
  }
}

export class GetTasksActionSuccess implements Action{
  readonly type = GET_TASKS_SUCCESS_ACTION;
  constructor(public tasks: Task[]) {

  }
}

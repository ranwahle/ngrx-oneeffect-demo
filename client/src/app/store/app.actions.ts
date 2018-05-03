import {ApiCallAction} from '../api-calls/store/api-call-action';
import {Action} from '@ngrx/store';
import {Task} from '../model/task';

export const GET_TASKS_SUCCESS_ACTION = `Get Tasks Success`;
export const REMOVE_ERROR = 'Remove Errors';
export const DELETE_TASK_ATTEMPT = 'Delete task attempt'

export class GetTasksAction extends ApiCallAction {
  constructor() {
    super({
      url: '/api/tasks',
      method: 'get',
      successSideActions: [() => new RemoveErrorAction()],
      successAction: result => new GetTasksActionSuccess(result),
    });
  }
}

export class RemoveErrorAction implements Action {
  readonly type = REMOVE_ERROR;
}

export class AddTaskAction extends ApiCallAction {
  constructor(public task: Task) {
    super({
        url: `/api/tasks`,
        method: 'post',
        requestMapper: (clientTask: Task) => {
          return {...clientTask, dueDate: new Date()};
        },
        successAction: () => new GetTasksAction()
      },
      task);
  }
}

export class UpdateTaskAction extends ApiCallAction {
  constructor(public task: Task) {
    super({
        url: `/api/tasks/${task.id}`,
        method: 'put',
        successAction: () => new GetTasksAction()
      },
      task);
  }
}
//
// export class DeleteTaskAction implements Action {
//   readonly type = DELETE_TASK_ATTEMPT;
//   constructor(public task: Task) {}
// }

export class DeleteTaskAction extends ApiCallAction {
  constructor(public task: Task) {
    super({
        url: `/api/tasks/${task.id}`,
        method: 'delete',
        successAction: () => new GetTasksAction()
      },
      task);
  }
}


export class GetTasksActionSuccess implements Action {
  readonly type = GET_TASKS_SUCCESS_ACTION;

  constructor(public tasks: Task[]) {

  }
}

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AddTaskAction, DeleteTaskAction, GetTasksAction, UpdateTaskAction} from './store/app.actions';
import {Observable} from 'rxjs/Observable';
import {Task} from 'app/model/task';
import {getTasksSelector, showErrorSelector} from './store/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns = ['id', 'title', 'dueDate', 'edit'];
  title = 'One effct NGRX';
  newTask: Task;
  tasks$: Observable<Task[]>;
  editedTask: Task;
  showError$: Observable<boolean>

  constructor(private store: Store<any>) {
  }

  saveTask(task: Task) {
    if (task.id === undefined) {
      this.store.dispatch(new AddTaskAction(task));
    } else {
      this.store.dispatch(new UpdateTaskAction(task));

    }
  }

  editTask(task: Task) {
    this.editedTask = task;
  }

  deleteTask(task: Task) {
    this.store.dispatch(new DeleteTaskAction(task));
  }

  ngOnInit() {
    this.newTask = {title: '', id: undefined, dueDate: undefined};
    this.tasks$ = this.store.select(getTasksSelector);
    this.showError$ = this.store.select(showErrorSelector);
    this.store.dispatch(new GetTasksAction());

  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../model/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() task: Task;
  @Output() addTask = new EventEmitter<Task>()
  constructor() { }

  ngOnInit() {
  }

  addTaskClicked() {
    this.addTask.emit(this.task);
  }

}

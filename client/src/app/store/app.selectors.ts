import {createFeatureSelector} from '@ngrx/store';
import {Task} from '../model/task';

export const getTasksSelector = createFeatureSelector<Task[]>('tasks');

export const showErrorSelector = createFeatureSelector<boolean>('showError')

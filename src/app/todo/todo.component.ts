import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { TaskModel } from '../model/taskModel';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  toDoTasks :  TaskModel[] =[];
  finishedTasks : TaskModel[] =[];
  updateIndex !: any;
  isEditEnabled : boolean = false;
  constructor(
    private formBuilder : FormBuilder,

  ) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      item : ['',Validators.required]
    })
  }

  addTask(){
    this.toDoTasks.push({
      description : this.todoForm.value.item,
      done : false
    })
    this.todoForm.reset();
  }

  markFinished(item:TaskModel, i:number){
    this.deleteToDoTask(i);
    item.done = true;
    this.finishedTasks.push(item);
  }

  markUnfinished(item:TaskModel, i:number){
    this.deleteFinishedTask(i);
    item.done = false;
    this.toDoTasks.push(item);
  }

  onEdit(item:TaskModel, i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i ;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.toDoTasks[this.updateIndex].description = this.todoForm.value.item;
    this.toDoTasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled =false;
  }

  deleteToDoTask( i : number){
    this.toDoTasks.splice(i,1);
  }

  deleteFinishedTask(i : number){
    this.finishedTasks.splice(i,1);
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

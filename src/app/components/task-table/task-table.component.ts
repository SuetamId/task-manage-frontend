import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task.model';
import { NgClass, NgFor } from '@angular/common';
import { TaskCreateComponent } from '../../pages/task-create/task-create.component';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDeleteComponent } from '../task-delete/task-delete.component';
import { AppService } from '../../services/app.service';


@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [NgFor, NgClass, ReactiveFormsModule],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent implements OnInit {
  tasks!: Task[];
  constructor(private taskService: TaskService, private dialog: MatDialog, private appService: AppService) { }

  ngOnInit(): void {
    this.getTasks();
    this.reloadDatas();
  }

  reloadDatas() {
    this.taskService.reloadData$.subscribe(() => {
      this.getTasks();
    })
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (task: Task[]) => {
        this.tasks = task;
      },
    })
  }

  openTaskModal(task: Task) {
    const dialogRef = this.dialog.open(TaskCreateComponent);
    dialogRef.componentInstance.data = task;
  }

  openDeleteModal(task: Task) {
    const dialogRef = this.dialog.open(TaskDeleteComponent);
    dialogRef.componentInstance.data = task;

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if(!result){
          return;
        }
        this.deleteTask(task);
      }
    })
  }

  deleteTask(task: Task){
    if(task.id){
      this.taskService.delete(task.id).subscribe({
        next: () =>{
          this.appService.openSnackBar('Tarefa excluida com sucesso','fechar');
          this.taskService.refreashTask();
        }
      })
    }
  }
}

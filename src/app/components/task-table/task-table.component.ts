import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../models/task.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent implements OnInit {
  tasks!: Task[];

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.getTasks();
    console.log(this.tasks)
  }

  getTasks(){
    this.taskService.getTasks().subscribe({
      next:(task: Task[]) => {
        this.tasks = task;
      },
    })
  }
}

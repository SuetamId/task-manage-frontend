import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-delete',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './task-delete.component.html',
  styleUrl: './task-delete.component.css'
})
export class TaskDeleteComponent {
@Input() data!: Task;
}

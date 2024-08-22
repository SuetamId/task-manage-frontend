import { Component, Inject, Input, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStatusEnum } from '../../../shared/taskStatus.enum';
import { NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, NgClass],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {
  @Input() data!: Task;
  formTask!: FormGroup;
  status = TaskStatusEnum;

  constructor(private fb: FormBuilder, private taskService: TaskService, private dialog: MatDialog, private appService: AppService) { }

  ngOnInit(): void {
    this.generateForm();
    this.fillOutForm();
  }

  private fillOutForm(){
    if (this.data) {
      this.formTask.patchValue(this.data);
    }
  }

  private generateForm() {
    this.formTask = this.fb.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatusEnum.TODO],
    })
  }

  get id(): number{
    return this.formTask.get('id')?.value;
  }

  getStatusOptions() {
    return Object.entries(TaskStatusEnum).map(([key, value]) => ({
      value: value,
      label: key,
      badgeClass: this.getBadgeClass(value)
    }));
  }

  getBadgeClass(status: string) {
    switch (status) {
      case TaskStatusEnum.TODO:
        return 'bg-blue-100 text-blue-800';
      case TaskStatusEnum.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800';
      case TaskStatusEnum.DONE:
        return 'bg-green-100 text-green-800';
        case TaskStatusEnum.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  }

  saveOrUpdate(){
    this.id ? this.update() : this.save();
  }

  update(){
    this.taskService.udpate(this.id, this.formTask.getRawValue()).subscribe({
      next: () =>{
        this.dialog.closeAll();
        this.taskService.refreashTask();
        this.appService.openSnackBar(`Sua tarefa foi atulizada com sucesso!`, 'Fechar')
      },
      error:(e) =>{
        console.log(e)
      }
    })
  }

  save(){
    this.taskService.save(this.formTask.getRawValue()).subscribe({
      next: (task) =>{
        this.taskService.refreashTask();
        this.dialog.closeAll();
        this.appService.openSnackBar(`Criado tarefa com sucesso!`, 'Fechar')
      },
      error:(e) =>{
        console.log(e)
      }
    })
  }
}

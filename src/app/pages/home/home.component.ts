import { Component } from '@angular/core';
import { TaskTableComponent } from '../../components/task-table/task-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

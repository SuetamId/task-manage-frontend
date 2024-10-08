import { Component, OnInit } from '@angular/core';
import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username!: string | null;
  email!: string | null;

  constructor(private tokenService: TokenService, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getCredencialsInfoFromToken();
  }

  logout(){
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  private getCredencialsInfoFromToken(){
    this.username = this.tokenService.getUsername();
    this.email = this.tokenService.getEmail();
  }

  openTaskModal() {
    const dialogRef = this.dialog.open(TaskCreateComponent);
    dialogRef.componentInstance.data = {}
  }
}

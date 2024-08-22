import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserRoleEnum } from '../../../shared/role.enum';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private appService: AppService){}

  ngOnInit(): void {
    this.generateFormRegister();
  }

  private generateFormRegister(){
    this.formRegister = this.fb.group({
      id:[],
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      role:[UserRoleEnum.USER]
    })
  }

  doRegister(){
    this.authService.register(this.formRegister.getRawValue()).subscribe({
      next: () =>{
        this.appService.openSnackBar(`Usuário cadastrado com sucesso`,'x');
        this.router.navigate(['/login']);
      }
    })
  }
}

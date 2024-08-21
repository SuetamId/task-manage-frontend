import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.generateFormLogin();
  }

  private generateFormLogin(){
    this.formLogin = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }

  private get username(): string{
    return this.formLogin.get('username')?.value;
  }

  private get password(): string{
    return this.formLogin.get('password')?.value;
  }

  login(){
    if(!this.formLogin.valid){
      return;
    }
    this.authService.login(this.username, this.password).subscribe(() => this.router.navigate(['/home']))
  }
}

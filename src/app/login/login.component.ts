import { Component, OnInit } from '@angular/core';
import { AdminService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private data: AdminService) { }

  ngOnInit() {}

  submitForm(form: NgForm){
    this.data.getUser(form.value);
    form.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  public databaseUrl = 'http://localhost:5984/';
  public username = '';
  public password = '';

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

  public login() {
    this.dialogRef.close({databaseUrl: this.databaseUrl, username: this.username, password: this.password});
  }
}

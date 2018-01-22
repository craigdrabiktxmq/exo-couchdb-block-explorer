import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Observable } from 'rxjs/Observable';
import { CouchdbService } from './couchdb.service';

@Injectable()
export class DialogsService {

  private loginSubject: Subject<boolean>;
  public get loginObservable(): Observable<boolean> {
    return this.loginSubject;
  }

  constructor(private dialog: MatDialog, private couchService: CouchdbService) {
    this.loginSubject = new ReplaySubject<boolean>(1);
  }

  public loginDialog(): Observable<any> {
    const subject: Subject<any> = new Subject();
    const dialogRef: MatDialogRef<LoginDialogComponent> = this.dialog.open(
      LoginDialogComponent,
      { width: '400px' }
    );

    dialogRef.afterClosed().subscribe( result => {
      this.couchService.couchDBUrl = result.databaseUrl;
      this.loginSubject.next(true);
      subject.next(result);
      subject.complete();
    });

    return subject;
  }
}

import { Component } from '@angular/core';
import { CouchdbService } from './couchdb.service';
import { DialogsService } from './dialogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(dialogs:DialogsService) {
    dialogs.loginDialog();
   }

}

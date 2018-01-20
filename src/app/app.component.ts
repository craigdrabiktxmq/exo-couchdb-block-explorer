import { Component } from '@angular/core';
import { CouchdbService } from './couchdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public databases: Array<string>;

  constructor(private couchService: CouchdbService) {
    couchService.getDatabases().subscribe(result => this.databases = result);
  }
}

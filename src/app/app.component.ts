import { Component } from '@angular/core';
import { CouchdbService } from './couchdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public databases: Array<string>;
  public selectedDatabase: string;
  public blocks: Array<any>;

  constructor(private couchService: CouchdbService) {
    couchService.getDatabases().subscribe(result => this.databases = result);
  }

  public onDbChanged(event: any): void {
    this.selectedDatabase = event.value;
    this.couchService.currentDatabase = this.selectedDatabase;
    this.couchService.getBlockByPreviousHash('GENESIS_BLOCK')
      .subscribe(result => this.blocks = result.docs);
  }
}

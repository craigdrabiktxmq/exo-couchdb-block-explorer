import { Component, OnInit } from '@angular/core';
import { CouchdbService } from '../couchdb.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  public databases: Array<string>;
  public selectedDatabase: string;

  constructor(private couchService: CouchdbService) {
    couchService.getDatabases().subscribe(result => this.databases = result);
  }


  public onDbChanged(event: any): void {
    this.selectedDatabase = event.value;
    this.couchService.currentDatabase = this.selectedDatabase;
//    this.couchService.getBlocks()
//      .subscribe(result => this.blocks = result);
  }

}

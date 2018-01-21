import { Component, OnInit } from '@angular/core';
import { CouchdbService } from '../couchdb.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  public databases: Array<string>;
  public selectedDatabase: string;

  constructor(  private couchService: CouchdbService,
                private router: Router) {
    couchService.getDatabases().subscribe(result => this.databases = result);
    couchService.currentDatabaseObservable.subscribe(currentDB => this.selectedDatabase = currentDB);
  }


  public onDbChanged(event: any): void {
    this.selectedDatabase = event.value;
    this.couchService.currentDatabase = this.selectedDatabase;
    this.router.navigate(['databases/' + this.selectedDatabase + '/blocks']);
  }

}

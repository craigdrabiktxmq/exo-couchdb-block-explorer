import { Component, OnInit } from '@angular/core';
import { CouchdbService } from '../couchdb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  public databases: Array<string>;
  public selectedDatabase: string;
  public viewBy: string;

  constructor(  private couchService: CouchdbService,
                private filterService: FilterService,
                private router: Router) {

    couchService.getDatabases().subscribe(result => this.databases = result);
    couchService.currentDatabaseObservable.subscribe(currentDB => this.selectedDatabase = currentDB);

    filterService.viewByObservable.subscribe(viewBy => {
      this.viewBy = viewBy;
    });
  }

  public onDbChanged(event: any): void {
    this.selectedDatabase = event.value;
    this.couchService.currentDatabase = this.selectedDatabase;
    if (!this.viewBy) {
      this.viewBy = 'blocks';
    }

    this.router.navigate(['databases/', this.selectedDatabase, this.viewBy]);
  }

  public onViewChanged(event: any): void {
    this.viewBy = event.value;
    if (this.selectedDatabase) {
      this.router.navigate(['databases/', this.selectedDatabase, this.viewBy]);
    }
  }
}

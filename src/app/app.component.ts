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

  public get hasNextPage(): boolean {
    return this.couchService.hasNextPage;
  }

  public get hasPreviousPage(): boolean {
    return this.couchService.hasPreviousPage;
  }

  constructor(private couchService: CouchdbService) {
    couchService.getDatabases().subscribe(result => this.databases = result);
  }

  public onDbChanged(event: any): void {
    this.selectedDatabase = event.value;
    this.couchService.currentDatabase = this.selectedDatabase;
    this.couchService.getBlocks()
      .subscribe(result => this.blocks = result);
  }

  public showBlockByPreviousHash(previousHash: string): void {
    this.couchService.getBlockByPreviousHash(previousHash)
      .subscribe(result => this.blocks = result);
  }

  public showPreviousPage() {
    this.couchService.getPreviousPage().subscribe(result => this.blocks = result);
  }

  public showNextPage() {
    this.couchService.getNextPage().subscribe(result => this.blocks = result);
  }
}

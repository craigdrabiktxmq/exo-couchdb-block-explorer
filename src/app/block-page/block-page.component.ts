import { Component, OnInit } from '@angular/core';
import { CouchdbService } from '../couchdb.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  styleUrls: ['./block-page.component.css']
})
export class BlockPageComponent {

  public blocks: Array<any>;

  public get hasNextPage(): boolean {
    return this.couchService.hasNextPage;
  }

  public get hasPreviousPage(): boolean {
    return this.couchService.hasPreviousPage;
  }

  constructor(private couchService: CouchdbService) {
    couchService.currentDatabaseObservable.subscribe(_ => {
      this.couchService.getBlocks().subscribe(result => this.blocks = result);
    });
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CouchdbService } from '../couchdb.service';
import { FilterService } from '../filter.service';
import { DialogsService } from '../dialogs.service';

@Component({
  selector: 'app-single-block',
  templateUrl: './single-block.component.html',
  styleUrls: ['./single-block.component.css']
})
export class SingleBlockComponent implements OnInit {

  public block: any;

  constructor(  private router: Router,
                private couchService: CouchdbService,
                dialogs: DialogsService,
                filterService: FilterService,
                activatedRoute: ActivatedRoute) {

    filterService.viewBy = 'block';
    dialogs.loginObservable.subscribe(() => {
      activatedRoute.params.subscribe(params => {
        if (params.hasOwnProperty('databaseId')) {
          this.couchService.currentDatabase = params['databaseId'];
        }
      });

      activatedRoute.queryParams.subscribe(params => {
        if (!params.hasOwnProperty('hash') && !params.hasOwnProperty('previousHash')) {
          this.couchService.getBlockByPreviousHash('GENESIS_BLOCK')
            .subscribe(result => this.block = result);
        }

        if (params.hasOwnProperty('hash')) {
          this.couchService.getBlockByHash(params.hash)
            .subscribe(result => this.block = result);
        }

        if (params.hasOwnProperty('previousHash')) {
          this.couchService.getBlockByPreviousHash(params.previousHash)
            .subscribe(result => this.block = result);
        }
      });
    });
  }

  ngOnInit() {
  }

  public showPreviousBlock(): void {
    this.router.navigate(
      ['/databases', this.couchService.currentDatabase, 'block'],
      { queryParams: { hash: this.block.contents.previousBlockHash } }
    );
  }

  public showNextBlock(): void {
    this.router.navigate(
      ['/databases', this.couchService.currentDatabase, 'block'],
      { queryParams: { previousHash: this.block.hash } }
    );

  }
}

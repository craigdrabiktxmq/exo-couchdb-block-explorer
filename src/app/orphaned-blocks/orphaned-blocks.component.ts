import { Component, OnInit } from '@angular/core';
import { CouchdbService } from '../couchdb.service';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../filter.service';
import { DialogsService } from '../dialogs.service';

@Component({
  selector: 'app-orphaned-blocks',
  templateUrl: './orphaned-blocks.component.html',
  styleUrls: ['./orphaned-blocks.component.css']
})
export class OrphanedBlocksComponent implements OnInit {

  public result: any;
  constructor(private couchService: CouchdbService,
              private activatedRoute: ActivatedRoute,
              dialogs: DialogsService,
              filterService: FilterService) {
    filterService.viewBy = 'test';
    dialogs.loginObservable.subscribe(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params.hasOwnProperty('databaseId')) {
          this.couchService.currentDatabase = params['databaseId'];
          this.couchService.testChainIntegrity().subscribe(result => this.result = result );
        }
      });
    });
  }

  ngOnInit() {
  }

}

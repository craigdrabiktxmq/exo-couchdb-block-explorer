import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input()
  public block: any;

  private databaseID: string;

  constructor(private router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      if (params.hasOwnProperty('databaseId')) {
        this.databaseID = params.databaseId;
      }
    });
  }

  ngOnInit() {
  }

  public showBlockByHash(hash: string): void {
    this.router.navigate(['/databases', this.databaseID, 'block'], { queryParams: { hash: hash } });
  }
}

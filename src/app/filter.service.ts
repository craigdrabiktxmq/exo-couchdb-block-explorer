import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FilterService {

  private _viewBy: string;
  public set viewBy(viewBy) {
    this._viewBy = viewBy;
    this._viewByObservable.next(viewBy);
  }

  public get viewBy(): string {
    return this._viewBy;
  }

  private _viewByObservable: Subject<string> = new Subject();
  public get viewByObservable(): Observable<string> {
    return this._viewByObservable;
  }

  constructor() { }

}

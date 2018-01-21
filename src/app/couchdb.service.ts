import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CouchdbService {

  private sortAscending: boolean;
  private pages: Array<number> = [];
  private currentPage = 0;

  public get hasPreviousPage(): boolean {
    return this.currentPage !== 0;
  }

  public get hasNextPage(): boolean {
    return this.currentPage < this.pages.length - 1;
  }

  private _couchDBUrl = 'http://localhost:5984/';
  public get couchDBUrl(): string {
    return this._couchDBUrl;
  }

  public set couchDBUrl(url: string) {
    this._couchDBUrl = url;
    if (this._couchDBUrl.substr(this._couchDBUrl.length - 1, 1) !== '/') {
      this._couchDBUrl += '/';
    }
  }

  private _currentDatabase: string;
  public get currentDatabase(): string {
    return this._currentDatabase;
  }

  public set currentDatabase(databaseName: string) {
    this._currentDatabase = databaseName;
  }


  constructor(private httpClient: HttpClient) { }

  public getDatabases(): Observable<any> {
    return this.httpClient.get(this._couchDBUrl + '_all_dbs');
  }

  private getPageAscendingQuery(): any {
    return {
      'selector': {
        'index': {
          '$gte': this.pages[this.currentPage]
        }
      },
      'sort': [ {'index': 'asc'} ],
      'limit': 6
    };
  }

  private getPageDescendingQuery(): any {
    return {
      'selector': {
        'index': {
          '$lte': this.pages[this.currentPage]
        }
      },
      'sort': [ {'index': 'desc'} ],
      'limit': 6
    };
  }

  private getBlockPage(isNextPage: boolean): Observable<any> {
    const subject: Subject<any> = new Subject();
    const url = this._couchDBUrl + this._currentDatabase + '/_find';
    const query = this.sortAscending ? this.getPageAscendingQuery() : this.getPageAscendingQuery();
    this.httpClient.post(url, query)
      .subscribe((result: any) => {
        if (isNextPage && result.docs.length === 6) {
          this.pages[this.currentPage + 1] = result.docs[5].index;
        }
        subject.next(result.docs.slice(0, 5));
        subject.complete();
      }
    );

    return subject;
  }

  public getBlocks(fromOrigin: boolean = true): Observable<any> {
    this.currentPage = 0;
    if (fromOrigin) {
      this.sortAscending = true;
      this.pages = [0];
    } else {
      this.sortAscending = false;
      this.pages = [Number.MAX_SAFE_INTEGER];
    }
    return this.getBlockPage(true);
  }

  public getNextPage(): Observable<any> {
    this.currentPage += 1;
    return this.getBlockPage(true);
  }

  public getPreviousPage(): Observable<any> {
    this.currentPage -= 1;
    return this.getBlockPage(false);
  }

  /*
  public getBlockByIndex(index: number): Observable<any> {

  }

  public getBlockByHash(hash: string): Observable<any> {

  }
*/
  public getBlockByPreviousHash(previousHash: string): Observable<any> {

    const url = this._couchDBUrl + this._currentDatabase + '/_find';
    return this.httpClient.post( url, {
      selector: {
        'contents.previousBlockHash': {
          '$eq': previousHash
        }
      }
    });
  }

}

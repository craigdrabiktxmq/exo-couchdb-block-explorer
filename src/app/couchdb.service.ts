import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';

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

  private _currentDatabaseObservable: Subject<string> = new Subject();
  public get currentDatabaseObservable(): Observable<string> {
    return this._currentDatabaseObservable;
  }

  private _currentDatabase: string;
  public get currentDatabase(): string {
    return this._currentDatabase;
  }

  public set currentDatabase(databaseName: string) {
    this._currentDatabase = databaseName;
    this._currentDatabaseObservable.next(databaseName);
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
      .subscribe(
        (result: any) => {
          if (isNextPage && result.docs.length === 6) {
            this.pages[this.currentPage + 1] = result.docs[5].index;
          }
          subject.next(result.docs.slice(0, 5));
          subject.complete();
        },
        (error: any) => {
          if (error.error.error === 'no_usable_index') {
            // The index we need hasn't been created yet, so create it
            this.createIndexes().subscribe(result => {
              this.getBlockPage(isNextPage).subscribe(retryResult => {
                subject.next(retryResult);
                subject.complete();
              });
            });
          }
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
    }).pipe(map((result: any) => result.docs[0]));
  }

  public getBlocksByPreviousHash(previousHash: string): Observable<any> {
    const url = this._couchDBUrl + this._currentDatabase + '/_find';
    return this.httpClient.post( url, {
      selector: {
        'contents.previousBlockHash': {
          '$eq': previousHash
        }
      }
    }).pipe(map((result: any) => result.docs));
  }

  public getBlockByHash(hash: string): Observable<any> {
    const url = this._couchDBUrl + this._currentDatabase + '/_find';
    return this.httpClient.post( url, {
      selector: {
        'hash': {
          '$eq': hash
        }
      }
    }).pipe(map((result: any) => result.docs[0]));
  }

  public testChainIntegrity(): Observable<Array<any>> {
    const subject: Subject<any> = new Subject();
    const chain: any = {};
    const forks: Array<string> = [];
    const orphans: Array<string> = [];

    this.testBlock('GENESIS_BLOCK', chain, forks).subscribe(_ => {
      this.currentPage = -1;
      this.sortAscending = true;
      this.pages = [0];
      this.testPageForOrphanedBlocks(chain, orphans).subscribe(() => {
        subject.next({orphans: orphans, forks: forks});
        subject.complete();
      });
    });

    return subject;
  }

  private testBlock(previousBlockHash: string, chain: any, forks: Array<string>): Observable<any> {
    const subject: Subject<any> = new Subject();
    this.getBlocksByPreviousHash(previousBlockHash).subscribe(blocks => {
      if (blocks.length <= 1) {
        const block: any = blocks[0];
        if (block) {
          chain[block.hash] = { hash: block.hash, prevHash: block.contents.previousBlockHash };
          this.testBlock(block.hash, chain, forks).subscribe(_ => {
            subject.next();
            subject.complete();
          });
        } else {
          subject.next();
          subject.complete();
        }
      } else {

      }
    });

    return subject;
  }

  private testPageForOrphanedBlocks(chain: any, orphans: Array<string>): Observable<any> {
    const subject: Subject<any> = new Subject();
    this.getNextPage().subscribe(page => {
      page.forEach(block => {
        if (!chain[block.hash]) {
          orphans.push(block);
        }
      });
      if (page.length === 6) {
        this.testPageForOrphanedBlocks(chain, orphans).subscribe(_ => {
          subject.next();
          subject.complete();
        });
      } else {
        subject.next();
        subject.complete();
      }
    });

    return subject;
  }

  private createIndexes(): Observable<any> {
    const url = this._couchDBUrl + this._currentDatabase + '/_index';
    const observables: Array<Observable<any>> = [];

    let createIndexPayload = {
      'index': {
         'fields': [
            'index'
         ]
      },
      'name': 'blocks-by-index',
      'type': 'json'
    };

    observables.push(this.httpClient.post(url, createIndexPayload));

    createIndexPayload = {
      'index': {
         'fields': [
            'hash'
         ]
      },
      'name': 'blocks-by-hash',
      'type': 'json'
    };

    observables.push(this.httpClient.post(url, createIndexPayload));

    createIndexPayload = {
      'index': {
         'fields': [
            'contents.previousHash'
         ]
      },
      'name': 'blocks-by-previousHash',
      'type': 'json'
    };

    observables.push(this.httpClient.post(url, createIndexPayload));

    return Observable.merge(...observables);
  }
}

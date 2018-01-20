import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CouchdbService {
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

  public getBlocks(): Observable<any> {
    const url = this._couchDBUrl + this._currentDatabase + '/_all_docs';
    const params = new HttpParams();
    params.append('include_docs', 'true');

    return this.httpClient.get(url, { params: params });
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

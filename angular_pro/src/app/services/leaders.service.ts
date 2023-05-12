import { Injectable } from '@angular/core';
import {leader} from '../shared/leader';

import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map ,catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {
 // leaders=LEADERS;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders():Observable<leader[]>{
    return this.http.get<leader[]>(baseURL + 'leaders')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getleader(id: string): Observable<leader>{
    return this.http.get<leader>(baseURL + 'leaders/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedLeader():Observable<leader>{

     return this.http.get<leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]))
     .pipe(catchError(this.processHTTPMsgService.handleError));

  }


}

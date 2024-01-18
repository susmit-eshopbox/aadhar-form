import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AadharInfo } from './aadhar.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private dataUrl = 'assets/db.json'; // URL to web api src\app\api\db.json
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  /** GET heroes from the server */
  getUsers(): Observable<AadharInfo[]> {
    return this.http.get<AadharInfo[]>(this.dataUrl).pipe(
      tap((_) => console.log('fetched Users')),
      catchError(this.handleError<AadharInfo[]>('getUsers', []))
    );
  }
  /** GET unique user from the server */
  getUser(id: number): Observable<AadharInfo> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<AadharInfo>(url).pipe(
      tap((_) => console.log(`fetched user with id ${id}`)),
      catchError(this.handleError<AadharInfo>(`getUser id=${id}`))
    );
  }
  /** GET unique user from the server */
  deleteUser(id: number): Observable<AadharInfo> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.delete<AadharInfo>(url).pipe(
      tap((_) => console.log(`deleted user with id ${id}`)),
      catchError(this.handleError<AadharInfo>(`delete user id=${id}`))
    );
  }

  /** ADd new user to the server */
  addUser(data: AadharInfo): Observable<AadharInfo> {
    return this.http
      .post<AadharInfo>(this.dataUrl, data, this.httpOptions)
      .pipe(
        tap((newUser: AadharInfo) =>
          console.log(`Added new new user with id ${newUser.id}`)
        ),
        catchError(this.handleError<AadharInfo>(`Added user`))
      );
  }

  /** PUT: update the hero on the server */
  updateUser(hero: AadharInfo, id: number): Observable<any> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.put(url, hero, this.httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

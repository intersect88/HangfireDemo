import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Counter } from './counter';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class HeroesService {
  //heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

   /** GET incremented counter from the server */
    getHeroes () {
     return this.http.get<number>(this.baseUrl + 'api/SampleData/GetCounter');
   }

  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   term = term.trim();

  //   // Add safe, URL encoded search parameter if there is a search term
  //   const options = term ?
  //    { params: new HttpParams().set('name', term) } : {};

  //   return this.http.get<Hero[]>(this.heroesUrl, options)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('searchHeroes', []))
  //     );
  // }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
   addHero (hero: Counter): Observable<Counter> {
    //return this.http.post<Hero>(this.heroesUrl, hero, httpOptions);
    return  this.http.put<Counter>(this.baseUrl + '/api/SampleData/counter/', hero, httpOptions);
  }

  // /** DELETE: delete the hero from the server */
  // deleteHero (id: number): Observable<{}> {
  //   const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteHero'))
  //     );
  // }

  // /** PUT: update the hero on the server. Returns the updated hero upon success. */
  // updateHero (hero: Hero): Observable<Hero> {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');

  //   return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateHero', hero))
  //     );
  // }
}

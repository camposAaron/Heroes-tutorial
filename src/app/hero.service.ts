import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import {Observable, of} from 'rxjs';
import { Hero } from './Hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 

          const httpOptions = {
            headers : new HttpHeaders({'Content-Type':'Application/json'})
          };
    }

//get all heroes
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe( 
          tap(heroes => this.log(`fetched heroes`)),
          catchError(this.handleError('getHeroes', []))
        );
  }

  //Get hero by id. will 404 if id not found.
  getHero(id: number):Observable<Hero>{
      const url =`${this.heroesUrl}/${id}`
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero with id: ${id}`)),
        catchError(this.handleError<Hero>(`getHero id= ${id}`))
      );
    }

  /**PUT update a hero on the service*/
  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero).pipe(
      tap((hero:Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero:Hero | number):Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id ; 
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching term = ${term}`)),
      catchError(this.handleError('searchHeroes',[]))
    )
  }
 
  private log(message: string){
    this.messageService.add(`HeroSevice: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T){
    return (error: any):Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return  of(result as T);
    }
  }


}

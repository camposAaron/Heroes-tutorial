import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import {Observable, of} from 'rxjs';
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

/*Definiendo una firma asincrona con observable de la biblioteca rxjs*/
  getHeroes():Observable<Hero[]>{
    //Todo: enviando el mensaje despues de hacer fetching a  los heroes
    this.messageService.add('HeroService: fetched Heroes');
    return of(HEROES);
  }
}

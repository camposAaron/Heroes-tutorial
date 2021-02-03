import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import {HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero:Hero;

   heroes = HEROES;

  constructor() { 
      this.selectedHero =  new Hero();
  }

  onSelectHero(hero: Hero):void{
    this.selectedHero = hero;
  }

  ngOnInit(): void {
  }

}

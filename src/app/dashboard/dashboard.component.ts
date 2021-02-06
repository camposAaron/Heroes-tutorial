import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../Hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes:Hero[];
  hero:Hero;

  constructor(private heroService: HeroService) { 
    this.heroes = [];
    this.hero = new Hero();
  }

  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,6));
  }

  OnSelectedHero(hero:Hero):void{
    this.hero = hero;
  }
  
  ngOnInit(): void {
    this.getHeroes();
  }

}

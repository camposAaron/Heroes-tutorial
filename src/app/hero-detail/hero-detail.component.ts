import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']

})
export class HeroDetailComponent implements OnInit {
  
 hero: Hero;

  
  constructor(private heroService:HeroService,
              private location:Location,
              private route:ActivatedRoute
              ) { 
     this.hero = new Hero();
  }

  getHero():void{
    const id = +this.route.snapshot.paramMap.get('id')!;
     this.heroService.getHero(id).subscribe(result => this.hero = result);
  }

  goBack():void{
    this.location.back();
  }

  save():void{
    this.heroService.updateHero(this.hero).subscribe(()=> this.goBack());
  }

  ngOnInit(): void {
    this.getHero();
  }

}


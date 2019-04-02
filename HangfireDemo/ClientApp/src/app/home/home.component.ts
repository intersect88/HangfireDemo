import { Component, Inject } from '@angular/core';
import { HeroesService } from './home.service';
import { Counter } from './counter';

@Component({
  selector: '',
  templateUrl: './home.component.html',
  providers: [ HeroesService ]
})
export class HomeComponent {
  public counter = 0;
  constructor(private heroesService: HeroesService) {
}

  /** POST: add a new hero to the database */
  incrementCounter() {
    const newHero: Counter = { Value: this.counter };
    this.heroesService.addHero(newHero).subscribe(
      {
        complete: () => {
          this.heroesService.getHeroes().subscribe(
            c => this.counter = c);
        }
      }
    );
  }
}

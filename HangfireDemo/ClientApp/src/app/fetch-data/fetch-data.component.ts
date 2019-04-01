import { Component, Inject } from '@angular/core';
import { HeroesService } from './fetch-data.service';
import { Counter } from './corpo';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [ HeroesService ]
})
export class FetchDataComponent {
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


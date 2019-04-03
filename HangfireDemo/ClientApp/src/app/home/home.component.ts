import { Component, Inject } from '@angular/core';
import { HomeService } from './home.service';
import { Counter } from './counter';

@Component({
  selector: '',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent {
  public counter = 0;
  constructor(private homeService: HomeService) { }
  incrementCounter() {
    const currentCounter: Counter = { Value: this.counter };
    this.homeService.sendCurrentCounter(currentCounter).subscribe(
      {
        complete: () => {
          this.homeService.getIncrementedCounter().subscribe(
            c => this.counter = c);
        }
      }
    );
  }
}

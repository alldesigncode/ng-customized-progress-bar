import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;
  loadingSecond = false;
  loadingThird = false;

  constructor() {}

  ngOnInit() {
    // just for testing that its actually working

    timer(1000).subscribe((_) => (this.loading = true));
    timer(3000).subscribe((_) => (this.loading = false));

    timer(4000).subscribe((_) => (this.loadingSecond = true));
    timer(6000).subscribe((_) => (this.loadingSecond = false));

    timer(7000).subscribe((_) => (this.loadingThird = true));
    timer(9000).subscribe((_) => (this.loadingThird = false));
  }
}

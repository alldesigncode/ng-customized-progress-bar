import {
  Component,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core';

import { gsap } from 'gsap';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnChanges {
  @ViewChild('progress', { static: true }) progress: ElementRef;

  initialValue = 0;
  endValue = 100;
  firstChange: boolean;

  @Input() loading: boolean;
  @Input() showProgress: boolean;
  @Input() barSize: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges({ loading }: { loading: SimpleChange }) {
    this.firstChange = loading.firstChange;
    if (loading.firstChange && !this.loading) {
      return;
    } else {
      if (this.loading !== undefined) {
        if (this.initialValue === this.endValue) {
          this.initialValue = 0;
        }
        this.animateProgress(this.loading);
      }
    }
  }

  setBarSize() {
    return {
      height: `${this.barSize}px`,
    };
  }

  private animateProgress(loading: boolean): void {
    const start = () => {
      let speed = 90;
      if (this.initialValue < this.endValue) {
        if (loading && this.initialValue === 95) {
          return;
        }
        if (!loading) {
          speed = 5;
        }
        this.initialValue++;
        gsap.to(this.progress.nativeElement, {
          width: `${this.initialValue}%`,
        });
        this.cdr.detectChanges();
        setTimeout(start, speed);
      }
    };
    start();
  }
}

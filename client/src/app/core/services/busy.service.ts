import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = signal(0);

  isBusy = signal(false);

  busy() {
    this.busyRequestCount.update(count => count + 1);
    this.isBusy.set(true);
  }

  idle() {
    this.busyRequestCount.update(count => count - 1);

    if (this.busyRequestCount() <= 0) {
      this.busyRequestCount.set(0);
      this.isBusy.set(false);
    }
  }
}
import { Component, inject } from '@angular/core';
import { BusyService } from '../../core/services/busy.service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css'
})
export class Loading {
  busyService = inject(BusyService);
}
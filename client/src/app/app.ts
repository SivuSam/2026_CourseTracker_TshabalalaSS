import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Toast } from './shared/toast/toast';
import { Loading } from './shared/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toast, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
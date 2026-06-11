import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Toast } from './shared/toast/toast';
import { Loading } from './shared/loading/loading';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toast, Loading, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}

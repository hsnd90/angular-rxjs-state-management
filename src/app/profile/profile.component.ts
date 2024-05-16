import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  template: ` <i
    class="fas fa-user-alt icon-size-2x cursor-pointer"
    [routerLink]="'/order'"
  ></i>`,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {}

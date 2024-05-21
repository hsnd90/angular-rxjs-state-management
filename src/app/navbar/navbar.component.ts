import { Component, inject, OnInit } from '@angular/core';
import { BasketStore } from '../stores/basket.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  basketStore: InstanceType<typeof BasketStore> = inject(BasketStore);
  basketSize: number = 0;

  ngOnInit(): void {
    this.basketStore.onChanged$().subscribe((data: any) => {
      this.basketSize = data.value.length;
    });
  }
}

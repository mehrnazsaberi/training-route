import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  filter = signal<any>('');

  product = signal<string>('tablet');
  router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filter.set(params['category']); // Access the 'id' query parameter
    });
    console.log(
      'snapShop=>',
      this.route.snapshot.queryParamMap.get('category')
    );
  }

  onHandleState() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      console.log('message', navigation.extras.state['message']);
    }
  }
}

import { Component } from '@angular/core';
import { AboutHistoryComponent } from './about-history/about-history.component';
import { AboutDetailsComponent } from './about-details/about-details.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutHistoryComponent, AboutDetailsComponent, RouterOutlet],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  title: any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}

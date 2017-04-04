import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'scheduler',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

constructor(private viewContainerRef: ViewContainerRef) {
this.viewContainerRef = viewContainerRef;
}

}

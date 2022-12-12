import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Map', url: '/folder/Inbox', icon: 'map' },
    { title: 'Stations', url: '/folder/Outbox', icon: 'location' },
    { title: 'Account', url: '/folder/Favorites', icon: 'person' },
  ];
  public labels = ['Help', 'About'];
  constructor() {}
}

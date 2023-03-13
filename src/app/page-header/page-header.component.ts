import { Component, EventEmitter, Output } from '@angular/core';
import { LmsApiService } from '../services/lmsapi.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Output() menuClicked = new EventEmitter<boolean>();
  constructor(public api: LmsApiService) {}

  logOut() {
    this.api.deleteToken();
  }
}

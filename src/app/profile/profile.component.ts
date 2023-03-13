import { Component, OnInit } from '@angular/core';
import { LmsApiService } from '../services/lmsapi.service';

export interface TableElement {
  name: string;
  value: string | undefined;
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  dataSource: TableElement[] = [];
  columns: string[] = ['name', 'value'];

  constructor(public api: LmsApiService) {}

  ngOnInit() {
    let user = this.api.getTokenUserInfo();

    this.dataSource = [
      { name: 'Name', value: user?.firstName + ' ' + user?.lastName },
      { name: 'Email', value: user?.email ?? '' },
      { name: 'Mobile', value: user?.mobile },
      { name: 'Department', value: user?.department },
      { name: 'University', value: user?.university },
      { name: 'Blocked', value: this.blockedStatus() },
      { name: 'Active', value: this.activeStatus() },
      { name: 'User Type', value: user?.userType},
      

    ];
  }

  blockedStatus(): string {
    let bloked = this.api.getTokenUserInfo()!.isBlocked;
    return bloked ? 'YES, you are BLOCKED' : 'NO, you are not BLOCKED!';
  }

  activeStatus(): string {
    let active = this.api.getTokenUserInfo()!.isActive;
    return active
      ? 'YES, your account is ACTIVE'
      : 'NO, your account is not ACTIVE!';
  }
}

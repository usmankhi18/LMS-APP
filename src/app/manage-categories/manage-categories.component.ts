import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { LmsApiService } from '../services/lmsapi.service';

@Component({
  selector: 'manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
})
export class ManageCategoriesComponent {
  categoryForm: FormGroup;
  msg: string = '';

  constructor(private fb: FormBuilder, private api: LmsApiService) {
    this.categoryForm = this.fb.group({
      category: fb.control('', [Validators.required]),
    });
  }

  addNewCategory() {
    let c = this.Category.value;
    let user = this.api.getTokenUserInfo();
    let u:number = user?.id!; 

    this.api.insertCategory(c, u).subscribe({
      next: (res: any) => {
        console.log(res);
        this.msg = res.toString();
        setInterval(() => (this.msg = ''), 5000);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  get Category(): FormControl {
    return this.categoryForm.get('category') as FormControl;
  }

  getCategoryErrors() {
    if (this.Category.hasError('required')) return 'Field is requied!';
    return '';
  }
}

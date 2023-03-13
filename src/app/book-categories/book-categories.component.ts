import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from '../models/models';
import { LmsApiService } from '../services/lmsapi.service';

@Component({
  selector: 'book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.scss'],
})
export class BookCategoriesComponent {
  dataSource = new MatTreeNestedDataSource<Category>();
  treeControl = new NestedTreeControl<Category>((node) => node.children);

  constructor(private api: LmsApiService) {
    this.updateCategories();
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;

  updateCategories() {
    this.api.getCategories().subscribe({
      next: (res: any) => (this.dataSource.data = res),
    });
  }
}

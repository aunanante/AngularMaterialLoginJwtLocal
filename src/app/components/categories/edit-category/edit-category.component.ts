import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CategoriesListComponent } from '../categories-list/categories-list.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  commerceId = CategoriesListComponent.commerceId;

  @ViewChild('resetCategoryForm') myNgForm: any;

  categoryForm = this.fb.group({
    categoryName: ['', [Validators.required]],
    commerce: this.fb.group({
      id: ['']
    })

  })

  ngOnInit(): void {
    this.updateBookForm();
  }

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log('commerceId = ', id);
    //console.log('villeId = ', this.villeId);
    this.categoryService.getCategoryById(+id!).subscribe(data => {
      this.categoryForm = this.fb.group({
        categoryName: [data.categoryName, [Validators.required]],
        commerce: this.fb.group({
          id: ['']
        })
      })
    });
  }

  updateBookForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      commerce: this.fb.group({
        id: ['']
      })

    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  updateCategoryForm() {
    this.categoryForm.patchValue({
      
      commerce: {
        id: this.commerceId
      }
    });
    console.log(this.categoryForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.categoryService.updateCategory(+id!, this.categoryForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/categories-list'))
      });
    }
  }

}

import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductsListComponent } from '../products-list/products-list.component';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  categoryId = ProductsListComponent.categoryId;

  @ViewChild('resetProductForm') myNgForm: any;

  productForm = this.fb.group({
    sku: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    unitPrice: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    active: ['', [Validators.required]],
    unitsInStock: ['', [Validators.required]],
    dateCreated: ['', [Validators.required]],
    lastUpdate: ['', [Validators.required]],
    category: this.fb.group({
      id: ['']
    })
  })

  ngOnInit(): void {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private productService: ProductService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log('productId = ',id);
    console.log('categoryId = ',this.categoryId);
    this.productService.getProductById(+id!).subscribe(data => {
      this.productForm = this.fb.group({
        sku: [data.sku, [Validators.required]],
        name: [data.name, [Validators.required]],
        description: [data.description, [Validators.required]],
        unitPrice: [data.unitPrice, [Validators.required]],
        imageUrl: [data.imageUrl, [Validators.required]],
        active: [data.active, [Validators.required]],
        unitsInStock: [data.unitsInStock, [Validators.required]],
        dateCreated: [data.dateCreated, [Validators.required]],
        lastUpdate: [data.lastUpdate, [Validators.required]],
        category: this.fb.group({
          id: ['']
        })
      })
    });
  }

  

  updateProductForm() {
    this.productForm.patchValue({
      
      category: {
        id: this.categoryId
      }
    });
    console.log(this.productForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.productService.updateProduct(+id!, this.productForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/products-list'))
      });
    }
  }

  updateBookForm() {
    this.productForm = this.fb.group({
      sku: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      active: ['', [Validators.required]],
      unitsInStock: ['', [Validators.required]],
      dateCreated: ['', [Validators.required]],
      lastUpdate: ['', [Validators.required]],
      category: this.fb.group({
        id: ['']
      })
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }
}

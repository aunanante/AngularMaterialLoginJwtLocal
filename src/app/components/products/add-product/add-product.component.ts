import { Component, NgZone, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Commerce } from 'src/app/common/commerce';
import { CommerceService } from 'src/app/services/commerce.service';
import { Ville } from 'src/app/common/ville';
import { VilleService } from 'src/app/services/ville.service';
import { CommercesListComponent } from '../../commerces/commerces-list/commerces-list.component';
import { Category } from 'src/app/common/category';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  villes!: Ville[];
  categories!: Category[];

  dataSourceCommerce: MatTableDataSource<Commerce>;
  displayedColumnsCommerce: string[] = ['id', 'commerceName', 'proprietaireName', 'adresse', 'telephone'];
  @ViewChild('TableCommercePaginator', { static: true }) tableCommercePaginator!: MatPaginator;
  @ViewChild('TableCommerceSort', { static: true }) tableCommerceSort!: MatSort;

  
  //static villeId: Number = 1;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  
  @ViewChild('resetProductForm') myNgForm: any;
  @ViewChild('uploadControl') uploadControl!: ElementRef;
  uploadFileName = 'Choose File';

  
  productForm = this.fb.group({
    active: ['', [Validators.required]],
    //active: [true],
    dateCreated: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    lastUpdate: ['', [Validators.required]],
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    unitPrice: ['', [Validators.required]],
    unitsInStock: ['', [Validators.required]],
    category: this.fb.group({
      id: ['']
    })

  })

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private categoryService: CategoryService,
    private commerceService: CommerceService,
    private productService: ProductService,
    private villeService: VilleService) {
    this.dataSourceCommerce = new MatTableDataSource<Commerce>();
  }

  ngOnInit(): void {
    this.listVilles();
    //this.listAllCommerces();
    //this.listCategoriesByCommerceId(1);    
    this.productForm.disable();
    this.dataSourceCommerce.paginator = this.tableCommercePaginator;
    this.dataSourceCommerce.sort = this.tableCommerceSort;
  }

  /* Get errors */
  /* Handle form errors in Angular 8 */
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  submitProductForm() {
    console.log(this.productForm.value)
    if (this.productForm.valid) {
      this.productService.createProduct (this.productForm.value).subscribe(res =>{
        this.ngZone.run(() => this.router.navigateByUrl('/products-list'))
      });
    }else {
      console.log('this.productForm.value non valide')
    }
    this.productForm.disable();
    
    
    
    
  }
  
  listVilles() {
    this.villeService.getAllVilles().subscribe(
      data => {
        //console.log('Liste des Villes =' + JSON.stringify(data));
        this.villes = data;
      }
    )
  }

  listCommerces(arg0: number) {
    this.commerceService.getCommerceByVilleId(arg0).subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCommerce.data = data as Commerce[];
        
      }
    );
  }

  listAllCommerces() {
    this.commerceService.getAllCommerces().subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCommerce.data = data as Commerce[];
        
      }
    );
  }

  listCategoriesByCommerceId(arg0: number) {
    this.categoryService.getCategoryByCommerceId(arg0).subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.categories = data;
        
      }
    );
  }

  applyFilterOne1(filterValue: string) {
    CommercesListComponent.villeId = +filterValue;
    console.log('villeId = ',+filterValue);
    this.listCommerces(+filterValue);
    //this.dataSourceCommerce.filter = filterValue.trim().toLowerCase();    
  }

  applyFilterOne2(filterValue: string) {
    //CommercesListComponent.villeId = +filterValue;
    console.log('categoryId = ',+filterValue);
    this.productForm.patchValue({
      
      category: {
        id: +filterValue
      }
    });
    this.productForm.enable();
  }

  applyFilterOne(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCommerce.filter = filterValue.trim().toLowerCase();
    this.dataSourceCommerce.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCommerce.paginator) {
      this.dataSourceCommerce.paginator.firstPage();
    }
  }

  onRowClicked(row: Commerce) {
    
    console.log(row.id);
    this.listCategoriesByCommerceId(row.id);  
    
  }

  onFileChange(e: any) {

    if (e.target.files && e.target.files[0]) {

      this.uploadFileName = '';
      Array.from(e.target.files).forEach((file: any) => {
        this.uploadFileName += file.name;
      });

      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = res => {

          const imgBase64Path = e.target.result;

        };
      };
      fileReader.readAsDataURL(e.target.files[0]);

      this.uploadControl.nativeElement.value = "";
      console.log(this.uploadFileName)
    } else {
      this.uploadFileName = 'Choose File';
    }
    
  }

  pick_file():void{
    
    console.log(this.uploadFileName)
    
    this.productForm.patchValue({
      
      imageUrl: 'assets/images/'+this.uploadFileName
    });
  }

}

import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  villes!: Ville[];
  categories!: Category[];

  dataSourceCommerce: MatTableDataSource<Commerce>;
  displayedColumnsCommerce: string[] = ['id', 'commerceName', 'proprietaireName', 'adresse', 'telephone'];
  @ViewChild('TableCommercePaginator', { static: true }) tableCommercePaginator!: MatPaginator;
  @ViewChild('TableCommerceSort', { static: true }) tableCommerceSort!: MatSort;

  dataSourceProduct: MatTableDataSource<Product>;
  displayedColumnsProduct: string[] = ['id','name','description','unitPrice','imageUrl', 'action'];
  @ViewChild('TableProductPaginator', { static: true }) tableProductPaginator!: MatPaginator;
  @ViewChild('TableProductSort', { static: true }) tableProductSort!: MatSort;

  
  static categoryId: Number = 1;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private categoryService: CategoryService,
    private commerceService: CommerceService,
    private productService: ProductService,
    private villeService: VilleService) {

    this.dataSourceCommerce = new MatTableDataSource<Commerce>();

    this.dataSourceProduct = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.listVilles();
    /* this.listCommerces(1);
    this.listCategoriesByCommerceId(1);    
    this.listProductsByCategoryId(1);   */
    
    this.dataSourceCommerce.paginator = this.tableCommercePaginator;
    this.dataSourceCommerce.sort = this.tableCommerceSort;

    this.dataSourceProduct.paginator = this.tableProductPaginator;
    this.dataSourceProduct.sort = this.tableProductSort;
  }

  listProductsByCategoryId(arg0: number) {
    this.productService.getProductByCategoryId(arg0).subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceProduct.data = data as Product[];
      }
    );
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

  applyFilterOne2(filterValue: string) {
    ProductsListComponent.categoryId = +filterValue;
    console.log('categoryId = ',+filterValue);
    this.listProductsByCategoryId(+filterValue);
    
  }

  deleteProduct(index: number, e: any){
    if(window.confirm('Are you sure')) {
      const data = this.dataSourceProduct.data;
      data.splice((this.tableProductPaginator.pageIndex * this.tableProductPaginator.pageSize) + index, 1);
      this.dataSourceProduct.data = data;
      this.productService.deleteProduct(e.id).subscribe()
      
    }
  }

}

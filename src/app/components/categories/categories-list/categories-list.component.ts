import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Commerce } from 'src/app/common/commerce';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Ville } from 'src/app/common/ville';
import { CommerceService } from 'src/app/services/commerce.service';
import { VilleService } from 'src/app/services/ville.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/common/category';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  villes!: Ville[];

  dataSourceCommerce: MatTableDataSource<Commerce>;
  displayedColumnsCommerce: string[] = ['id', 'commerceName', 'proprietaireName', 'adresse', 'telephone'];
  @ViewChild('TableCommercePaginator', { static: true }) tableCommercePaginator!: MatPaginator;
  @ViewChild('TableCommerceSort', { static: true }) tableCommerceSort!: MatSort;

  dataSourceCategory: MatTableDataSource<Category>;
  displayedColumnsCategory: string[] = ['id', 'categoryName', 'action'];
  @ViewChild('TableCategoryPaginator', { static: true }) tableCategoryPaginator!: MatPaginator;
  @ViewChild('TableCategorySort', { static: true }) tableCategorySort!: MatSort;

  static commerceId: Number = 1;

  constructor(private categoryService : CategoryService,
    private commerceService: CommerceService,
    private villeService : VilleService) { 
      this.dataSourceCommerce = new MatTableDataSource<Commerce>();
      this.dataSourceCategory = new MatTableDataSource<Category>();
    }

  ngOnInit(): void {
    this.listVilles();
    /* this.listCommerces(1);
    this.listCategories(1); */

    this.dataSourceCommerce.paginator = this.tableCommercePaginator;
    this.dataSourceCommerce.sort = this.tableCommerceSort;

    this.dataSourceCategory.paginator = this.tableCategoryPaginator;
    this.dataSourceCategory.sort = this.tableCategorySort;
  }

  listVilles() {
    this.villeService.getAllVilles().subscribe(
      data => {
        //console.log('Liste des Villes =' + JSON.stringify(data));
        this.villes = data;
      }
    )
  }

  listAllCommerces() {
    this.commerceService.getAllCommerces().subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCommerce.data = data as Commerce[];
        
      }
    );
  }

  listAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCategory.data = data as Category[];
        
      }
    );
  }

  listCommerces(arg0: number) {
    this.commerceService.getCommerceByVilleId(arg0).subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCommerce.data = data as Commerce[];
        
      }
    );
  }

  applyFilterOne1(filterValue: string) {
    //CommercesListComponent.villeId = +filterValue;
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
    CategoriesListComponent.commerceId = row.id
    console.log(row.id);
    this.listCategories(row.id);
  }


  listCategories(id: number) {
    this.categoryService.getCategoryByCommerceId(id).subscribe(
      data => {
        //console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCategory.data = data as Category[];
        
      }
    );
  }

  deleteCategory(index: number, e: any){
    if(window.confirm('Are you sure')) {
      const data = this.dataSourceCategory.data;
      data.splice((this.tableCategoryPaginator.pageIndex * this.tableCategoryPaginator.pageSize) + index, 1);
      this.dataSourceCategory.data = data;
      this.categoryService.deleteCategory(e.id).subscribe()
      
    }
  }

}

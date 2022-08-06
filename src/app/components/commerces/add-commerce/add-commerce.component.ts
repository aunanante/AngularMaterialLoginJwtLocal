import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { VilleService } from 'src/app/services/ville.service';
import { Ville } from 'src/app/common/ville';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-add-commerce',
  templateUrl: './add-commerce.component.html',
  styleUrls: ['./add-commerce.component.css']
})
export class AddCommerceComponent implements OnInit {

  delay = 20;
  villes!: Ville[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('resetStudentForm') myNgForm: any;

  commerceForm = this.fb.group({
    commerceName: ['', [Validators.required]],
    proprietaireName: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required]],


    transfert: ['', [Validators.required]],
    date_transfert: ['', [Validators.required]],
    type_transfert: ['', [Validators.required]],
    payed: ['', [Validators.required]],
    date_peremption: ['', [Validators.required]],
    presentation: ['', [Validators.required]],

    ville: this.fb.group({
      id: ['']
    })
  })

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private villeService: VilleService,
    private commerceService: CommerceService) { }

  ngOnInit(): void {
    this.listVilles();
    this.commerceForm.disable();
  }

  listVilles() {
    this.villeService.getAllVilles().subscribe(
      data => {
        //console.log('Liste des Villes =' + JSON.stringify(data));
        this.villes = data;
      }
    )
  }

  applyFilterOne1(filterValue: string) {
    this.commerceForm.enable();
    console.log(+filterValue);
    //this.commerceForm.controls[].setValue(+filterValue);
    this.commerceForm.patchValue({

      ville: {
        id: +filterValue
      }
    });

  }

  /* Get errors */
  /* Handle form errors in Angular 8 */
  public handleError = (controlName: string, errorName: string) => {
    return this.commerceForm.controls[controlName].hasError(errorName);
  }

  submitCommerceForm() {


    if (this.commerceForm.valid) {
      console.log(this.commerceForm.value);
      this.commerceService.createCommerce(this.commerceForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/commerces-list'))
      });
    }
  }

  calculateValues() {
    // check the fields required to make the calculations to avoid NaN errors
    console.log(this.commerceForm.value.date_transfert);
    if (this.commerceForm.value.date_transfert) {
      // patch the values on the form
      let date: Date = new Date(this.commerceForm.value.date_transfert);
      this.commerceForm.patchValue({
        date_peremption: this.addDays(date, this.delay).toDateString(),
        payed: true,
        presentation: 'En personne',
        type_transfert: 'autre'
      });
    }

  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
  /* 
    set Expiration date 
  edit commerce
  onchange sur date_transfert
  valeur par défaut type transfert
  présentation signification 
  lister les personnes hors abonnement

  <mat-radio-group formControlName="type_transfert" class="margin-left">
                        <mat-radio-button value="mtn"> mtn </mat-radio-button>
                        <mat-radio-button value="orange"> orange </mat-radio-button>
                        <mat-radio-button value="uba"> uba </mat-radio-button>
                        <mat-radio-button value="autre" [checked]="true"> autre </mat-radio-button>
                    </mat-radio-group>
  */
  //définir le champ présentation comme la différence des dates
}

import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { VilleService } from 'src/app/services/ville.service';


@Component({
  selector: 'app-add-ville',
  templateUrl: './add-ville.component.html',
  styleUrls: ['./add-ville.component.css']
})
export class AddVilleComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('resetStudentForm') myNgForm: any;

  villeForm = this.fb.group({
    villeName: ['', [Validators.required]],

  })

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private villeService : VilleService
    ) 
    { }

  ngOnInit(): void {
  }

  /* Get errors */
  /* Handle form errors in Angular 8 */
  public handleError = (controlName: string, errorName: string) => {
    return this.villeForm.controls[controlName].hasError(errorName);
  }

  submitVilleForm() {
    console.log(this.villeForm.value)
    if (this.villeForm.valid) {
      this.villeService.createVille(this.villeForm.value).subscribe(res =>{
        this.ngZone.run(() => this.router.navigateByUrl('/villes-list'))
      });
    }
  }

}

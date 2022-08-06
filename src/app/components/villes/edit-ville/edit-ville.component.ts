import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { VilleService } from 'src/app/services/ville.service';


@Component({
  selector: 'app-edit-ville',
  templateUrl: './edit-ville.component.html',
  styleUrls: ['./edit-ville.component.css']
})
export class EditVilleComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('resetvilleForm') myNgForm: any;

  villeForm = this.fb.group({
    villeName: ['', [Validators.required]],

  })

  ngOnInit(): void {
    this.updateBookForm();
  }

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private villeService: VilleService) 
    { 
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.villeService.getVille(+id!).subscribe(data =>{
        this.villeForm = this.fb.group({
         villeName: [data.villeName, [Validators.required]],
         
        }) 
      })
    }

    /* Reactive book form */
  updateBookForm() {
    this.villeForm = this.fb.group({
      villeName: ['', [Validators.required]]
      
    })
  }

    /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.villeForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateVilleForm() {
    
    console.log(this.villeForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.villeService.updateVille(+id!, this.villeForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/villes-list'))
      });
    }
  }

}

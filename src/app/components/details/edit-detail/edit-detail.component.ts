import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from 'src/app/services/detail.service';
import { DetailsListComponent } from '../details-list/details-list.component';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  productId = DetailsListComponent.productId;

  @ViewChild('resetDetailForm') myNgForm: any;

  detailForm = this.fb.group({
    detailName: ['', [Validators.required]],
    imageDetailUrl: ['', [Validators.required]],
    product: this.fb.group({
      id: ['']
    })
  })

  ngOnInit(): void {
    this.updateDetailForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private detailService: DetailService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.detailService.getDetailById(+id!).subscribe(data => {
      this.detailForm = this.fb.group({
        detailName: [data.detailName, [Validators.required]],
        imageDetailUrl: [data.imageDetailUrl, [Validators.required]],
        product: this.fb.group({
          id: ['']
        })
      })
    });
  }

  updateMyDetailsForm() {
    this.detailForm.patchValue({
      product: {
        id: this.productId
      }
    })
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.detailService.updateDetail(+id!, this.detailForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/details-list'))
      });
    }
  }

  updateDetailForm() {
    this.detailForm = this.fb.group({
      detailName: ['', [Validators.required]],
      imageDetailUrl: ['', [Validators.required]],
      product: this.fb.group({
        id: ['']
      })
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.detailForm.controls[controlName].hasError(errorName);
  }
}

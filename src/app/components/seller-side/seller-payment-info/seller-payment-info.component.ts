import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-payment-info',
  templateUrl: './seller-payment-info.component.html',
  styleUrls: ['./seller-payment-info.component.css']
})
export class SellerPaymentInfoComponent implements OnInit {

  paymentSubscription : Subscription;
  paymentFormData = new FormData();
  upi_id : FormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^[0-9A-za-z]+@[0-9a-zA-Z]+$/)]);
  paymentForm: FormGroup = this.formbuilder.group({
  bank_account_number:['',[Validators.required,
  Validators.minLength(9),
  Validators.maxLength(18),
  Validators.pattern(/^[0-9]+$/)]],
  ifsc_code:['',[Validators.required,
  Validators.pattern(/^[A-Za-z]{4}[0][0-9]{6}$/)]],
});
sellerPaymentId : any;
constructor(private formbuilder: FormBuilder,
  private api : ApiService,
  private cart : CartService,
  private router : Router,
  private toastr : ToastrService,
  private aroute :ActivatedRoute) {
     this.aroute.queryParams.subscribe(query =>{
      this.sellerPaymentId = query['updateMode'];
    })
  }

ngOnInit() {
}
onSubmit(Data: any,is_upi ?: boolean){
  if(is_upi)
  {
  this.paymentFormData.append("upi_id",Data);
  }
  else{
    this.paymentForm['_forEachChild']((control,name)=>{
        this.paymentFormData.append(name.toString(),control.value);
    });
  }
  this.paymentSubscription = this.api.addSellerPaymentInfo(this.paymentFormData,this.sellerPaymentId)
  .subscribe(
    (data) => {
      this.toastr.success("Successfully Updated Payment Info");
      this.router.navigateByUrl(`/seller-side/(sellerRouterOutlet:seller-profile)`);
    },
    (err) => this.toastr.error(err),
  );
}
get bank_account_number(){ return this.paymentForm.get('bank_account_number');}
get ifsc_code(){ return this.paymentForm.get('ifsc_code');}

}

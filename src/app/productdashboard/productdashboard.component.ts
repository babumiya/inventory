import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../sharedServices/api.service';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-productdashboard',
  templateUrl: './productdashboard.component.html',
  styleUrls: ['./productdashboard.component.css']
})
export class ProductdashboardComponent implements OnInit {
  formValue !: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productData : any;
  showAddButton !: boolean;
  showUpdateButton !: boolean;
  constructor(private formBuilder : FormBuilder , private api : ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      productName : ['',Validators.required],
      productDescription : ['',Validators.required],
      productPrice : ['',Validators.required],
      productRating : ['',Validators.required]
    });
    this.getAllProducts();
  }
  addProduct(){
    this.formValue.reset();
    this.showAddButton = true;
    this.showUpdateButton = false;
  }
  postProductDetails(){
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productDescription = this.formValue.value.productDescription;
    this.productModelObj.productPrice = this.formValue.value.productPrice;
    this.productModelObj.productRating = this.formValue.value.productRating;

    this.api.postData(this.productModelObj).subscribe(res=>{
      //console.log(res);
      alert("employee added successfully");
      this.formValue.reset();
      document.getElementById('closeModel')?.click();
      this.getAllProducts();
    },
    error=>{
      //console.log("error occured in the api call")
      alert("error occured")
    })
  }
  getAllProducts(){
    this.api.getData().subscribe(res=>{
      this.productData = res;
    })
  }
  deleteProduct(product:any){
    //console.log(product.id)
    this.api.deleteData(product.id).subscribe(res=>{
      //console.log(res);
      alert("product deleted");
      this.getAllProducts();
    },
    err=>{
      //console.log(err)
      alert("error occured at delet api call")
    })
  }
  onEdit(product:any){
    // product.id
    this.showAddButton = false;
    this.showUpdateButton = true;
    this.productModelObj.id = product.id;
    this.formValue.controls['productName'].setValue(product.productName);
    this.formValue.controls['productDescription'].setValue(product.productDescription);
    this.formValue.controls['productPrice'].setValue(product.productPrice);
    this.formValue.controls['productRating'].setValue(product.productRating);
  }
  updateCall(){

    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productDescription = this.formValue.value.productDescription;
    this.productModelObj.productPrice = this.formValue.value.productPrice;
    this.productModelObj.productRating = this.formValue.value.productRating;

    this.api.updateData(this.productModelObj,this.productModelObj.id).subscribe(res=>{
      //console.log(res);
      alert("employee updated successfully");
      this.formValue.reset();
      document.getElementById('closeModel')?.click();
      this.getAllProducts();
    },
    error=>{
      //console.log("error occured in the update api call")
      alert("error occured")
    })
  }
  onSubmit(){
    console.log(this.formValue.value)
  }

}

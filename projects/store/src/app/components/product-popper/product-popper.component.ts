import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, HostListener } from '@angular/core';
import { environment } from 'projects/environments/environment';

import { FormGroup, FormBuilder, } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { Subproduct, ISubproduct, ICategory } from 'projects/core/models/db';
import { ShopCartItem, IShopCartItem } from 'projects/core/models/shopcart';
import { ShopCartService } from '@core/services/shopcart/shop-cart.service';
import { GET_URL_ASSETS } from 'projects/core/helpers/functions';

@Component({
  selector: 'app-product-popper',
  templateUrl: './product-popper.component.html',
  styleUrls: ['./product-popper.component.scss']
})
export class ProductPopperComponent implements OnInit {
  @Input() category: ICategory | null = null;
  @Input() subproduct: ISubproduct | null = null;

  @Output() destroyPopper: EventEmitter<any> = new EventEmitter();

  public modelAddToCart: ShopCartItem<Subproduct> = new ShopCartItem<Subproduct>();
  public formAddToCart: FormGroup = new FormGroup({});
  public optionsAddToCart: FormlyFormOptions = {};
  public fieldsAddToCart: FormlyFieldConfig[] = [];

  customErrorsUsername = {required: 'This username is required'};
  customErrorsPassword = {required: 'This password is required'};

  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string | null = null;
  error: string = '';
  deviceInfo: any;

  constructor(
    private viewTemplatePopper: ViewContainerRef,
    // private formBuilder: FormBuilder,
    private serviceShopCart: ShopCartService<Subproduct>,
  ) {
    // console.log('ProductPopperComponent.constructor');
  }

  // document:keydown.escape
  @HostListener('document:keydown.escape', ['$event.target']) onKeydownHandler(target: Element) {
    this.onClose();
  }

  ngOnInit(): void {
    // console.log('ProductPopperComponent.constructor', this.subproduct.id, this.subproduct.price, this.subproduct as Subproduct);
    let foundItem = null;
    if (this.subproduct != null) {
      foundItem = this.serviceShopCart.FoundItem(this.subproduct.id ?? 0);
      if (foundItem) {
        const model: ShopCartItem<Subproduct> = {
          Id: this.subproduct.id,
          Price: this.subproduct.price,
          Data: this.subproduct as Subproduct,
          Quantity: foundItem.Quantity,
          Instructions: foundItem.Instructions,
          Total: 0,
        };
        this.modelAddToCart = new ShopCartItem<Subproduct>(model);
        this.fieldsAddToCart = [
          {
            key: 'Instructions', type: 'textarea', className: '',
            templateOptions: { 
              labelClass: 'block tracking-wide text-gray-700 text-xs font-bold mb-2',
              label: 'ADDTOCART.txtInstructions', 
              placeholder: 'Sin pimienta / azucar / sal por favor.', 
              required: false, 
              translate: true, 
              rows: 2, cols: 100,
            }
          },
          {
            key: 'Quantity', type: 'number', className: '', defaultValue: 1,
            templateOptions: {
              labelClass: 'block tracking-wide text-gray-700 text-xs font-bold mb-2',
              label: 'ADDTOCART.txtQuantity', 
              required: true,
              translate: true,
              readOnly: true, min: 1, max: 10,  
            }
          }
        ];
      }
    }
  }

  get productImage(): string {
    const productImage: string | null = (this.subproduct == null || (this.subproduct.image === null || this.subproduct.image === undefined) ? null : this.subproduct.image.trim());
    return GET_URL_ASSETS(productImage);
  }

  get productAlt(): string {
    return `${this.category?.title.trim()}-${this.subproduct?.name.trim()}`;
  }

  onClose() {
    this.destroyPopper.emit();
  }

  onSubmit() {
    this.submitted = true;

    if (this.formAddToCart.invalid){
      return;
    }

    this.loading = true;
    console.log(this);
    this.serviceShopCart.AddItem(this.modelAddToCart);
    // this.viewTemplatePopper.clear();
    this.onClose();
  }
}

import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, HostListener } from '@angular/core';
import { environment } from 'projects/environments/environment';

import { FormGroup, FormBuilder, } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { Subproduct, ISubproduct, ICategory } from 'projects/core/models/db';
import { ShopCartItem, IShopCartItem } from 'projects/core/models/shopcart';
import { ShopCartService } from 'projects/store/src/app/core/services/shopcart/shop-cart.service';

@Component({
  selector: 'app-product-popper',
  templateUrl: './product-popper.component.html',
  styleUrls: ['./product-popper.component.scss']
})
export class ProductPopperComponent implements OnInit {
  @Input() category: ICategory;
  @Input() subproduct: ISubproduct;

  @Output() destroyPopper: EventEmitter<any> = new EventEmitter();

  public modelAddToCart: ShopCartItem<Subproduct> = null;
  public formAddToCart: FormGroup = new FormGroup({});
  public optionsAddToCart: FormlyFormOptions = {};
  public fieldsAddToCart: FormlyFieldConfig[] = [];

  customErrorsUsername = {required: 'This username is required'};
  customErrorsPassword = {required: 'This password is required'};

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private viewTemplatePopper: ViewContainerRef,
    private formBuilder: FormBuilder,
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
    const foundItem = this.serviceShopCart.FoundItem(this.subproduct.id);
    const model: IShopCartItem<Subproduct> = {
      Id: this.subproduct.id,
      Price: this.subproduct.price,
      Data: this.subproduct as Subproduct,
      Quantity: foundItem.Quantity,
      Instructions: foundItem.Instructions,
    };
    this.modelAddToCart = new ShopCartItem<Subproduct>(model as ShopCartItem<Subproduct>);
    this.fieldsAddToCart = [
      {
        key: 'Instructions', type: 'textarea', className: '',
        templateOptions: { label: 'ADDTOCART.txtInstructions', placeholder: 'Sin pimienta / azucar / sal por favor.', rows: 2, cols: 100, required: false, translate: true, labelClass: 'block tracking-wide text-gray-700 text-xs font-bold mb-2', }
      },
      {
        key: 'Quantity', type: 'number', className: '', defaultValue: 1,
        templateOptions: { label: 'ADDTOCART.txtQuantity', required: true, readOnly: true, min: 1, max: 10, translate: true, labelClass: 'block tracking-wide text-gray-700 text-xs font-bold mb-2', }
      }
    ];
  }

  get productImage(): string {
    const product = (this.subproduct.image === null || this.subproduct.image === undefined ? '' : this.subproduct.image.trim());
    return (product ? environment.PATH_ASSETS_IMAGES_MENU.concat(product) : environment.PATH_ASSETS_IMAGES_MENU_LOGO);
  }

  get productAlt(): string {
    return `${this.category.title.trim()}-${this.subproduct.name.trim()}`;
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

import { Component, ViewChild } from '@angular/core';
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {GeocoderAddressComponent} from "@agm/core";
import {Options} from "ngx-google-places-autocomplete/objects/options/options";
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  options: Options = new Options({
    componentRestrictions: {country: 'MY'}
  });
  lat = 28.704060;
  long = 77.102493;
  googleMapType = 'satellite';
  form: FormGroup;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  constructor( private fb: FormBuilder,private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNum: ['', Validators.required],
      address: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    })
  }
  public handleAddressChange(address: Address) {
    // Do some stuff
    var address1 = '';
    var _route = '';
    var postalCode = '';
    var postalCodeSuffix = '';
    var locality = '';
    var state = '';
    var _country = '';
    var placeName = '';
    var portName = '';
   
    for (const component of address.address_components as GeocoderAddressComponent[]) {
      const type = component.types[0];
      console.log(component)
      switch (type) {
        case "street_number": {
            address1 = `${component.long_name}`;
            break;
        }
        case "route": {
            address1 += `${component.short_name}`;
            break;
        }
        case "postal_code": {
            postalCode = `${component.long_name}`;
            break;
        }
        case "postal_code_suffix": {
            postalCode = `${component.long_name}`;
            break;
        }
        case "locality": {
            locality = `${component.long_name}`;
            break
        }
        case "administrative_area_level_1": {
            state = `${component.short_name}`;
            break;
        }
        case "country": {
            _country = `${component.long_name}`;
            break;
        }
    }
      
    }

    this.form.patchValue({
      address: address.name,
      state: state,
      country: _country,
      postcode : postalCode,
      city: locality

  })
    
}

resetForm( x:any ) {
  if (x.target.value == '')
      this.form.patchValue({
        address: '',
        state: '',
        country: '',
        postcode : '',
        city: ''

      })
}

submit() {
  this._snackBar.open('Account Created', 'success');
}

}

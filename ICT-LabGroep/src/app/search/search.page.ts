import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

      validations_form: FormGroup;
      matching_passwords_group: FormGroup;
      country_phone_group: FormGroup;

      countries: Array<CountryPhone>;
      genders: Array<string>;

  constructor(public formBuilder: FormBuilder,
                  private router: Router) { }

  ngOnInit() {
      //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
      // also you can use a library to get all the countries from the world.
      this.countries = [
        new CountryPhone('UY', 'Uruguay'),
        new CountryPhone('US', 'United States'),
        new CountryPhone('BR', 'Brasil')
      ];

      this.genders = [
        "Male",
        "Female"
      ];

      this.matching_passwords_group = new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])),
        confirm_password: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      });

      let country = new FormControl(this.countries[0], Validators.required);
      let phone = new FormControl('', Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ]));
      this.country_phone_group = new FormGroup({
        country: country,
        phone: phone
      });

      this.validations_form = this.formBuilder.group({
        username: new FormControl('', Validators.compose([
          UsernameValidator.validUsername,
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required
        ])),
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        gender: new FormControl(this.genders[0], Validators.required),
        country_phone: this.country_phone_group,
        matching_passwords: this.matching_passwords_group,
        terms: new FormControl(true, Validators.pattern('true'))
      });
  }

}

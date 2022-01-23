import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  accountForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
        fname   : ['Brian'],
        lname   : ['Hughes'],
        city    : ['New York'],
        address : ['Senior Frontend Developer'],
        company : ['YXZ Software'],
        about   : ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
        email   : ['hughes.brian@mail.com', Validators.email],
        phone   : ['121-490-33-12'],
        country : ['usa'],
        language: ['english']
    });
  }

  onSubmit(form: FormGroup): void {
    if(form.invalid) return;

    console.log(form.value);
    
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { AadharInfo } from '../aadhar.model';
import { DataService } from '../data.service';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aadhar-reactive',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class AddharReactiveComponent implements OnInit {
  hero: AadharInfo | undefined;
  profileForm = this.fb.group({
    firstName: [
      'Susmit2',

      [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i),
      ],
    ],
    middleName: [''],
    lastName: [''],
    email: [''],
    mobileNumber: [
      '9940454545400',
      [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
        Validators.minLength(10),
      ],
    ],
    telephoneNumber: [''],
    dob: [''],
    dobProof: [''],
    fatherName: [''],
    address: this.fb.group({
      houseNumber: [''],
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
  });
  url = 'assets/db.json';
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id) {
      this.getUser();
    }
  }

  getUser(): void {
    let a: any = localStorage.getItem('data');
    let data = JSON.parse(a);
    console.log(data);
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    let hero = data.find((d: any) => d.id === id);
    // this.dataService.getUser(id).subscribe((hero: any) => {
    //   this.profileForm.setValue({
    //     firstName: hero.firstName,
    //     middleName: hero.middleName,
    //     lastName: hero.lastName,
    //     email: hero.email,
    //     mobileNumber: hero.mobileNumber,
    //     telephoneNumber: hero.telephoneNumber,
    //     dob: hero.dob,
    //     dobProof: hero.dobProof,
    //     fatherName: hero.fatherName,
    //     address: {
    //       houseNumber: hero.address.houseNumber,
    //       street: hero.address.street,
    //       city: hero.address.city,
    //       state: hero.address.state,
    //       zip: hero.address.zip,
    //     },
    //   });
    // });
    this.profileForm.setValue({
      firstName: hero.firstName,
      middleName: hero.middleName,
      lastName: hero.lastName,
      email: hero.email,
      mobileNumber: hero.mobileNumber,
      telephoneNumber: hero.telephoneNumber,
      dob: hero.dob,
      dobProof: hero.dobProof,
      fatherName: hero.fatherName,
      address: {
        houseNumber: hero.address.houseNumber,
        street: hero.address.street,
        city: hero.address.city,
        state: hero.address.state,
        zip: hero.address.zip,
      },
    });
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
  clearProfile() {
    this.profileForm.setValue({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      telephoneNumber: '',
      dob: '',
      dobProof: '',
      fatherName: '',
      address: {
        houseNumber: '',
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    });
  }

  get firstName() {
    return this.profileForm.get('firstName')!;
  }
  get mobileNumber() {
    return this.profileForm.get('mobileNumber')!;
  }
  onSubmit(form: AadharInfo) {
    console.warn(form);
    let a: any = localStorage.getItem('data');
    let data = JSON.parse(a);
    console.log(data);
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (parseInt(this.route.snapshot.paramMap.get('id')!)) {
      // this.dataService
      //   .updateUser(form, id)
      //   .subscribe((_) => this.router.navigate(['/']));
      let newdata = [...a].map((obj) => (obj.id === id ? form : obj));
      localStorage.setItem('data', JSON.stringify(newdata));
    } else {
      let newData;
      // this.dataService
      //   .addUser(form)
      //   .subscribe((_) => this.router.navigate(['/', 'users']));
      if (data === '') {
        newData = [form];
        console.log(newData);
      } else {
        newData = [...data, form];
      }

      localStorage.setItem('data', JSON.stringify(newData));
      this.clearProfile();
    }
  }
}

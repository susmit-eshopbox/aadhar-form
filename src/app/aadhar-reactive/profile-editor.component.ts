import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  FormRecord,
  NgForm,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { AadharInfo } from '../aadhar.model';
import { DataService } from '../data.service';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.dataService.getUser(id).subscribe((hero: any) => {
      console.log(hero);

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
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (parseInt(this.route.snapshot.paramMap.get('id')!)) {
      this.dataService
        .updateUser(form, id)
        .subscribe((_) => this.router.navigate(['/']));
    } else {
      this.dataService
        .addUser(form)
        .subscribe((_) => this.router.navigate(['/', 'users']));
      this.clearProfile();
    }
  }
}

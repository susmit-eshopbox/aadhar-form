import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  FormRecord,
  NgForm,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';

@Component({
  selector: 'app-aadhar-template',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
})
export class AddharTemplateComponent {
  profileForm = {
    firstName: 'Template-driven',

    middleName: '',
    lastName: '',
    email: '',
    mobileNumber: 87888744494,

    telephoneNumber: '78784449849',
    dob: '04/10/1998',
    dobProof: '',
    fatherName: '',

    houseNumber: '',
    street: '',
    city: '',
    state: '',
    zip: '433443',
  };
  onSubmit(form: NgForm) {
    console.warn(form.value);
  }
}

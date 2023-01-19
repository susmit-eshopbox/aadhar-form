export interface AadharInfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;

  email: string;
  mobileNumber: string;
  telephoneNumber: string;
  dob: string;
  dobProof: string;
  fatherName: string;

  address: house;
}
export interface house {
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

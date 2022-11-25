import * as yup from "yup";
const first_name = yup.string().required("Please enter first name.");
const last_name = yup.string().required("Please enter last name.");
const contactNumber = yup.string().required("Please enter mobile number.");
const dob = yup.date().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required("Please select date of birth.");
const email = yup.string().email("Please enter a valid email address").required("Please enter email.");
const mailing_address_line_1 = yup.string().required("Please enter mailing address.");
const address1 = yup.string().required("Please enter address.");
const city = yup.string().required("Please enter city.");
const state = yup.string().required("Please enter state.");
const pincode = yup.string().required("Please enter postal code.").min(4).max(8);
const countryName = yup.string().required("Please enter country.");
const nationality = yup.string().required("Please enter nationality.");
const passport_id = yup.string().required("Please enter passport number.");
const id_type = yup.string().required("Please enter Id type.");
const id_no = yup.string().required("Please enter passport number.");
const id_issued_date = yup.string().required("Please enter passport issued date.");
const gender = yup.string().required("Please enter gender.");
const marital_status = yup.string().required("Please enter marital status.");
const emergency_contact_person = yup.string().required("Please enter emergency contact.");
const emergency_contact_telephone_number = yup.string().required("Please enter emergency contact number.");
const place_of_id_issued = yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").max(30).required("Please enter place of id issued.");
const passport_expiry_date = yup.date().min(new Date(Date.now() + 15778800000), "Minimum expiry date should be above 6 months from today").required("Please enter passport expiry date.");
const title = yup.string().required("Please enter title.");
const card_type = yup.string().required("Please enter card type.");
const residence_city = yup.string().required("Please enter city of residence");
const residence_countryName = yup.string().required("Please enter country of residence.");
const residence_pincode = yup.string().required("Please enter postal code of residence.").min(4).max(8);
const residence_state = yup.string().required("Please enter state of residence");
const passport_file_signature = yup.string().required("Please select passport bio page");
const passport_file_signature_biopic = yup.string().required("Please select selfie with passport bio page");
const emboss_name=yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed").required("Please enter emboss name.").max(21);


export const applyCardSchema = yup.object({
  residence_pincode,
  residence_countryName,
  residence_city,
  residence_state,
  title,
  first_name,
  last_name,
  contactNumber,
  dob,
  email,
  address1,
 // card_type,
  mailing_address_line_1,
  city,
  pincode,
  countryName,
  nationality,
  passport_file_signature_biopic,
  //  passport_id,
  state,
  id_type,
  id_no,
  id_issued_date,
  gender,
  marital_status,
  emergency_contact_person,
  emergency_contact_telephone_number,
  place_of_id_issued,
  passport_expiry_date,
  passport_file_signature,
  emboss_name
});
export const applyCardSchema2 = yup.object({
  //residence_pincode,
  //residence_countryName,
  //residence_city,
  //residence_state,
  // title,
  first_name,
  last_name,
  contactNumber,
  dob,
  email,
  address1,
  //mailing_address_line_1,
  city,
  pincode,
  countryName,
  nationality,
  passport_id,
  state,
  id_type,
  id_no,
  id_issued_date,
  // gender,
  // marital_status,
  emergency_contact_person,
  emergency_contact_telephone_number,
  place_of_id_issued,


});
export const cardSubmitSchema = yup.object({

})
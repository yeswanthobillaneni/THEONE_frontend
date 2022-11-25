import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Field, Form } from "formik";
import { CardFormInitialValues } from "../../Utils/initialValues";
import TextField from "../../Components/Common/TextField/TextField";
import "./CardForm.scss";
import Button from "../../Components/Common/Button/Button";
import Dropzone from "react-dropzone";
import SignatureCanvas from "react-signature-canvas";
import { URL } from "../../Utils/url";
import { toast } from "react-toastify";
import { applyCardSchema, applyCardSchema2 } from "../../Utils/validations";
import { useNavigate } from "react-router";
import { getCookie } from "../../Utils/cookieHandling";
import axios from "axios";
import qs from "qs";
import { UserRoleContext } from "../../Utils/UserAuthorization";
import moment from 'moment';
import Compress from 'compress.js'
import Passport1 from '../../Sass/img/PassportGuide1.png'
import Passport2 from '../../Sass/img/PassportGuide2.png'
const { useRef, useState, useEffect, useContext } = React;



export default function CardForm() {
  const roleContext = useContext(UserRoleContext);
  const [tickSame, setTickSame] = useState(false);
  const navigate = useNavigate();
  const sigCanvas = useRef({});
  const [imageURL, setImageURL] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [passerr, setpasserr] = useState(true);
  const [passerr2, setpasserr2] = useState(true);
  const clear = () => sigCanvas.current.clear();
  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  const handleDrop = (acceptedFiles) =>
    setFileNames(acceptedFiles.map((file) => file.name));
  const [genderError, setGenderError] = useState(true);
  const [maritalError, setMaritalError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [telPhoneError, setTelPhoneError] = useState(true);
  const [residenceError, setResidenceError] = useState(true);
  const [countryError, setCountryError] = useState(true);
  const [titleError, setTitleError] = useState(true);
  const [cardError, setCardError] = useState(true);
  const compress = new Compress()


  const applyCardHandler = async (formikValues) => {
    save();
    if (roleContext.affiliate && formikValues.partnername != "") {
      const params = {
        partnerName: formikValues.partnername,
        partnerOtc: 1,
        prvOtc: 1,
      };
      axios
        .post(`${URL}/users/createPartner`, params, {
          headers: {
            Authorization: getCookie("token"),
          },
        })
        .then(function (response) {
          console.log(response.data);
          if (response.status === 200) {
            toast.success(response.data.message);
            formControlApiCall(formikValues);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch(function (error) { });
    }

    else {
      formControlApiCall(formikValues);
    }

  };
  const formControlApiCall = (formikValues) => {
    const params = {
      userAddress: getCookie("phantomId"),
      card_type:localStorage.getItem("cardName") ,//formikValues.card_type,
      title: formikValues.title,
      id_type: formikValues.id_type,
      id_no: formikValues.id_no,
      id_issued_date: formikValues.id_issued_date,
      gender: formikValues.gender,
      marital_status: formikValues.marital_status,
      mailing_address_line_1: formikValues.mailing_address_line_1,
      emergency_contact_person: formikValues.emergency_contact_person,
      countryCode: formikValues.countryCode,
      emergencycountryCode: formikValues.emergencycountryCode,
      emergency_contact_telephone_number: parseInt(
        formikValues.emergency_contact_telephone_number
      ),
      place_of_id_issued: formikValues.place_of_id_issued,
      emboss_name:formikValues.emboss_name,
      passport_expiry_date: formikValues.passport_expiry_date,
      first_name: formikValues.first_name,
      last_name: formikValues.last_name,
      card_email: formikValues.email,
      email: formikValues.email,
      dob: formikValues.dob,
      nationality: formikValues.nationality,
      passport_id: formikValues.id_no,
      contactNumber: formikValues.contactNumber,
      countryName: formikValues.countryName,
      address1: formikValues.address1,
      city: formikValues.city,
      state: formikValues.state,
      pincode: formikValues.pincode.toString(),
      img_sign: formikValues.img_sign
        ? formikValues.img_sign
        : sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
      passport_file_signature: formikValues.passport_file_signature,
      residence_city: formikValues.residence_city,
      residence_countryName: formikValues.residence_countryName,
      residence_pincode: formikValues.residence_pincode.toString(),
      residence_state: formikValues.residence_state,
      passport_file_signature_biopic:
        formikValues.passport_file_signature_biopic,
      cardLimit: formikValues.card_type == "Premium Black" ? "30000" :
        formikValues.card_type == "Black Metal" ? "100000" :
          formikValues.card_type == "Silver Metal" ? "120000" :
            formikValues.card_type == "Gold Metal" ? "150000" : "",
    };

    axios
      .put(`${URL}/users/applyForCard`, params, {
        headers: {
          Authorization: getCookie("token"),
        },
      })
      .then(function (response) {
        if (response.data.status === 200) {
          roleContext.updateCardApplied({ card_applied: true });
          accuity_auth(formikValues);
          toast.success(response.data.message);
          
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        alert(error.toString());
        // 
        // 
        toast.success(error);
      });
  }
  // accuity token

  let params1 = qs.stringify({
    grant_type: "client_credentials",
    scope: "EXTERNAL",
  });




  const accuity_auth = (formikValues) => {
    axios
      .post(`${URL}/users/eu/token`, params1).then(function (response) {

        screening(response.data.access_token, formikValues);
        console.log(response.status, "data")
        if (response.status == 200) {

        }
      })
      .catch(function (error) {
         alert(error.toString());
      });
  };
  const screening = (token, formikValues1) => {
    console.log(token, "data")
    axios({
      method: "post",
      headers: {

        "Content-Type": "application/json",
      },
      url: `${URL}/users` + "/eu/import-screening/" + token.replace(/['"]+/g, "") + "/" + getCookie("phantomId"),
      data: {
        profileId: "5f8cea54-5e1b-415f-adf1-bd3cad279db6",
        accountId: 1475,
        datasetId: 2644,
        correlationId: "04102021",
        screeningExpirationDate: "01/10/2021",
        inputRecord: [
          {
            fieldName: "Unique ID",
            fieldValue: (Math.random() + 1).toString(36).substring(2),
          },
          {
            fieldName: "Individual Name",
            fieldValue: formikValues1.first_name + formikValues1.last_name,
          },
          {
            fieldName: "Individual Name (Chinese)",
            fieldValue: "",
          },
          {
            fieldName: "DOB",
            fieldValue: formikValues1.dob,
          },
          {
            fieldName: "Occupation",
            fieldValue: "",
          },
          {
            fieldName: "Gender",
            fieldValue: formikValues1.gender,
          },
          {
            fieldName: "Nationality",
            fieldValue: formikValues1.nationality,
          },
        ],
        config: {
          storeInput: "Y",
          responseType: "FULL",
          entityDetails: "Y",
          showMatchedData: "Y",
        },
      },
    })
      .then(()=>{   
          navigate("/card-activate");
      })
      .catch(function (error) {
        alert(error.toString());
      });
  }

   const checktoWhitelist = () => {
    axios
      .get(`${URL}/admin/cardapplyAndWhitelist/${getCookie('phantomId')}`)
      .then(function (response) {
        if (response.status === 200) {
  
          if(response.data.cardStatus !== null  && response.data.card_type != 0){
                localStorage.setItem('cardStatus', response.data.cardStatus)
                localStorage.setItem('cardName',response.data.card_type )
            }

               if(roleContext.affiliate && roleContext.card_purchase && roleContext.jdbCardNumber1 == null && roleContext.card_status ){
         navigate("/card-process");
         return;
       }
 }
      })
      .catch(function (error) {
        // toast.success(error);
      });
  };

  useEffect(()=>{
    setTimeout(()=>{
      checktoWhitelist()
    },5000)
  },[])


  return (
    <Formik
      initialValues={CardFormInitialValues}
      onSubmit={(formikValues) => applyCardHandler(formikValues)}
      validationSchema={applyCardSchema}
    >
      {(props) => (
        <Form>
          <div className="card-form">
            <div className="container py-4">
              <div className="row justify-content-center">
                <div className="col-md-10 mb-lg-0  pt-4">
                  <h6 className="ms-2 mb-0  h-white headtext mb-3 justify-content-center">
                    Card Application Form
                  </h6>
                  <div className="col-md-12 mb-lg-0 mb-4 pt-4 ">
                    <div
                      className="card z-index-2"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className="card-body d-flex flex-md-cloumn flex-lg-row flex-xs-column flex-sm-column  justify-content-start align-items-center">
                        <h6
                          className="ms-2 mb-0  h-white fnt"
                          style={{ marginRight: "30px" }}
                        >
                          Card Applied
                        </h6>
                        <div className="col-md-4 col-sm-12">
                          <select
                            className="form-control form-control-2"
                            id="exampleFormControlSelect1"
                            disabled
                            value={localStorage.getItem("cardName")}
                            onChange={(e) => {
                              if (e.target.value == "Select Card Type") {
                                props.values.card_type = "";
                                setCardError(true);
                                return;
                              }
                              props.values.card_type = e.target.value;
                              setCardError(false);
                            }}
                          >
                            <option>Select Card Type</option>
                            <option>Premium Black</option>
                            <option>Premium Black UPI</option>
                            <option>Black Metal</option>
                            <option>Silver Metal</option>
                            <option>Gold Metal</option>

                          </select>
                          {/* {props.errors?.card_type && cardError ? (
                            <span className="txt--error">
                              {props.errors?.card_type}
                            </span>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card z-index-2">
                    <div className="card-body p-md-6 p-sm-4  pt-4">
                      <div className="d-flex align-items-center justify-content-between mb--30">
                        <h6 className="ms-2 mb-0  h-white fnt">
                          Personal Details:
                        </h6>
                        <div className="note">
                          Note: All fields are mandatory.
                        </div>
                      </div>
                      <div className="row">
                        <form></form>
                        <div className=" row">
                          <div className="col-md-4 col-sm-12">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Title
                            </label>
                            <select
                              className="form-control form-control-2"
                              id="exampleFormControlSelect1"
                              style={{marginTop:'8px'}}
                              onChange={(e) => {
                                if (e.target.value == "Title") {
                                  props.values.title = "";
                                  setTitleError(true);
                                  return;
                                }
                                props.values.title = e.target.value;
                                setTitleError(false);
                              }}
                            >
                              <option>Title</option>
                              <option>Mr</option>
                              <option>Ms</option>
                            </select>
                            {props.errors?.title && titleError ? (
                              <span className="txt--error">
                                {props.errors?.title}
                              </span>
                            ) : null}
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <label for="Name" className="textlogin">
                              First Name
                            </label>
                            <Field
                              type="text"
                              name="first_name"
                              component={TextField}
                              className={"form-control"}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Last Name
                            </label>
                            <Field
                              type="text"
                              name="last_name"
                              className={"form-control "}
                              component={TextField}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Mobile Number
                            </label>
                            <label></label>
                            <PhoneInput
                              //disableAreaCodes
                              // type="number"
                              country={"sg"}
                              name="contactNumber"  
                              component={TextField}
                              onChange={(e, f) => {
                                if (e == "") {
                                  setPhoneError(true);
                                  return;
                                }
                                setPhoneError(false);
                                console.log(f.length, e.length, e.substring(f.dialCode.length, e.length), f.dialCode)
                                props.values.countryCode = f.dialCode;
                                props.values.contactNumber = e.substring(f.dialCode.length, e.length);
                              }}
                            />
                            {props.errors?.contactNumber && phoneError ? (
                              <span className="txt--error">
                                {props.errors?.contactNumber}
                              </span>
                            ) : null}
                            {/* <Field
                              type="number"
                              name="contactNumber"
                              className={"form-control "}
                              component={TextField}
                              // style={{
                              //   paddingLeft: "40px",
                              // }}
                              // display
                            /> */}
                          </div>

                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Date of Birth
                            </label>
                            <Field
                              type="date"
                              name="dob"
                              className={"form-control"}
                              component={TextField}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Email
                            </label>
                            <Field
                              type="text"
                              name="email"
                              className={"form-control "}
                              component={TextField}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pt-1 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Gender
                            </label>
                            <select
                              className="form-control form-control-2"
                              id="exampleFormControlSelect1"
                              onChange={(e) => {
                                if (e.target.value == "Gender") {
                                  props.values.gender = "";
                                  setGenderError(true);
                                  return;
                                }
                                props.values.gender = e.target.value;
                                setGenderError(false);
                              }}
                            >
                              <option>Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                            {props.errors?.gender && genderError ? (
                              <span className="txt--error">
                                {props.errors?.gender}
                              </span>
                            ) : null}
                          </div>
                          <div className="col-md-4 col-sm-12 pt-1 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Marital Status
                            </label>
                            <select
                              className="form-control form-control-2"
                              id="exampleFormControlSelect1"
                              onChange={(e) => {
                                if (e.target.value == "Marital Status") {
                                  props.values.marital_status = "";
                                  setMaritalError(true);
                                  return;
                                }
                                props.values.marital_status = e.target.value;
                                setMaritalError(false);
                              }}
                            >
                              <option>Marital Status</option>
                              <option>Married</option>
                              <option>Single</option>
                            </select>
                            {props.errors?.marital_status && maritalError ? (
                              <span className="txt--error">
                                {props.errors?.marital_status}
                              </span>
                            ) : null}
                          </div>
                          <div className="col-md-4 col-sm-12 pt-1 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Emergency Contact Person
                            </label>
                            <Field
                              type="text"
                              name="emergency_contact_person"
                              className={"form-control "}
                              component={TextField}
                              style={{marginTop:"-7px"}}

                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pt-1 pb-0 new-relative">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Emergency Telephone Number
                            </label>
                            <PhoneInput
                              //disableAreaCodes
                              // type="number"
                              country={"sg"}
                              name="emergency_contact_telephone_number"
                              
                              component={TextField}
                              required
                              onChange={(e, f) => {
                                if (e == "") {
                                  setTelPhoneError(true);
                                  return;
                                }
                                props.values.emergencycountryCode = f.dialCode;
                                props.values.emergency_contact_telephone_number =
                                  e.substring(f.dialCode.length, e.length);
                                setTelPhoneError(false);
                              }}
                            />
                            {props.errors?.emergency_contact_telephone_number &&
                              telPhoneError ? (
                              <span className="txt--error">
                                {
                                  props.errors
                                    ?.emergency_contact_telephone_number
                                }
                              </span>
                            ) : null}
                            {/* <Field
                              type="number"
                              name="emergency_contact_telephone_number"
                              className={"form-control "}
                              component={TextField}
                              // display
                              // style={{
                              //   paddingLeft: "40px",
                              // }}
                            /> */}
                          </div>
                          <div className="col-md-4 col-sm-12 pt-1 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Passport No
                            </label>
                            <Field
                              type="text"
                              name="id_no"
                              className={"form-control "}
                              component={TextField}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Passport Issued Date
                            </label>
                            <Field
                              type="date"
                              name="id_issued_date"
                              className={
                                "form-control  form-control-3"
                              }
                              component={TextField}
                              max={moment().format("YYYY-MM-DD")}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              ID Type
                            </label>
                            <Field
                              type="text"
                              name="id_type"
                              value={"Passport"}
                              disabled
                              className={
                                "form-control  form-control-3"
                              }
                              component={TextField}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Passport Expiry Date
                            </label>
                            <Field
                              type="date"
                              name="passport_expiry_date"
                              className={
                                "form-control  form-control-3"
                              }
                              component={TextField}
                            />
                          </div>
                          <div className="col-md-4 col-sm-12 pb-0">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Country Of ID Issued
                            </label>
                            <select
                              className="form-control form-control-4"
                              id="exampleFormControlSelect5"
                              onChange={(e) => {
                                if (e.target.value == "Country") {
                                  props.values.place_of_id_issued = "";

                                  return;
                                }
                                props.values.place_of_id_issued =
                                  e.target.value;

                              }}
                              style={{marginTop:"10px"}}
                            >
                              <option>Country</option>
                              <option value="Afghanistan">
                                Afghanistan
                              </option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American Samoa">
                                American Samoa
                              </option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Anguilla">Anguilla</option>
                              <option value="Antartica">Antarctica</option>
                              <option value="Antigua and Barbuda">
                                Antigua and Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bermuda">Bermuda</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bosnia and Herzegowina">
                                Bosnia and Herzegowina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Bouvet Island">
                                Bouvet Island
                              </option>
                              <option value="Brazil">Brazil</option>
                              <option value="British Indian Ocean Territory">
                                British Indian Ocean Territory
                              </option>
                              <option value="Brunei Darussalam">
                                Brunei Darussalam
                              </option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">
                                Burkina Faso
                              </option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Canada">Canada</option>
                              <option value="Cape Verde">Cape Verde</option>
                              <option value="Cayman Islands">
                                Cayman Islands
                              </option>
                              <option value="Central African Republic">
                                Central African Republic
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Christmas Island">
                                Christmas Island
                              </option>
                              <option value="Cocos Islands">
                                Cocos (Keeling) Islands
                              </option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo">Congo</option>
                              <option value="Congo">
                                Congo, the Democratic Republic of the
                              </option>
                              <option value="Cook Islands">
                                Cook Islands
                              </option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Cota D'Ivoire">
                                Cote d'Ivoire
                              </option>
                              <option value="Croatia">
                                Croatia (Hrvatska)
                              </option>
                              <option value="Cuba">Cuba</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">
                                Czech Republic
                              </option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">
                                Dominican Republic
                              </option>
                              <option value="East Timor">East Timor</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">
                                El Salvador
                              </option>
                              <option value="Equatorial Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Falkland Islands">
                                Falkland Islands (Malvinas)
                              </option>
                              <option value="Faroe Islands">
                                Faroe Islands
                              </option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="France Metropolitan">
                                France, Metropolitan
                              </option>
                              <option value="French Guiana">
                                French Guiana
                              </option>
                              <option value="French Polynesia">
                                French Polynesia
                              </option>
                              <option value="French Southern Territories">
                                French Southern Territories
                              </option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Gibraltar">Gibraltar</option>
                              <option value="Greece">Greece</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guadeloupe">Guadeloupe</option>
                              <option value="Guam">Guam</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-Bissau">
                                Guinea-Bissau
                              </option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Heard and McDonald Islands">
                                Heard and Mc Donald Islands
                              </option>
                              <option value="Holy See">
                                Holy See (Vatican City State)
                              </option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran">
                                Iran (Islamic Republic of)
                              </option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Democratic People's Republic of Korea">
                                Korea, Democratic People's Republic of
                              </option>
                              <option value="Korea">
                                Korea, Republic of
                              </option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Lao">
                                Lao People's Democratic Republic
                              </option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libyan Arab Jamahiriya">
                                Libyan Arab Jamahiriya
                              </option>
                              <option value="Liechtenstein">
                                Liechtenstein
                              </option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macau">Macau</option>
                              <option value="Macedonia">
                                Macedonia, The Former Yugoslav Republic of
                              </option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">
                                Marshall Islands
                              </option>
                              <option value="Martinique">Martinique</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mayotte">Mayotte</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Micronesia">
                                Micronesia, Federated States of
                              </option>
                              <option value="Moldova">
                                Moldova, Republic of
                              </option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherlands">
                                Netherlands
                              </option>
                              <option value="Netherlands Antilles">
                                Netherlands Antilles
                              </option>
                              <option value="New Caledonia">
                                New Caledonia
                              </option>
                              <option value="New Zealand">
                                New Zealand
                              </option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Niue">Niue</option>
                              <option value="Norfolk Island">
                                Norfolk Island
                              </option>
                              <option value="Northern Mariana Islands">
                                Northern Mariana Islands
                              </option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">
                                Papua New Guinea
                              </option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Philippines">
                                Philippines
                              </option>
                              <option value="Pitcairn">Pitcairn</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto Rico">
                                Puerto Rico
                              </option>
                              <option value="Qatar">Qatar</option>
                              <option value="Reunion">Reunion</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">
                                Russian Federation
                              </option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Saint Kitts and Nevis">
                                Saint Kitts and Nevis
                              </option>
                              <option value="Saint LUCIA">
                                Saint LUCIA
                              </option>
                              <option value="Saint Vincent">
                                Saint Vincent and the Grenadines
                              </option>
                              <option value="Samoa">Samoa</option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome and Principe">
                                Sao Tome and Principe
                              </option>
                              <option value="Saudi Arabia">
                                Saudi Arabia
                              </option>
                              <option value="Senegal">Senegal</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">
                                Slovakia (Slovak Republic)
                              </option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">
                                South Africa
                              </option>
                              <option value="South Georgia">
                                South Georgia and the South Sandwich Islands
                              </option>
                              <option value="Span">Spain</option>
                              <option value="SriLanka">Sri Lanka</option>
                              <option value="St. Helena">St. Helena</option>
                              <option value="St. Pierre and Miguelon">
                                St. Pierre and Miquelon
                              </option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Svalbard">
                                Svalbard and Jan Mayen Islands
                              </option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">
                                Switzerland
                              </option>
                              <option value="Syria">
                                Syrian Arab Republic
                              </option>
                              <option value="Taiwan">
                                Taiwan, Province of China
                              </option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">
                                Tanzania, United Republic of
                              </option>
                              <option value="Thailand">Thailand</option>
                              <option value="Togo">Togo</option>
                              <option value="Tokelau">Tokelau</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad and Tobago">
                                Trinidad and Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">
                                Turkmenistan
                              </option>
                              <option value="Turks and Caicos">
                                Turks and Caicos Islands
                              </option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Emirates">
                                United Arab Emirates
                              </option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="United States Minor Outlying Islands">
                                United States Minor Outlying Islands
                              </option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Viet Nam</option>
                              <option value="Virgin Islands (British)">
                                Virgin Islands (British)
                              </option>
                              <option value="Virgin Islands (U.S)">
                                Virgin Islands (U.S.)
                              </option>
                              <option value="Wallis and Futana Islands">
                                Wallis and Futuna Islands
                              </option>
                              <option value="Western Sahara">
                                Western Sahara
                              </option>
                              <option value="Yemen">Yemen</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                            {/* <Field
                              type="text"
                              name="place_of_id_issued"
                              className={
                                "form-control  form-control-3"
                              }
                              maxlength="30"
                              component={TextField}
                            /> */}
                          </div>
                            <div className="col-md-4 col-sm-12">
                            <label
                              for="exampleFormControlInput1"
                              className="textlogin"
                            >
                              Emboss Name (Name on Card)
                            </label>
                            <Field
                              type="text"
                              name="emboss_name"
                              className={"form-control "}
                              component={TextField}
                            />
                            <span className="text-red">Do note that retailers may verify your identity with the card embossed name, which may be required to match the name on your identity document eg. passport</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10 mb-lg-0 mb-4 pt-4 ">
                  <div className="card z-index-2">
                    <div className="card-body p-md-6 p-sm-4  pt-4 pb-0">
                      <h6 className="ms-2 mb-0 h-white fnt mb-3">
                        Residential Address
                      </h6>
                      <div className="row justify-content-center ">
                        <div className="col-md-12  p-4 pt-3 mb-0 ">
                          <div className="  ">
                            <div className=" row">
                              <div className="col-md-4 col-sm-12 pb-0">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  Address
                                </label>
                                <Field
                                  type="text"
                                  name="address1"
                                  className={"form-control "}
                                  component={TextField}
                                />
                              </div>
                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  City
                                </label>
                                <Field
                                  type="text"
                                  name="residence_city"
                                  className={"form-control "}
                                  component={TextField}
                                />
                              </div>
                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  State
                                </label>
                                <Field
                                  type="text"
                                  name="residence_state"
                                  className={"form-control "}
                                  component={TextField}
                                />
                              </div>
                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  Postal Code
                                </label>
                                <Field
                                  type="text"
                                  name="residence_pincode"
                                  className={"form-control "}
                                  component={TextField}
                                
                                />
                              </div>

                              <div className="col-md-4 col-sm-12 pt-1 pb-0">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  Country
                                </label>
                                <select
                                  className="form-control form-control-4"
                                  id="exampleFormControlSelect2"
                                  onChange={(e) => {
                                    if (e.target.value == "Country") {
                                      props.values.residence_countryName = "";
                                      setResidenceError(true);
                                      return;
                                    }
                                    props.values.residence_countryName =
                                      e.target.value;
                                    setResidenceError(false);
                                  }}
                                >
                                  <option>Country</option>
                                  <option value="Afghanistan">
                                    Afghanistan
                                  </option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa">
                                    American Samoa
                                  </option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antartica">Antarctica</option>
                                  <option value="Antigua and Barbuda">
                                    Antigua and Barbuda
                                  </option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas">Bahamas</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia">Bolivia</option>
                                  <option value="Bosnia and Herzegowina">
                                    Bosnia and Herzegowina
                                  </option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Bouvet Island">
                                    Bouvet Island
                                  </option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Territory">
                                    British Indian Ocean Territory
                                  </option>
                                  <option value="Brunei Darussalam">
                                    Brunei Darussalam
                                  </option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso">
                                    Burkina Faso
                                  </option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands">
                                    Cayman Islands
                                  </option>
                                  <option value="Central African Republic">
                                    Central African Republic
                                  </option>
                                  <option value="Chad">Chad</option>
                                  <option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island">
                                    Christmas Island
                                  </option>
                                  <option value="Cocos Islands">
                                    Cocos (Keeling) Islands
                                  </option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo">Congo</option>
                                  <option value="Congo">
                                    Congo, the Democratic Republic of the
                                  </option>
                                  <option value="Cook Islands">
                                    Cook Islands
                                  </option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Cota D'Ivoire">
                                    Cote d'Ivoire
                                  </option>
                                  <option value="Croatia">
                                    Croatia (Hrvatska)
                                  </option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic">
                                    Czech Republic
                                  </option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic">
                                    Dominican Republic
                                  </option>
                                  <option value="East Timor">East Timor</option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">
                                    El Salvador
                                  </option>
                                  <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                  </option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Falkland Islands">
                                    Falkland Islands (Malvinas)
                                  </option>
                                  <option value="Faroe Islands">
                                    Faroe Islands
                                  </option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="France Metropolitan">
                                    France, Metropolitan
                                  </option>
                                  <option value="French Guiana">
                                    French Guiana
                                  </option>
                                  <option value="French Polynesia">
                                    French Polynesia
                                  </option>
                                  <option value="French Southern Territories">
                                    French Southern Territories
                                  </option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia">Gambia</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guinea-Bissau">
                                    Guinea-Bissau
                                  </option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Heard and McDonald Islands">
                                    Heard and Mc Donald Islands
                                  </option>
                                  <option value="Holy See">
                                    Holy See (Vatican City State)
                                  </option>
                                  <option value="Honduras">Honduras</option>
                                  <option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option>
                                  <option value="Iceland">Iceland</option>
                                  <option value="India">India</option>
                                  <option value="Indonesia">Indonesia</option>
                                  <option value="Iran">
                                    Iran (Islamic Republic of)
                                  </option>
                                  <option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Democratic People's Republic of Korea">
                                    Korea, Democratic People's Republic of
                                  </option>
                                  <option value="Korea">
                                    Korea, Republic of
                                  </option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Lao">
                                    Lao People's Democratic Republic
                                  </option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option>
                                  <option value="Lesotho">Lesotho</option>
                                  <option value="Liberia">Liberia</option>
                                  <option value="Libyan Arab Jamahiriya">
                                    Libyan Arab Jamahiriya
                                  </option>
                                  <option value="Liechtenstein">
                                    Liechtenstein
                                  </option>
                                  <option value="Lithuania">Lithuania</option>
                                  <option value="Luxembourg">Luxembourg</option>
                                  <option value="Macau">Macau</option>
                                  <option value="Macedonia">
                                    Macedonia, The Former Yugoslav Republic of
                                  </option>
                                  <option value="Madagascar">Madagascar</option>
                                  <option value="Malawi">Malawi</option>
                                  <option value="Malaysia">Malaysia</option>
                                  <option value="Maldives">Maldives</option>
                                  <option value="Mali">Mali</option>
                                  <option value="Malta">Malta</option>
                                  <option value="Marshall Islands">
                                    Marshall Islands
                                  </option>
                                  <option value="Martinique">Martinique</option>
                                  <option value="Mauritania">Mauritania</option>
                                  <option value="Mauritius">Mauritius</option>
                                  <option value="Mayotte">Mayotte</option>
                                  <option value="Mexico">Mexico</option>
                                  <option value="Micronesia">
                                    Micronesia, Federated States of
                                  </option>
                                  <option value="Moldova">
                                    Moldova, Republic of
                                  </option>
                                  <option value="Monaco">Monaco</option>
                                  <option value="Mongolia">Mongolia</option>
                                  <option value="Montserrat">Montserrat</option>
                                  <option value="Morocco">Morocco</option>
                                  <option value="Mozambique">Mozambique</option>
                                  <option value="Myanmar">Myanmar</option>
                                  <option value="Namibia">Namibia</option>
                                  <option value="Nauru">Nauru</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Netherlands">
                                    Netherlands
                                  </option>
                                  <option value="Netherlands Antilles">
                                    Netherlands Antilles
                                  </option>
                                  <option value="New Caledonia">
                                    New Caledonia
                                  </option>
                                  <option value="New Zealand">
                                    New Zealand
                                  </option>
                                  <option value="Nicaragua">Nicaragua</option>
                                  <option value="Niger">Niger</option>
                                  <option value="Nigeria">Nigeria</option>
                                  <option value="Niue">Niue</option>
                                  <option value="Norfolk Island">
                                    Norfolk Island
                                  </option>
                                  <option value="Northern Mariana Islands">
                                    Northern Mariana Islands
                                  </option>
                                  <option value="Norway">Norway</option>
                                  <option value="Oman">Oman</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Palau">Palau</option>
                                  <option value="Panama">Panama</option>
                                  <option value="Papua New Guinea">
                                    Papua New Guinea
                                  </option>
                                  <option value="Paraguay">Paraguay</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Philippines">
                                    Philippines
                                  </option>
                                  <option value="Pitcairn">Pitcairn</option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">
                                    Puerto Rico
                                  </option>
                                  <option value="Qatar">Qatar</option>
                                  <option value="Reunion">Reunion</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Russia">
                                    Russian Federation
                                  </option>
                                  <option value="Rwanda">Rwanda</option>
                                  <option value="Saint Kitts and Nevis">
                                    Saint Kitts and Nevis
                                  </option>
                                  <option value="Saint LUCIA">
                                    Saint LUCIA
                                  </option>
                                  <option value="Saint Vincent">
                                    Saint Vincent and the Grenadines
                                  </option>
                                  <option value="Samoa">Samoa</option>
                                  <option value="San Marino">San Marino</option>
                                  <option value="Sao Tome and Principe">
                                    Sao Tome and Principe
                                  </option>
                                  <option value="Saudi Arabia">
                                    Saudi Arabia
                                  </option>
                                  <option value="Senegal">Senegal</option>
                                  <option value="Seychelles">Seychelles</option>
                                  <option value="Sierra">Sierra Leone</option>
                                  <option value="Singapore">Singapore</option>
                                  <option value="Slovakia">
                                    Slovakia (Slovak Republic)
                                  </option>
                                  <option value="Slovenia">Slovenia</option>
                                  <option value="Solomon Islands">
                                    Solomon Islands
                                  </option>
                                  <option value="Somalia">Somalia</option>
                                  <option value="South Africa">
                                    South Africa
                                  </option>
                                  <option value="South Georgia">
                                    South Georgia and the South Sandwich Islands
                                  </option>
                                  <option value="Span">Spain</option>
                                  <option value="SriLanka">Sri Lanka</option>
                                  <option value="St. Helena">St. Helena</option>
                                  <option value="St. Pierre and Miguelon">
                                    St. Pierre and Miquelon
                                  </option>
                                  <option value="Sudan">Sudan</option>
                                  <option value="Suriname">Suriname</option>
                                  <option value="Svalbard">
                                    Svalbard and Jan Mayen Islands
                                  </option>
                                  <option value="Swaziland">Swaziland</option>
                                  <option value="Sweden">Sweden</option>
                                  <option value="Switzerland">
                                    Switzerland
                                  </option>
                                  <option value="Syria">
                                    Syrian Arab Republic
                                  </option>
                                  <option value="Taiwan">
                                    Taiwan, Province of China
                                  </option>
                                  <option value="Tajikistan">Tajikistan</option>
                                  <option value="Tanzania">
                                    Tanzania, United Republic of
                                  </option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Togo">Togo</option>
                                  <option value="Tokelau">Tokelau</option>
                                  <option value="Tonga">Tonga</option>
                                  <option value="Trinidad and Tobago">
                                    Trinidad and Tobago
                                  </option>
                                  <option value="Tunisia">Tunisia</option>
                                  <option value="Turkey">Turkey</option>
                                  <option value="Turkmenistan">
                                    Turkmenistan
                                  </option>
                                  <option value="Turks and Caicos">
                                    Turks and Caicos Islands
                                  </option>
                                  <option value="Tuvalu">Tuvalu</option>
                                  <option value="Uganda">Uganda</option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="United Arab Emirates">
                                    United Arab Emirates
                                  </option>
                                  <option value="United Kingdom">
                                    United Kingdom
                                  </option>
                                  <option value="United States">
                                    United States
                                  </option>
                                  <option value="United States Minor Outlying Islands">
                                    United States Minor Outlying Islands
                                  </option>
                                  <option value="Uruguay">Uruguay</option>
                                  <option value="Uzbekistan">Uzbekistan</option>
                                  <option value="Vanuatu">Vanuatu</option>
                                  <option value="Venezuela">Venezuela</option>
                                  <option value="Vietnam">Viet Nam</option>
                                  <option value="Virgin Islands (British)">
                                    Virgin Islands (British)
                                  </option>
                                  <option value="Virgin Islands (U.S)">
                                    Virgin Islands (U.S.)
                                  </option>
                                  <option value="Wallis and Futana Islands">
                                    Wallis and Futuna Islands
                                  </option>
                                  <option value="Western Sahara">
                                    Western Sahara
                                  </option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Serbia">Serbia</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                                {/* <Field
                                  type="text"
                                  name="residence_countryName"
                                  className={"form-control "}
                                  component={TextField}
                                /> */}
                                {props.errors?.residence_countryName &&
                                  residenceError ? (
                                  <span className="txt--error">
                                    {props.errors?.residence_countryName}
                                  </span>
                                ) : null}
                              </div>
                              <div className="col pt-1 pb-0"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {roleContext.affiliate && <div className="col-md-10 mb-lg-0 mb-4 pt-4 ">
                  <div className="card z-index-2">
                    {/* <div className="note" style={{position:'absolute',top:'15px',right:'30px'}}>Note: Please sign or upload.</div> */}
                    <div className="card-body p-md-4 p-sm-4  pt-2 pb-0" style={{ paddingLeft: "65px !important" }}>
                      <div className="row justify-content-center ">
                        <div className="col-md-12    mb-0 ">

                          <h6 className="ms-2 mb-0 h-white fnt ">
                          Affiliate referral link
                          </h6>
                          <div className="col-md-12   col-sm-12" style={{ marginTop: "20px" }}>

                            <div className="d-flex flex-wrap align-items-center">
                              <span style={{ color: "white",wordBreak:"break-all" }}>https://card.solswipe.io/</span>
                              <Field
                                type="text"
                                name={
                                  "partnername"
                                }

                               // placeholder="enter affiliate name"
                                className={"form-control "}
                                component={TextField}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
                <div className="col-md-10 mb-lg-0 mb-4 pt-4 ">
                  <div className="card z-index-2">
                    <div className="card-body p-md-6 p-sm-4  pt-4 pb-0">
                      <div className="d-flex align-content-center justify-content-between">
                        <h6 className="ms-2 mb-0 h-white fnt mb-3">
                          Card Mailing Address
                        </h6>
                        <div>
                          <input
                            type="checkbox"
                            className="mt--10 ml--20"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setTickSame(true);
                                props.values.mailing_address_line_1 =
                                  props.values.address1;
                                props.values.city = props.values.residence_city;
                                props.values.countryName =
                                  props.values.residence_countryName;
                                props.values.pincode =
                                  props.values.residence_pincode;
                                props.values.state =
                                  props.values.residence_state;
                              } else {
                                setTickSame(false);
                                setCountryError(true);
                                props.values.mailing_address_line_1 = "";
                                props.values.city = "";
                                props.values.countryName = "";
                                props.values.pincode = "";
                                props.values.state = "";
                              }
                            }}
                          />
                          <span className="mt--5 ml--10 txt--white">
                            Tick if same as above
                          </span>
                        </div>
                      </div>
                      <div className="row justify-content-center ">
                        <div className="col-md-12  p-4 pt-3 mb-0 ">
                          <div className="  ">
                            <div className=" row">
                              <div className="col-md-4  col-sm-12">
                                <label for="Name" className="textlogin">
                                  Mailing Address Line
                                </label>
                                <Field
                                  type="text"
                                  name={
                                    tickSame
                                      ? "address1"
                                      : "mailing_address_line_1"
                                  }
                                  className={"form-control "}
                                  component={TextField}
                                />
                              </div>
                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  City
                                </label>
                                <Field
                                  type="text"
                                  name={tickSame ? "residence_city" : "city"}
                                  className={"form-control "}
                                  component={TextField}
                                />
                              </div>
                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  State
                                </label>
                                <Field
                                  type="text"
                                  name={tickSame ? "residence_state" : "state"}
                                  className={"form-control "}
                                  component={TextField}
                                />
                              </div>
                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  Postal Code
                                </label>
                                <Field
                                  type="text"
                                  name={
                                    tickSame ? "residence_pincode" : "pincode"
                                  }
                                  className={"form-control "}
                                  component={TextField}
                                
                                // disabled={tickSame}
                                />
                              </div>

                              <div className="col-md-4 col-sm-12 pt-1 pb-0">
                                <label
                                  for="exampleFormControlInput3"
                                  className="textlogin"
                                >
                                  Country
                                </label>
                                {tickSame ? (
                                  <Field
                                    type="text"
                                    name={"residence_countryName"}
                                    className={"form-control "}
                                    component={TextField}
                                  />
                                ) : (
                                  <>
                                    <select
                                      className="form-control form-control-4"
                                      id="exampleFormControlSelect3"
                                      onChange={(e) => {
                                        if (e.target.value == "Country") {
                                          props.values.countryName = "";
                                          setCountryError(true);
                                          return;
                                        }

                                        props.values.countryName =
                                          e.target.value;
                                        setCountryError(false);
                                      }}
                                      disabled={tickSame}
                                    >
                                      <option>Country</option>
                                      <option value="Afghanistan">
                                        Afghanistan
                                      </option>
                                      <option value="Albania">Albania</option>
                                      <option value="Algeria">Algeria</option>
                                      <option value="American Samoa">
                                        American Samoa
                                      </option>
                                      <option value="Andorra">Andorra</option>
                                      <option value="Angola">Angola</option>
                                      <option value="Anguilla">Anguilla</option>
                                      <option value="Antartica">
                                        Antarctica
                                      </option>
                                      <option value="Antigua and Barbuda">
                                        Antigua and Barbuda
                                      </option>
                                      <option value="Argentina">
                                        Argentina
                                      </option>
                                      <option value="Armenia">Armenia</option>
                                      <option value="Aruba">Aruba</option>
                                      <option value="Australia">
                                        Australia
                                      </option>
                                      <option value="Austria">Austria</option>
                                      <option value="Azerbaijan">
                                        Azerbaijan
                                      </option>
                                      <option value="Bahamas">Bahamas</option>
                                      <option value="Bahrain">Bahrain</option>
                                      <option value="Bangladesh">
                                        Bangladesh
                                      </option>
                                      <option value="Barbados">Barbados</option>
                                      <option value="Belarus">Belarus</option>
                                      <option value="Belgium">Belgium</option>
                                      <option value="Belize">Belize</option>
                                      <option value="Benin">Benin</option>
                                      <option value="Bermuda">Bermuda</option>
                                      <option value="Bhutan">Bhutan</option>
                                      <option value="Bolivia">Bolivia</option>
                                      <option value="Bosnia and Herzegowina">
                                        Bosnia and Herzegowina
                                      </option>
                                      <option value="Botswana">Botswana</option>
                                      <option value="Bouvet Island">
                                        Bouvet Island
                                      </option>
                                      <option value="Brazil">Brazil</option>
                                      <option value="British Indian Ocean Territory">
                                        British Indian Ocean Territory
                                      </option>
                                      <option value="Brunei Darussalam">
                                        Brunei Darussalam
                                      </option>
                                      <option value="Bulgaria">Bulgaria</option>
                                      <option value="Burkina Faso">
                                        Burkina Faso
                                      </option>
                                      <option value="Burundi">Burundi</option>
                                      <option value="Cambodia">Cambodia</option>
                                      <option value="Cameroon">Cameroon</option>
                                      <option value="Canada">Canada</option>
                                      <option value="Cape Verde">
                                        Cape Verde
                                      </option>
                                      <option value="Cayman Islands">
                                        Cayman Islands
                                      </option>
                                      <option value="Central African Republic">
                                        Central African Republic
                                      </option>
                                      <option value="Chad">Chad</option>
                                      <option value="Chile">Chile</option>
                                      <option value="China">China</option>
                                      <option value="Christmas Island">
                                        Christmas Island
                                      </option>
                                      <option value="Cocos Islands">
                                        Cocos (Keeling) Islands
                                      </option>
                                      <option value="Colombia">Colombia</option>
                                      <option value="Comoros">Comoros</option>
                                      <option value="Congo">Congo</option>
                                      <option value="Congo">
                                        Congo, the Democratic Republic of the
                                      </option>
                                      <option value="Cook Islands">
                                        Cook Islands
                                      </option>
                                      <option value="Costa Rica">
                                        Costa Rica
                                      </option>
                                      <option value="Cota D'Ivoire">
                                        Cote d'Ivoire
                                      </option>
                                      <option value="Croatia">
                                        Croatia (Hrvatska)
                                      </option>
                                      <option value="Cuba">Cuba</option>
                                      <option value="Cyprus">Cyprus</option>
                                      <option value="Czech Republic">
                                        Czech Republic
                                      </option>
                                      <option value="Denmark">Denmark</option>
                                      <option value="Djibouti">Djibouti</option>
                                      <option value="Dominica">Dominica</option>
                                      <option value="Dominican Republic">
                                        Dominican Republic
                                      </option>
                                      <option value="East Timor">
                                        East Timor
                                      </option>
                                      <option value="Ecuador">Ecuador</option>
                                      <option value="Egypt">Egypt</option>
                                      <option value="El Salvador">
                                        El Salvador
                                      </option>
                                      <option value="Equatorial Guinea">
                                        Equatorial Guinea
                                      </option>
                                      <option value="Eritrea">Eritrea</option>
                                      <option value="Estonia">Estonia</option>
                                      <option value="Ethiopia">Ethiopia</option>
                                      <option value="Falkland Islands">
                                        Falkland Islands (Malvinas)
                                      </option>
                                      <option value="Faroe Islands">
                                        Faroe Islands
                                      </option>
                                      <option value="Fiji">Fiji</option>
                                      <option value="Finland">Finland</option>
                                      <option value="France">France</option>
                                      <option value="France Metropolitan">
                                        France, Metropolitan
                                      </option>
                                      <option value="French Guiana">
                                        French Guiana
                                      </option>
                                      <option value="French Polynesia">
                                        French Polynesia
                                      </option>
                                      <option value="French Southern Territories">
                                        French Southern Territories
                                      </option>
                                      <option value="Gabon">Gabon</option>
                                      <option value="Gambia">Gambia</option>
                                      <option value="Georgia">Georgia</option>
                                      <option value="Germany">Germany</option>
                                      <option value="Ghana">Ghana</option>
                                      <option value="Gibraltar">
                                        Gibraltar
                                      </option>
                                      <option value="Greece">Greece</option>
                                      <option value="Greenland">
                                        Greenland
                                      </option>
                                      <option value="Grenada">Grenada</option>
                                      <option value="Guadeloupe">
                                        Guadeloupe
                                      </option>
                                      <option value="Guam">Guam</option>
                                      <option value="Guatemala">
                                        Guatemala
                                      </option>
                                      <option value="Guinea">Guinea</option>
                                      <option value="Guinea-Bissau">
                                        Guinea-Bissau
                                      </option>
                                      <option value="Guyana">Guyana</option>
                                      <option value="Haiti">Haiti</option>
                                      <option value="Heard and McDonald Islands">
                                        Heard and Mc Donald Islands
                                      </option>
                                      <option value="Holy See">
                                        Holy See (Vatican City State)
                                      </option>
                                      <option value="Honduras">Honduras</option>
                                      <option value="Hong Kong">
                                        Hong Kong
                                      </option>
                                      <option value="Hungary">Hungary</option>
                                      <option value="Iceland">Iceland</option>
                                      <option value="India">India</option>
                                      <option value="Indonesia">
                                        Indonesia
                                      </option>
                                      <option value="Iran">
                                        Iran (Islamic Republic of)
                                      </option>
                                      <option value="Iraq">Iraq</option>
                                      <option value="Ireland">Ireland</option>
                                      <option value="Israel">Israel</option>
                                      <option value="Italy">Italy</option>
                                      <option value="Jamaica">Jamaica</option>
                                      <option value="Japan">Japan</option>
                                      <option value="Jordan">Jordan</option>
                                      <option value="Kazakhstan">
                                        Kazakhstan
                                      </option>
                                      <option value="Kenya">Kenya</option>
                                      <option value="Kiribati">Kiribati</option>
                                      <option value="Democratic People's Republic of Korea">
                                        Korea, Democratic People's Republic of
                                      </option>
                                      <option value="Korea">
                                        Korea, Republic of
                                      </option>
                                      <option value="Kuwait">Kuwait</option>
                                      <option value="Kyrgyzstan">
                                        Kyrgyzstan
                                      </option>
                                      <option value="Lao">
                                        Lao People's Democratic Republic
                                      </option>
                                      <option value="Latvia">Latvia</option>
                                      <option value="Lebanon">Lebanon</option>
                                      <option value="Lesotho">Lesotho</option>
                                      <option value="Liberia">Liberia</option>
                                      <option value="Libyan Arab Jamahiriya">
                                        Libyan Arab Jamahiriya
                                      </option>
                                      <option value="Liechtenstein">
                                        Liechtenstein
                                      </option>
                                      <option value="Lithuania">
                                        Lithuania
                                      </option>
                                      <option value="Luxembourg">
                                        Luxembourg
                                      </option>
                                      <option value="Macau">Macau</option>
                                      <option value="Macedonia">
                                        Macedonia, The Former Yugoslav Republic
                                        of
                                      </option>
                                      <option value="Madagascar">
                                        Madagascar
                                      </option>
                                      <option value="Malawi">Malawi</option>
                                      <option value="Malaysia">Malaysia</option>
                                      <option value="Maldives">Maldives</option>
                                      <option value="Mali">Mali</option>
                                      <option value="Malta">Malta</option>
                                      <option value="Marshall Islands">
                                        Marshall Islands
                                      </option>
                                      <option value="Martinique">
                                        Martinique
                                      </option>
                                      <option value="Mauritania">
                                        Mauritania
                                      </option>
                                      <option value="Mauritius">
                                        Mauritius
                                      </option>
                                      <option value="Mayotte">Mayotte</option>
                                      <option value="Mexico">Mexico</option>
                                      <option value="Micronesia">
                                        Micronesia, Federated States of
                                      </option>
                                      <option value="Moldova">
                                        Moldova, Republic of
                                      </option>
                                      <option value="Monaco">Monaco</option>
                                      <option value="Mongolia">Mongolia</option>
                                      <option value="Montserrat">
                                        Montserrat
                                      </option>
                                      <option value="Morocco">Morocco</option>
                                      <option value="Mozambique">
                                        Mozambique
                                      </option>
                                      <option value="Myanmar">Myanmar</option>
                                      <option value="Namibia">Namibia</option>
                                      <option value="Nauru">Nauru</option>
                                      <option value="Nepal">Nepal</option>
                                      <option value="Netherlands">
                                        Netherlands
                                      </option>
                                      <option value="Netherlands Antilles">
                                        Netherlands Antilles
                                      </option>
                                      <option value="New Caledonia">
                                        New Caledonia
                                      </option>
                                      <option value="New Zealand">
                                        New Zealand
                                      </option>
                                      <option value="Nicaragua">
                                        Nicaragua
                                      </option>
                                      <option value="Niger">Niger</option>
                                      <option value="Nigeria">Nigeria</option>
                                      <option value="Niue">Niue</option>
                                      <option value="Norfolk Island">
                                        Norfolk Island
                                      </option>
                                      <option value="Northern Mariana Islands">
                                        Northern Mariana Islands
                                      </option>
                                      <option value="Norway">Norway</option>
                                      <option value="Oman">Oman</option>
                                      <option value="Pakistan">Pakistan</option>
                                      <option value="Palau">Palau</option>
                                      <option value="Panama">Panama</option>
                                      <option value="Papua New Guinea">
                                        Papua New Guinea
                                      </option>
                                      <option value="Paraguay">Paraguay</option>
                                      <option value="Peru">Peru</option>
                                      <option value="Philippines">
                                        Philippines
                                      </option>
                                      <option value="Pitcairn">Pitcairn</option>
                                      <option value="Poland">Poland</option>
                                      <option value="Portugal">Portugal</option>
                                      <option value="Puerto Rico">
                                        Puerto Rico
                                      </option>
                                      <option value="Qatar">Qatar</option>
                                      <option value="Reunion">Reunion</option>
                                      <option value="Romania">Romania</option>
                                      <option value="Russia">
                                        Russian Federation
                                      </option>
                                      <option value="Rwanda">Rwanda</option>
                                      <option value="Saint Kitts and Nevis">
                                        Saint Kitts and Nevis
                                      </option>
                                      <option value="Saint LUCIA">
                                        Saint LUCIA
                                      </option>
                                      <option value="Saint Vincent">
                                        Saint Vincent and the Grenadines
                                      </option>
                                      <option value="Samoa">Samoa</option>
                                      <option value="San Marino">
                                        San Marino
                                      </option>
                                      <option value="Sao Tome and Principe">
                                        Sao Tome and Principe
                                      </option>
                                      <option value="Saudi Arabia">
                                        Saudi Arabia
                                      </option>
                                      <option value="Senegal">Senegal</option>
                                      <option value="Seychelles">
                                        Seychelles
                                      </option>
                                      <option value="Sierra">
                                        Sierra Leone
                                      </option>
                                      <option value="Singapore">
                                        Singapore
                                      </option>
                                      <option value="Slovakia">
                                        Slovakia (Slovak Republic)
                                      </option>
                                      <option value="Slovenia">Slovenia</option>
                                      <option value="Solomon Islands">
                                        Solomon Islands
                                      </option>
                                      <option value="Somalia">Somalia</option>
                                      <option value="South Africa">
                                        South Africa
                                      </option>
                                      <option value="South Georgia">
                                        South Georgia and the South Sandwich
                                        Islands
                                      </option>
                                      <option value="Span">Spain</option>
                                      <option value="SriLanka">
                                        Sri Lanka
                                      </option>
                                      <option value="St. Helena">
                                        St. Helena
                                      </option>
                                      <option value="St. Pierre and Miguelon">
                                        St. Pierre and Miquelon
                                      </option>
                                      <option value="Sudan">Sudan</option>
                                      <option value="Suriname">Suriname</option>
                                      <option value="Svalbard">
                                        Svalbard and Jan Mayen Islands
                                      </option>
                                      <option value="Swaziland">
                                        Swaziland
                                      </option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Switzerland">
                                        Switzerland
                                      </option>
                                      <option value="Syria">
                                        Syrian Arab Republic
                                      </option>
                                      <option value="Taiwan">
                                        Taiwan, Province of China
                                      </option>
                                      <option value="Tajikistan">
                                        Tajikistan
                                      </option>
                                      <option value="Tanzania">
                                        Tanzania, United Republic of
                                      </option>
                                      <option value="Thailand">Thailand</option>
                                      <option value="Togo">Togo</option>
                                      <option value="Tokelau">Tokelau</option>
                                      <option value="Tonga">Tonga</option>
                                      <option value="Trinidad and Tobago">
                                        Trinidad and Tobago
                                      </option>
                                      <option value="Tunisia">Tunisia</option>
                                      <option value="Turkey">Turkey</option>
                                      <option value="Turkmenistan">
                                        Turkmenistan
                                      </option>
                                      <option value="Turks and Caicos">
                                        Turks and Caicos Islands
                                      </option>
                                      <option value="Tuvalu">Tuvalu</option>
                                      <option value="Uganda">Uganda</option>
                                      <option value="Ukraine">Ukraine</option>
                                      <option value="United Arab Emirates">
                                        United Arab Emirates
                                      </option>
                                      <option value="United Kingdom">
                                        United Kingdom
                                      </option>
                                      <option value="United States">
                                        United States
                                      </option>
                                      <option value="United States Minor Outlying Islands">
                                        United States Minor Outlying Islands
                                      </option>
                                      <option value="Uruguay">Uruguay</option>
                                      <option value="Uzbekistan">
                                        Uzbekistan
                                      </option>
                                      <option value="Vanuatu">Vanuatu</option>
                                      <option value="Venezuela">
                                        Venezuela
                                      </option>
                                      <option value="Vietnam">Viet Nam</option>
                                      <option value="Virgin Islands (British)">
                                        Virgin Islands (British)
                                      </option>
                                      <option value="Virgin Islands (U.S)">
                                        Virgin Islands (U.S.)
                                      </option>
                                      <option value="Wallis and Futana Islands">
                                        Wallis and Futuna Islands
                                      </option>
                                      <option value="Western Sahara">
                                        Western Sahara
                                      </option>
                                      <option value="Yemen">Yemen</option>
                                      <option value="Serbia">Serbia</option>
                                      <option value="Zambia">Zambia</option>
                                      <option value="Zimbabwe">Zimbabwe</option>
                                    </select>

                                    {props.errors?.countryName &&
                                      countryError ? (
                                      <span className="txt--error">
                                        {props.errors?.countryName}
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </div>
                              <div className="col pt-1 pb-0"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10 mb-lg-0 mb-4 pt-4 ">
                  <div className="card z-index-2">
                    {/* <div className="note" style={{position:'absolute',top:'15px',right:'30px'}}>Note: Please sign or upload.</div> */}
                    <div className="card-body p-md-6 p-sm-4  pt-2 pb-0">
                      <div className="row justify-content-center ">
                        <div className="col-md-12  p-4 pt-3 mb-0 ">
                          <div className="  ">
                            <div className=" row text-align-center justify-content-between">
                              <div className="col-md-7 col-sm-12">
                                <label for="Name" className="textlogin">
                                  Nationality
                                </label>
                                <Field
                                  type="text"
                                  name="nationality"
                                  className={"form-control "}
                                  component={TextField}
                                />

                                <div
                                  className="pt-3 mobile-flex"
                                  style={{
                                    textAlign: "left",
                                    marginTop: "4%",
                                  }}

                                >
                                  <div>

                                  <label
                                    for="exampleFormControlInput1"
                                    className="textlogin"
                                  >
                                    Passport Bio Page <br />
                                    <span className="text-red"> Only Passport Accepted </span>
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control "
                                    id="amount"
                                    placeholder=""
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const files = [...e.target.files]
                                      compress.compress(files, {
                                        size: 1,
                                        quality: .65, 
                                        maxWidth: 1920,
                                        maxHeight: 1920,
                                        resize: true,
                                        rotate: false, 
                                      }).then((data) => {    
                                        props.values.passport_file_signature=data[0].prefix + data[0].data       
                                                            
                                      })
                                    }}
                                  />
                                  {props.errors?.passport_file_signature &&
                                    passerr ? (
                                    <span className="txt--error">
                                      {props.errors?.passport_file_signature}
                                    </span>
                                  ) : null}
                                  </div>

                                  <img src={Passport1} className="p-2 passimage"/>
                                </div>
                                <div
                                  className="pt-3 mobile-flex"
                                  style={{
                                    textAlign: "left",
                                    marginTop: "4%",
                                  }}
                                >
                                  <div>
                                  <label
                                    for="exampleFormControlInput1"
                                    className="textlogin"
                                  >
                                    Selfie with Passport Bio Page (Ensure non-mirror image)<br />
                                    <span className="text-red"> Only Passport Accepted </span>
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control "
                                    id="amount"
                                    accept="image/*"
                                    placeholder=""
                                    onChange={async (e) => {
                                      const files = [...e.target.files]
                                      compress.compress(files, {
                                        size: 1,
                                        quality: .65, 
                                        maxWidth: 1920,
                                        maxHeight: 1920,
                                        resize: true,
                                        rotate: false, 
                                      }).then((data) => {    
                                        props.values.passport_file_signature_biopic=data[0].prefix+data[0].data         
                                                        
                                                              
                                      })
                                    }}
                                  />
                                  {props.errors
                                    ?.passport_file_signature_biopic &&
                                    passerr2 ? (
                                    <span className="txt--error">
                                      {
                                        props.errors
                                          ?.passport_file_signature_biopic
                                      }
                                    </span>
                                  ) : null}
                                  </div>
                                  <img src={Passport2}   className="p-2 passimage"/>

                                </div>
                              </div>

                              <div className="col-md-4 col-sm-12">
                                <label
                                  for="exampleFormControlInput1"
                                  className="textlogin"
                                >
                                  Digital Signature
                                  <span style={{ fontSize: "12px" }}>
                                    {" "}
                                    (Please sign or upload image)
                                  </span>
                                </label>
                                <div
                                  style={{
                                    width: "300px",
                                    height: "130px",
                                    background: "white",
                                  }}
                                  className='canvas-res'
                                >
                                  <SignatureCanvas
                                    penColor="green"
                                    ref={sigCanvas}
                                    canvasProps={{
                                      width: "300px",
                                      className: "sigCanvas",
                                      height: "130px",
                                    }}
                                  />
                                </div>
                                <span
                                  className="txt--white fw--extrabold cursor-pointer"
                                  onClick={clear}
                                >
                                  Clear
                                </span>

                                <div
                                  className="pt-3"
                                  style={{
                                    textAlign: "left",
                                    marginTop: "4%",
                                  }}
                                >
                                  <label
                                    for="exampleFormControlInput1"
                                    className="textlogin"
                                  >
                                    Upload
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control "
                                    id="amount"
                                    accept="image/*"
                                    placeholder=""
                                    onChange={async (e) => {
                                      const files = [...e.target.files]
                                      compress.compress(files, {
                                        size: 1,
                                        quality: .65, 
                                        maxWidth: 1920,
                                        maxHeight: 1920,
                                        resize: true,
                                        rotate: false, 
                                      }).then((data) => {    
                                        props.values.img_sign=data[0].prefix + data[0].data;
                                                 
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                              {/* <div className="col-md-4 col-sm-12 pt-1 pb-0"></div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9 mb-lg-0 mb-4 pt-4  justify-content-center text-center pt-2 pb-0">
                  <Button type="submit" className="btn btns" text={"Next"} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

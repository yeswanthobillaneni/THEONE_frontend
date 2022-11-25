import React, { useEffect, useState ,useContext} from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { getCookie } from "../../Utils/cookieHandling";
import { CardSubmitInitialValues } from "../../Utils/initialValues";
import { cardSubmitSchema } from "../../Utils/validations";
import Button from "../../Components/Common/Button/Button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { URL } from "../../Utils/url";
import OtpInput from 'react-otp-input';
import { UserRoleContext } from "../../Utils/UserAuthorization";


export default function CardSubmit() {
  const [state, setState] = useState({
    number1: "",
    image: "",
  });
  const roleContext=useContext(UserRoleContext)
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const navigate = useNavigate();

  const cardSubmitApi = async () => {
    console.log(state.number1);
    if (state.image == "") {
      toast.error("Please fill all the fields");
      return;
    }
    // if (state.number.length !== 16) {
    //   toast.error("Please enter correct details");
    //   return;
    // }
    var data = JSON.stringify({
      jdbCardNumber1:
        state.number1.toString(),

      card_img: state.image,
      card_activated: "1",
    });
    var config = {
      method: "put",
      url:
        `${URL}/users/verifyCard/${getCookie("phantomId")}`,
      headers: {
        Authorization: getCookie("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          toast.success(response.data.message);
          navigate("/cardisactivate");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {

      });
  };

  return (
    <div
      className=" card-form card-form-2"
      style={{ paddingLeft: "50px", paddingRight: "50px", paddingTop: "50px" }}
    >
      <h6 className="ms-2 mb-0  h-white headtext mb-3">Card Activation</h6>
      <div className="row ">
        <div className="col-lg-6 mb-lg-0 mb-4">
          <div className="card z-index-2">
            <div className="card-body p-6 pt-5 pb-6">
              <h6 className="ms-2 mb-0 text-center h-white headtext mb-3">
                Input your 16 digit card number
              </h6>

              <div className="row justify-content-center ">
                <div className="col-md-12  p-4 pt-1 mb-0 ">
                  {/* <div className=" d-flex justify-content-center "> */}
                  {/* <input
                      value={state.number}
                      onChange={(e) => {
                        setState({ ...state, number: e.target.value });
                      }}
                    /> */}
                  {/* <form> */}
                  <OtpInput
                    value={state.number1}
                    onChange={(e) => { setState({ ...state, number1: e }) }}
                    numInputs={16}
                    inputStyle={{ marginLeft: "20px", width: '20px', color: 'white', border: 'none', borderBottom: '1px solid white', backgroundColor: 'transparent' }}
                    containerStyle={{display:"flex", justifyContent:"center", alignItems:"center",flexWrap:"wrap"}}
                    separator={<span></span>}
                  />
                  {/* </form> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <p className="" style={{ textAlign: "right" }}>
            Note: Wait patiently for your card to arrive.
          </p>
        </div>
        <div className="col-lg-6 mb-lg-0 mb-4">
          {
            roleContext.card_active_reject === 'Rejected' &&
            <p className="" style={{ textAlign: "center",color:'red' }}>
            Your submission has been rejected. Please upload a correct selfie
          </p>
          }
          <div className="card z-index-2">
            <div className="card-body p-6 pt-4 pb-0">
              <h6 className="ms-2 mb-0 text-center h-white headtext mb-3">
                Upload a clear selfie of you holding the card and passport bio
                page
              </h6>
              <div className="row d-flex  align-items-center justify-content-center ">
                <div className="col-md-12  p-4 pt-2 mb-0 ">
                  <form>
                    <div className="row pb-3 mb-4">
                      <div className="d-flex align-items-center justify-content-center">
                        <input
                          type="file"
                          className="filepond"
                          name="filepond"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            const base64 = await convertBase64(file);

                            setState({ ...state, image: base64 });
                          }}
                          multiple
                          data-max-file-size="3MB"
                          data-max-files="3"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div className=" justify-content-center text-center pt-4 pb-0">
          <Button
            type="submit"
            className="btn btns"
            text={"Submit"}
            clicked={cardSubmitApi}
          />
        </div>
      </div>
      <div className="row my-4"></div>
    </div>
  );
}

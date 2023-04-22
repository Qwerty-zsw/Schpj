import "mdb-react-ui-kit/dist/css/mdb.rtl.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./LoginPage.css";
import { LinkContainer } from "react-router-bootstrap";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const LoginPage = () => {
  const schema = yup.object().shape({
    EmailorUser: yup
      .string()
      .required("ایمیل یا نام کاربری خود را وارد کنید!")
      .matches(
        /^(?:(?!.*\s)[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|[a-zA-Z0-9]+)$/,
        "ایمیل یا نام کاربری اشتباه است!"
      ),
    password: yup.string().required("لطفا رمز عبور خود را وارد کنید!"),
  });

  const OnSubmit = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <MDBContainer
        fluid
        className="w-100 h-100 d-flex justify-content-center align-items-center bg-image"
        style={{ backgroundImage: `url("../../public/csG.jpg")` }}
      >
        <MDBRow>
          <MDBCol col="12">
            <MDBCard
              className="text-white my-5 mx-auto bg-blur"
              style={{ borderRadius: "3rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="w-100 p-5 d-flex flex-column align-items-center mx-auto">
                <h2 className="fw-bold mb-2 text-uppercase">ورود</h2>
                <p className="text-white-50 mb-5 mt-2 smallCus">
                  لطفا نام کاربری و رمزعبور خود را وارد کنید
                </p>

                <Form
                  onSubmit={handleSubmit(OnSubmit)}
                  className="w-100 text-center"
                >
                  <MDBInput
                    wrapperClass="mb-1 w-100 qqqq"
                    labelClass="text-white TextInp"
                    label="نام کاربری یا ایمیل"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    {...register("EmailorUser")}
                  />
                  <small className="text-danger TextInp">
                    <section className="w-100 d-flex mt-1 text-danger">
                      {errors.EmailorUser?.message}
                    </section>
                  </small>
                  <MDBInput
                    wrapperClass="mt-3 w-100 TextInp"
                    labelClass="text-white"
                    label="رمز عبور"
                    id="formControlLg"
                    size="lg"
                    {...register("password")}
                  />
                  <small className="w-100 TextInp">
                    <section className="w-100 d-flex mt-1 text-danger">
                      {errors.password?.message}
                    </section>
                  </small>
                  <MDBBtn
                    outline
                    className="mx-2 mt-3 px-5 rounded-5 TextInp"
                    color="light"
                    rippleColor="white"
                    size="lg"
                  >
                    ورود
                  </MDBBtn>
                </Form>

                <Link to={"/ریست-پسورد"} className="small mt-3 pb-lg-2">
                  <a href="#">پسورد خود را فراموش کرده اید؟</a>
                </Link>

                <div className="d-flex flex-row mt-3 mb-5">
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="py-3 px-4 rounded-pill"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="lg" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="py-3 px-4 rounded-pill"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="py-3 px-4 rounded-pill"
                    style={{ color: "white" }}
                  >
                    <MDBIcon fab icon="google" size="lg" />
                  </MDBBtn>
                </div>
                <div>
                  <p className="mb-0">
                    حساب کاربری ندارید؟{" "}
                    <LinkContainer to={"/ثبت-نام"}>
                      <a class="fw-bold">ثبت نام</a>
                    </LinkContainer>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default LoginPage;

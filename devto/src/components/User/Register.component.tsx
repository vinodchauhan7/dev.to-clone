import React from "react";
import { FormikProps, withFormik } from "formik";
import { RowStyle } from "../../ui_components/RowColStyle";
import { StyledButton } from "./../../ui_components/ButtonStyle";
import { Col } from "react-bootstrap";
import { ReactComponent as DevSvg } from "./../../svg/devSvg.svg";
import styled from "styled-components";
import * as Yup from "yup";
import { useRegisterMutation, useMeQuery } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  name: string;
}

interface MyFormValues {
  initialName?: string;
  initialEmail?: string;
  initialPassword?: string;
}

const ShowSvg = styled.div`
  max-height: 200px !important;
  max-width: 200px !important;
  display: block;
  align-items: center;
  margin-left: 42%;
  margin-top: 2%;
`;

const ColStyle = styled(Col)`
  margin-top: 5%;
  justify-content: center;

  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  label {
    font-size: 12px;
    margin-right: 10px;
  }
`;

const RegisterForm = (props: FormikProps<FormValues>) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <>
      <RowStyle>
        <Col>
          <ShowSvg>
            <DevSvg></DevSvg>
          </ShowSvg>
        </Col>
      </RowStyle>
      <RowStyle>
        <ColStyle>
          <form onSubmit={handleSubmit}>
            <Wrapper>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && <div>{errors.name}</div>}
            </Wrapper>
            <Wrapper>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </Wrapper>
            <Wrapper>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div>{errors.password}</div>
              )}
            </Wrapper>
            <Wrapper>
              <StyledButton
                type="submit"
                disabled={
                  isSubmitting ||
                  !!(errors.name && touched.name) ||
                  !!(errors.email && touched.email) ||
                  !!(errors.password && touched.password)
                }
              >
                SignUp
              </StyledButton>
            </Wrapper>
          </form>
        </ColStyle>
      </RowStyle>
    </>
  );
};

export const RegisterComponent: React.FC<RouteComponentProps> = ({
  history
}) => {
  const [register] = useRegisterMutation();
  const { data } = useMeQuery();

  if (data) {
    history.push("/");
  }

  const RegisterComponentUser = withFormik<MyFormValues, FormValues>({
    mapPropsToValues: props => ({
      name: props.initialName || "",
      email: props.initialEmail || "",
      password: props.initialPassword || ""
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .min(5)
        .max(50),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(3)
        .max(50)
    }),
    async handleSubmit({ name, email, password }: FormValues) {
      let date_ob = new Date();
      const joinedDate = date_ob.getMonth() + " " + date_ob.getFullYear();
      console.log(name + " - " + email + " - " + password + " - " + joinedDate);
      const response = await register({
        variables: {
          data: {
            name: name,
            email: email,
            password: password,
            joinedDate: joinedDate
          }
        }
      });

      console.log(JSON.stringify(response, null, 2));
      history.push("/login");
    }
  })(RegisterForm);

  return <RegisterComponentUser></RegisterComponentUser>;
};

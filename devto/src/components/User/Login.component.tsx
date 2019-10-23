import React from "react";
import { FormikProps, withFormik } from "formik";
import { RowStyle } from "../../ui_components/RowColStyle";
import { StyledButton } from "./../../ui_components/ButtonStyle";
import { Col } from "react-bootstrap";
import { ReactComponent as DevSvg } from "./../../svg/devSvg.svg";
import styled from "styled-components";
import * as Yup from "yup";
import { RouteComponentProps } from "react-router-dom";
import {
  useLoginMutation,
  useMeQuery,
  MeQuery,
  MeDocument
} from "../../generated/graphql";
import { setAccessToken, getAccessToken } from "./../../utils/accessToken";

interface FormValues {
  email: string;
  password: string;
}

interface MyFormProps {
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

const LoginForm = (props: FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
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
            <DevSvg />
          </ShowSvg>
        </Col>
      </RowStyle>
      <RowStyle>
        <ColStyle>
          <form onSubmit={handleSubmit}>
            <Wrapper>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </Wrapper>
            <Wrapper>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
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
                  !!(errors.email && touched.email) ||
                  !!(errors.password && touched.password)
                }
              >
                Sign In
              </StyledButton>
            </Wrapper>
          </form>
        </ColStyle>
      </RowStyle>
    </>
  );
};

export const LoginComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
  const { data } = useMeQuery();

  if (data) {
    //history.push("/");
  }

  const LoginComponentUser = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => ({
      email: props.initialEmail || "",
      password: props.initialPassword || ""
    }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    async handleSubmit({ email, password }: FormValues) {
      console.log(email, password);

      const response = await login({
        variables: {
          data: {
            email,
            password
          }
        },
        update: (store, { data }) => {
          //updating cache so that it will not hit again and again
          if (!data) {
            return null;
          }
          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data.login.user
            }
          });
        }
      });

      console.log(response);
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }

      console.log(getAccessToken());
      window.location.replace("http://localhost:3000/");
    }
  })(LoginForm);

  return <LoginComponentUser></LoginComponentUser>;
};

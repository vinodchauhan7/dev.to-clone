import React from "react";
import { RowStyle } from "../../ui_components/RowColStyle";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import { useMeQuery, usePostMutation } from "../../generated/graphql";
import { StyledButton } from "./../../ui_components/ButtonStyle";
import { FormikProps, withFormik } from "formik";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

interface FormValues {
  title: string;
  description: string;
}

interface MyFormValues {
  initialTitle?: string;
  initialDescription?: string;
}

const Wrapper = styled.div`
  width: 100%;
  display: block;
  align-items: center;
  justify-content: center;
`;

const Article = styled.div`
  border: 1px solid grey;
  padding: 2%;
`;

const H1Heading = styled.div`
  width: 100%;
  padding: 14px 0 7px;
  font-weight: 500;
  min-height: 40px;
  font-size: 20px;
  word-break: break-word;
`;

const PostForm = (props: FormikProps<FormValues>) => {
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
        <Col style={{ padding: "5%" }}>
          <form onSubmit={handleSubmit}>
            <Article>
              <H1Heading>
                <Wrapper>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your post Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                  />
                  {touched.title && errors.title && <div>{errors.title}</div>}
                </Wrapper>
              </H1Heading>
              <H1Heading>
                <Wrapper>
                  <textarea
                    placeholder="Enter your post Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ width: "100%", lineHeight: "140%;" }}
                  />
                  {touched.description && errors.description && (
                    <div>{errors.description}</div>
                  )}
                </Wrapper>
              </H1Heading>

              <Wrapper>
                <StyledButton
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !!(errors.title && touched.title) ||
                    !!(errors.description && touched.description)
                  }
                >
                  Create Post
                </StyledButton>
              </Wrapper>
            </Article>
          </form>
        </Col>
      </RowStyle>
    </>
  );
};

export const WritePost: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, loading } = useMeQuery();
  const [post] = usePostMutation();
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const ViewComponentPost = withFormik<MyFormValues, FormValues>({
    mapPropsToValues: props => ({
      title: props.initialTitle || "",
      description: props.initialDescription || ""
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required")
    }),
    async handleSubmit({ title, description }: FormValues) {
      let date_ob = new Date();
      const creationDate = date_ob.getMonth() + " " + date_ob.getFullYear();
      console.log(" - " + title + " - " + description + " - " + creationDate);
      const response = await post({
        variables: {
          data: {
            title: title,
            description: description,
            creationDate: creationDate,
            tags: ["angular", "webdev", "typescript", "react"],
            views: 0,
            isPublished: true
          }
        }
      });

      if (response) {
        alert("Post Created");
      }
      console.log(JSON.stringify(response, null, 2));
      history.push("/");
    }
  })(PostForm);

  return (
    <>
      <ViewComponentPost></ViewComponentPost>
    </>
  );
};

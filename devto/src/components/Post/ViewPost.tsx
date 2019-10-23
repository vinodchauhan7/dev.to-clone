import React from "react";
import { RowStyle } from "../../ui_components/RowColStyle";
import { Col } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  location: any;
}

export const ViewPost: React.FC<Props> = ({ location }) => {
  let postDetails = null;
  if (!location) {
    return <div>Loading...</div>;
  }

  if (location!.state) {
    console.log(JSON.stringify(location, null, 2));
    postDetails = location.state.post.postDetails;
  }

  const Article = styled.div`
    position: relative;
    border: 1px solid grey;
  `;

  const Header = styled.div`
    z-index: 6;
    position: relative;
    width: 81%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    max-width: 710px;
    margin: auto;
  `;

  const H1Heading = styled.div`
    margin: 0 auto;
    padding: 14px 0 7px;
    font-weight: 500;
    min-height: 40px;
    font-size: calc(2vw + 26px);
    word-break: break-word;
  `;

  const Body = styled.div`
    margin: auto;
    width: 82%;
    font-family: Palatino, "Palatino Linotype", "Palatino LT STD",
      "Book Antiqua", Georgia, serif;
    font-size: 21px;
    line-height: 32px;
    background: #fff;
    background: var(--theme-container-background, #fff);
    position: relative;
    z-index: 5;
    padding-bottom: 5px;
    overflow-wrap: break-word;
  `;

  const UserData = styled.div`
    display: block;
    padding: 10px 13px;
    font-size: 0.9em;
    font-weight: bold;
    background: #fff;
    margin-bottom: 10px;
    margin-left: 10px;
    border: 1px solid #d6d6d6;
    box-shadow: 1px 1px 0px #c2c2c2;
    color: #0a0a0a;
    width: 262px;
    border-radius: 3px;
    min-height: 100px;
  `;

  return (
    <>
      <RowStyle>
        <Col md={8} style={{ paddingLeft: "5%", paddingTop: "5%" }}>
          <Article>
            <Header>
              <H1Heading>{postDetails.title}</H1Heading>
              <h3>
                {postDetails.user.name} {postDetails.creationDate}
              </h3>
            </Header>
            <Body>{postDetails.description}</Body>
          </Article>
        </Col>
        <Col
          md={4}
          style={{
            paddingLeft: "5%",
            paddingTop: "5%"
          }}
        >
          <UserData>
            <h4>{postDetails.user.name}</h4>
            <h5>{postDetails.user.email}</h5>
          </UserData>
        </Col>
      </RowStyle>
    </>
  );
};

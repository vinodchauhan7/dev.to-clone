import React from "react";
import { RowStyle } from "./../../../ui_components/RowColStyle";
import styled from "styled-components";
import { ReactComponent as ConnnectSvg } from "./../../../svg/connect.svg";
import { ReactComponent as NotificationSvg } from "./../../../svg/notification.svg";
import { Col } from "react-bootstrap";
import { useMeQuery } from "../../../generated/graphql";

export const RightHeader: React.FC = () => {
  const { data, loading } = useMeQuery();
  const WritePost = styled.a`
    width: 118px;
    display: block;
    margin-top: 10px;
    padding: 3px;
    text-align: center;
    font-weight: bold;
    border-radius: 3px;
    border: 2px solid #0a0a0a;
    color: #0a0a0a;
    background: #66e2d5;
    font-size: 11px;
    text-decoration: none !important;
    font-stretch: condensed;
    &:hover {
      color: #0b0b0b;
      background: #66e2e5;
    }
  `;

  const ShowSvg = styled.div`
    margin-top: 10px;
  `;

  const ColStyle = styled(Col)``;

  const DropDownDiv = styled.div`
    position: relative;
    display: inline-block;
    margin-top: 10px;

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .dropbtn {
      background-color: black;
      color: white;
      border-radius: 50%;
    }

    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }

    .dropdown-content a {
      margin: 5px;
      &:nth-child(1) {
        border-bottom: 3px solid black;
      }

      &:hover {
        background-color: #ddd;
      }
    }

    &:hover {
      .dropdown-content {
        display: block;
      }
      .dropbtn {
        background-color: rgb(49, 60, 72);
      }
    }
  `;

  let options: any = null;

  if (loading || !data) {
    options = (
      <>
        <a href="login">SignIn</a>
        <a href="register">SignUp</a>
      </>
    );
  }

  if (data) {
    options = (
      <>
        <a href="/userDetails">@{data.me.name}</a>
        <a href="#">DashBoard</a>
        <a href="#">Write A Post</a>
        <a href="#">Reading List</a>
        <a href="#">Sign Out</a>
      </>
    );
  }

  return (
    <>
      <RowStyle>
        <ColStyle md={3}>
          <WritePost href="/newPost">WRITE A POST</WritePost>
        </ColStyle>
        <ColStyle md={1}>
          <ShowSvg>
            <ConnnectSvg></ConnnectSvg>
          </ShowSvg>
        </ColStyle>
        <ColStyle md={1}>
          <ShowSvg>
            <NotificationSvg></NotificationSvg>
          </ShowSvg>
        </ColStyle>
        <ColStyle md={5}>
          <DropDownDiv>
            <button className="dropbtn">D</button>
            <div className="dropdown-content">{options}</div>
          </DropDownDiv>
        </ColStyle>
      </RowStyle>
    </>
  );
};

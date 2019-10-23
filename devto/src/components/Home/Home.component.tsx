import React from "react";
import { RowStyle, ColStyle } from "../../ui_components/RowColStyle";
import { GetAllPost } from "./GetAllPost.component";
import styled from "styled-components";
import { useMeQuery, useAllUserQuery } from "../../generated/graphql";
import { Link } from "react-router-dom";

export const HomeComponent: React.FC = () => {
  const currentUser = useMeQuery();
  const { data } = useAllUserQuery();
  const ProfileSnapShot = styled.div`
    margin-top: 22%;
    overflow: hidden;
    background: #fff;
    margin-bottom: 14px;
    border-radius: 3px;
    font-size: 14px;
    border: 1px solid #d6d6d6;
    box-shadow: 1px 1px 0px #c2c2c2;
  `;

  return (
    <>
      <RowStyle>
        <ColStyle md={2} style={{ marginTop: "2%" }}>
          <h6>LoggedIn User</h6>
          <ProfileSnapShot>
            {currentUser!.data !== undefined ? (
              <Link to={`/userDetails/${currentUser!.data!.me.id}`}>
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    currentUser!.data!.me.name
                  }`}
                />
                <text style={{ textDecoration: "none !important" }}>
                  {currentUser!.data!.me.name}
                </text>
              </Link>
            ) : (
              <></>
            )}
          </ProfileSnapShot>
        </ColStyle>
        <ColStyle md={8} style={{ marginTop: "2%" }}>
          <GetAllPost></GetAllPost>
        </ColStyle>
        <ColStyle md={2} style={{ marginTop: "2%" }}>
          <h6>List of All Users</h6>
          {data! !== undefined ? (
            data!.allUser.map(users => {
              return (
                <ProfileSnapShot>
                  <Link to={`/userDetails/${users.id}`}>
                    <img
                      src={`https://ui-avatars.com/api/?name=${users.name}`}
                    />
                    <text style={{ textDecoration: "none !important" }}>
                      {users.name}
                    </text>
                  </Link>
                </ProfileSnapShot>
              );
            })
          ) : (
            <>
              <div>No List of Users</div>
            </>
          )}
        </ColStyle>
      </RowStyle>
    </>
  );
};

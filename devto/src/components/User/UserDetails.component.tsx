import React from "react";
import { RowStyle, ColStyle } from "../../ui_components/RowColStyle";
import styled from "styled-components";
import { useGetUserQuery, useMeQuery } from "../../generated/graphql";

interface Props {
  match: any;
}

interface mProps {
  userId: any;
}

export const UserDetails: React.FC<Props> = ({ match }) => {
  const { params } = match;
  let user: any = null;
  const currentUser = useMeQuery();

  const getUserId = async () => {
    if (params.userId) {
      await params.userId;
    }
  };

  getUserId();
  const { data, loading } = useGetUserQuery({
    variables: {
      userId: parseInt(params!.userId)
    }
  });

  if (!params.userId) {
    return <div>...</div>;
  }

  let srcImage: string | undefined = "";
  if (data && currentUser.data!) {
    console.log("user ---- " + JSON.stringify(data, null, 2));
    srcImage = `https://ui-avatars.com/api/?name=${data.getUser.name}`;
  }

  const UserProfileHeader = styled.div`
    width: 98%;
    min-height: 300px;
    border: 2px solid #3d3f51;
    box-shadow: 5px 6px 0px #3d3f51;
    margin: 20px 0px 10px 5px;
    position: relative;
  `;

  const ProfilePicWrapper = styled.div`
    float: left;
    width: calc(14.5vw + 60px);
    max-width: 270px;
    position: relative;
    z-index: 5;
  `;

  const ProfileDetails = styled.div`
    float: left;
    width: calc(100% - (13vw + 95px));
    padding-top: calc(2px + 2.7vw);
  `;

  const ProfilePic = styled.img`
    width: calc(12.2vw + 50px);
    height: calc(12.2vw + 50px);
    border-radius: 200px;
    max-width: 220px;
    max-height: 220px;
    border: 4px solid white;
    margin-top: 2vw;
    border-color: #45485c;
    background: #45485c;
  `;

  const EditButton = styled.button`
    font-size: 22px;
    padding: 4px 8px;
    vertical-align: 12px;
    border-radius: 5px;
    min-width: 140px;
    color: #ffffff;
    background-color: #45485c;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: left;
  `;

  const UserMetaDataDetails = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 370px;
    border-left: 3px solid #d6d6d6;
  `;

  const UserMetaDataDetailsInner = styled.div`
    position: absolute;
    top: 45%;
    transform: translateY(-45%);

    padding: 15px 0px;
  `;

  const DivRow = styled.div`
    padding: calc(5px + 0.2vw) 0px;
    display: inline-block;
    padding-left: 16px;
    width: 322px;
    max-width: 92%;
  `;

  if (loading || !data) {
    return <div>....</div>;
  }
  return (
    <>
      <RowStyle>
        <ColStyle>
          <UserProfileHeader>
            <div style={{ margin: "auto", width: "96%" }}>
              <ProfilePicWrapper>
                <ProfilePic
                  className="profile-pic"
                  src={srcImage}
                  alt={`${data!.getUser.name} profile`}
                />
              </ProfilePicWrapper>
              <ProfileDetails>
                <h1>
                  <span>{data!.getUser.name}</span>
                  <br />
                  <span>{data!.getUser.email}</span>
                  <br />
                  {currentUser!.data!.me.id === data!.getUser.id ? (
                    <span className="user-profile-follow-button-wrapper">
                      <EditButton>EDIT PROFILE</EditButton>
                    </span>
                  ) : (
                    <></>
                  )}
                </h1>
              </ProfileDetails>
              <UserMetaDataDetails>
                <UserMetaDataDetailsInner>
                  <DivRow>
                    <div>work</div>
                    <div>No Data</div>
                  </DivRow>
                  <DivRow>
                    <div>location</div>
                    <div>No Data</div>
                  </DivRow>
                  <DivRow>
                    <div>work_status</div>
                    <div>No Data</div>
                  </DivRow>
                  <DivRow>
                    <div>education</div>
                    <div>No Data</div>
                  </DivRow>
                  <DivRow>
                    <div>joined</div>
                    <div>{data!.getUser.joinedDate}</div>
                  </DivRow>
                </UserMetaDataDetailsInner>
              </UserMetaDataDetails>
            </div>
          </UserProfileHeader>
        </ColStyle>
      </RowStyle>
    </>
  );
};

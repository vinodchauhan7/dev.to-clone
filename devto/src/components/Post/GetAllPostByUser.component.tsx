import React from "react";
import { useMeQuery, useGetAllPostByIdQuery } from "../../generated/graphql";
import styled from "styled-components";
import { RowStyle, ColStyle } from "../../ui_components/RowColStyle";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const GetAllPostByUser: React.FC = () => {
  const currentUser = useMeQuery();
  let userId = "";
  const getUserId = async () => {
    if (currentUser!.data!) {
      userId = currentUser!.data!.me.id;
      if (userId) {
        await console.log(userId);
      }
    }
  };

  getUserId();
  const { data, loading } = useGetAllPostByIdQuery({
    variables: {
      userId: parseInt(userId)
    }
  });

  const SingleArticle = styled.div`
    margin-top: 5%;
    text-align: left;
    background: #ffffff;
    transition: opacity 0.35s ease-in;
    border: 1px solid #d6d6d6;
    box-shadow: 1px 1px 0px #c2c2c2;
    border-radius: 3px;
    cursor: pointer;
    width: 96%;
    position: relative;
  `;

  const SmallPicAvatar = styled.div`
    height: 50px;
    width: 50px;
    padding: 20px 0px 23px;
    float: left;
    height: 40px;
    width: 40px;
    margin-left: 12px;
    margin-top: 3px;
    border-radius: 50px;
  `;

  const Content = styled.div`
    width: calc(100% - 10%);
    padding-right: 0px;
    float: left;
    color: Black;
  `;

  const UserContent = styled.div`
    width: calc(100% - 10%);
    padding-right: 0px;
    float: left;
    color: grey;
  `;

  const ReadPost = styled.a`
    width: 118px;
    float: right;
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

  if (loading || !data) {
    return <div>Loading all Post...</div>;
  }

  let allPost = null;
  if (data) {
    console.log(JSON.stringify(data!.getAllPostById, null, 2));
    allPost = data!.getAllPostById.map(postDetails => {
      return (
        <SingleArticle key={postDetails.postId}>
          <RowStyle>
            <ColStyle md={2}>
              <SmallPicAvatar>
                {currentUser!.data !== undefined ? (
                  <Link to={`/userDetails/${postDetails.user.id}`}>
                    <img
                      src={`https://ui-avatars.com/api/?name=${postDetails.user.name}`}
                    />
                  </Link>
                ) : (
                  <Link to={`/login`}>
                    <img
                      src={`https://ui-avatars.com/api/?name=${postDetails.user.name}`}
                    />
                  </Link>
                )}
              </SmallPicAvatar>
            </ColStyle>
            <ColStyle md={10}>
              <RowStyle>
                <ColStyle>
                  <Link
                    to={{
                      pathname: "/viewPost",
                      state: {
                        post: { postDetails }
                      }
                    }}
                  >
                    <Content>
                      <h3>{postDetails.title}</h3>
                    </Content>
                  </Link>
                </ColStyle>
              </RowStyle>
              <RowStyle>
                <ColStyle>
                  <h4>
                    <Link to={`/userDetails/${postDetails.user.id}`}>
                      <UserContent>
                        {postDetails.user.name} - {postDetails.creationDate}
                      </UserContent>
                    </Link>
                  </h4>
                </ColStyle>
              </RowStyle>
              <RowStyle>
                <ColStyle>
                  <div className="tags">
                    {postDetails.tags.map((tagItem, index) => {
                      if (index % 2) {
                        return (
                          <>
                            <Badge variant="primary"> {tagItem} </Badge>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Badge variant="danger"> {tagItem} </Badge>
                          </>
                        );
                      }
                    })}
                  </div>
                  <Link
                    to={{
                      pathname: "/viewPost",
                      state: {
                        post: { postDetails }
                      }
                    }}
                  >
                    <ReadPost>Read</ReadPost>
                  </Link>
                </ColStyle>
              </RowStyle>
            </ColStyle>
          </RowStyle>
        </SingleArticle>
      );
    });
  }

  return <>{allPost}</>;
};

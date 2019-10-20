import React from "react";
import { useLogoutMutation } from "./../../generated/graphql";
import { setAccessToken } from "./../../utils/accessToken";
import { RouteComponentProps } from "react-router-dom";
export const LogoutComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const [logout, { client }] = useLogoutMutation();
  React.useEffect(() => {
    async function userLogout() {
      await logout();
      setAccessToken("");
      await client!.resetStore();
    }
    userLogout();
    history.push("/");
  }, []);
  return <></>;
};

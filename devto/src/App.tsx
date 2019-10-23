import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HeaderComponent } from "./components/Header/header.component";
import { GlobalStyle } from "./ui_components/GlobalStyle";
import { ColStyle, RowStyle } from "./ui_components/RowColStyle";
import { RegisterComponent } from "./components/User/Register.component";
import { LoginComponent } from "./components/User/Login.component";
import { LogoutComponent } from "./components/User/Logout.component";
import { HomeComponent } from "./components/Home/Home.component";
import { UserDetails } from "./components/User/UserDetails.component";
import { ViewPost } from "./components/Post/ViewPost";
import { GetAllPostByUser } from "./components/Post/GetAllPostByUser.component";
import { WritePost } from "./components/Post/writePost";
import { setAccessToken } from "./utils/accessToken";
const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      const { accessToken } = await res.json();
      console.log(accessToken);
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>....</div>;
  }

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Router>
        <RowStyle>
          <ColStyle md={12}>
            <HeaderComponent />
          </ColStyle>
        </RowStyle>
        <RowStyle>
          <ColStyle md={12}>
            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/register" component={RegisterComponent} />
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/logout" component={LogoutComponent} />
              <Route
                exact
                path="/userDetails/:userId"
                component={UserDetails}
              />
              <Route exact path="/viewPost" component={ViewPost} />
              <Route exact path="/newPost" component={WritePost} />
              <Route exact path="/dashboard" component={GetAllPostByUser} />
            </Switch>
          </ColStyle>
        </RowStyle>
      </Router>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HeaderComponent } from "./components/Header/header.component";
import { GlobalStyle } from "./ui_components/GlobalStyle";
import { ColStyle, RowStyle } from "./ui_components/RowColStyle";
import { RegisterComponent } from "./components/User/Register.component";
import { LoginComponent } from "./components/User/Login.component";
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
      <RowStyle>
        <ColStyle md={12}>
          <HeaderComponent />
        </ColStyle>
      </RowStyle>
      <RowStyle>
        <ColStyle md={12}>
          <Router>
            <Switch>
              <Route exact path="/" render={() => <div>Hello</div>} />
              <Route exact path="/register" component={RegisterComponent} />
              <Route exact path="/login" component={LoginComponent} />
            </Switch>
          </Router>
        </ColStyle>
      </RowStyle>
    </>
  );
};

export default App;

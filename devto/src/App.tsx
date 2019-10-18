import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HeaderComponent } from "./components/Header/header.component";
import { GlobalStyle } from "./ui_components/GlobalStyle";
import { ColStyle, RowStyle } from "./ui_components/RowColStyle";
import { RegisterComponent } from "./components/User/Register.component";
import { useHelloQuery } from "./generated/graphql";
const App: React.FC = () => {
  const { data, loading } = useHelloQuery();

  if (loading || !data) {
    return <div>...</div>;
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
              <Route exact path="/" render={() => <div>{data.hello}</div>} />
              <Route exact path="/register" component={RegisterComponent} />
            </Switch>
          </Router>
        </ColStyle>
      </RowStyle>
    </>
  );
};

export default App;

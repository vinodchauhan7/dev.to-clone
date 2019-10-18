import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root1")
);

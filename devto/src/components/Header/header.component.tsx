import React from "react";
import { ColStyle, RowStyle } from "../../ui_components/RowColStyle";
import { DevLogo } from "./../../ui_components/DevLogo";
import { SearchBar } from "./SearchBar/searchbar.component";
import { RightHeader } from "./RightHeader/index";
import styled from "styled-components";

export const HeaderComponent: React.FC = () => {
  const RowStyles = styled(RowStyle)`
    background: rgb(249, 242, 255);
  `;

  return (
    <>
      <RowStyles>
        <ColStyle md={2}>
          <DevLogo></DevLogo>
        </ColStyle>
        <ColStyle md={5}>
          <SearchBar></SearchBar>
        </ColStyle>
        <ColStyle md={5}>
          <RightHeader />
        </ColStyle>
      </RowStyles>
    </>
  );
};

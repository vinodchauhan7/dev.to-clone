import styled from "styled-components";

export const DevLogo = styled.div`
  justify-content: center;
  align-item: center;
  font-size: 16px;
  font-weight: bold;
  padding: 7px;
  border-radius: 5px;
  max-width: 50px;
  max-height: 50px;
  background: black;
  margin: 5px 0px 5px 70px;
  color: white;

  &:before {
    content: "DEV";
    justify-content: center;
    align-item: center;
  }
`;

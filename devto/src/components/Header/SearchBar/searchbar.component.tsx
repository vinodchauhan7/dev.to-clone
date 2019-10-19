import React from "react";
import styled from "styled-components";

const Input = styled.input`
  justify-content: left;
  align-item: left;
  font-size: 16px;
  font-weight: bold;
  padding: 7px;
  border-radius: 5px;
  margin: 5px;
  width: 100%;
`;

export const SearchBar: React.FC = () => {
  const [search, setSearch] = React.useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <form>
      <Input
        placeholder="search"
        name="search"
        value={search}
        onChange={handleChange}
      ></Input>
    </form>
  );
};

import React from "react";
import tw from "twin.macro";
import Navbar from "../components/Navbar";
import List from "../components/List";

const Contaier = tw.div`
    
`;
const ProductList = () => {
  return (
    <>
      <Navbar />
      <List />
    </>
  );
};

export default ProductList;

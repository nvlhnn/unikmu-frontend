import React from "react";
import tw from "twin.macro";
import { popularProducts } from "../data";
import { Product } from "./Product";

const Container = tw.div` 
    flex
    flex-wrap
    justify-center
    
    mt-8
    md:mt-5
    lg:mt-0
    // md:justify-start
    md:grid 
    md:grid-cols-3 
    lg:grid-cols-4 
    md:gap-6
    
`;

const Products = (products) => {
  return (
    <Container>
      {products.products?.map((item, index) => (
        <Product key={index} item={item} />
      ))}
    </Container>
  );
};

export default Products;

import React from "react";
import { useMediaQuery } from "react-responsive";
import tw from "twin.macro";
import Navbar from "../components/Navbar";

const Container = tw.div`
    flex 
    flex-col
    // justify-start
    lg:flex-col
    lg:px-52
    md:px-28
    md:mt-4
    px-8
    mt-4
    // justify-center
    // items-center
    lg:items-start
`;

const User = () => {
  //   const isMobile = useMediaQuery({ maxWidth: deviceSize.laptop });

  return (
    <>
      <Navbar />
      <Container></Container>
    </>
  );
};
export default User;

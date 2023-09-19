import React from "react";
import tw from "twin.macro";

const Container = tw.div`
    text-center
    text-lg
    // capitalize
    flex
    justify-center
    items-center
    text-gray-400
    h-[50vh]
`;

const Notfound = ({ msg }) => {
  return (
    <>
      <Container>{msg}</Container>
    </>
  );
};

export default Notfound;

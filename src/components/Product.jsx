import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Add, Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";

const Container = tw.div`
    
    // -mb-16
    mb-5
    lg:mb-10
    flex
    flex-col
    md:h-[400px]
    h-[300px]
    // md:h-[300px]
    md:h-auto
    max-w-[100%]
    w-[40%]
    md:w-auto
    relative
    md:mx-0
    mx-2
    items-center
    // content-around
    
`;

const Image = tw.img`
    // h-[250px]
    md:w-[20vw]
    
    // w-full
    rounded
    mx-auto
    
`;
const Info = tw.div`
    flex
    flex-col
    md:justify-between
    // justify-start
    // items-center
    text-center
    mt-3
    md:h-full
`;
const Category = tw.div`
    text-sm
    font-normal
    capitalize
    mt-1
    text-gray-500
`;

const Title = tw.div`
    md:text-base
    text-sm
    font-extrabold
    mt-1
    capitalize
    max-w-[80%]
    text-center
    flex
    justify-center
`;

const Price = tw.div`
    text-sm
    font-bold
    mt-4
    text-gray-800
    // absolute
    // bottom-0
`;

const Colors = tw.div`
    mt-3
    flex
    justify-start
    items-start
    justify-items-start
`;

const Color = styled.div`
  background-color: ${(props) => props.bg};
  ${tw`
        flex
        justify-center
        items-center
        mr-1
        h-5
        w-5
        rounded
        border-2
        shadow-inner
    `}
`;

export const Product = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Container className="">
      <Link to={`/products/detail/${item.slug}`}>
        <Image src={item.data[0]?.img} alt="" />
      </Link>

      <Colors>
        {item.data.slice(0, 4).map((data, index) => (
          <Color key={index} bg={data.hex} />
        ))}
        {item.data.length > 4 && (
          <Color bg={item.data[4].hex}>
            <Add className="text-gray-100" style={{ fontSize: 15 }} />
          </Color>
        )}
      </Colors>
      <Info>
        {/* <Category>{item.category.name}</Category> */}
        <Link
          className="flex justify-center "
          to={`/products/detail/${item.slug}`}
        >
          <Title>
            {item.name.length > 30
              ? item.name.substring(0, 27) + "..."
              : item.name}
          </Title>
        </Link>
        <Price>Rp. {item.price.toLocaleString()}</Price>
      </Info>
    </Container>
  );
};

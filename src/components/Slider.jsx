import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "../styles.css";

// import required modules
import { Mousewheel, Pagination } from "swiper";
import tw from "twin.macro";
import styled from "styled-components";
import { categories } from "../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  z-index: 1;
  ${tw`
        w-full
        h-[93vh]
        md:h-[90vh]
        // z-10
        // position[relative]
    `}
`;
const Slide = styled.div`
  background-image: url(${(props) => props.bg});
  ${tw`
        text-center
        text-base
        bg-blue-300
        flex
        flex-col
        justify-center
        items-center
        h-full
        w-full
        bg-center
        bg-cover
    `}
`;

const TextContainer = styled.div`
  text-shadow: 0 0 5px black;
  ${tw`
        mx-5
        text-center
        text-white
        font-extrabold
        lg:text-xl
        tracking-wide
        capitalize
        text-base
    `}
`;

const Button = tw.button`
    text-base
    bg-prime-dark-20
    shadow
    lowercase
    h-auto
    w-auto
    px-5
    py-2
    mt-4
    rounded
    text-gray-200
    font-medium
    cursor-pointer
    hover:bg-[#1e2f37]
    transition 
    ease-in-out
    duration-300
`;
export default function App() {
  // const slides = []

  // for (let index = 0; index < array.length; index++) {
  //     slides.push(
  //         <SwiperSlide tag={Slide}>im</SwiperSlide>
  //     )

  // }
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        tag={Container}
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id}>
            <Swiper
              className="mySwiper2"
              pagination={{ clickable: true }}
              modules={[Pagination]}
              tag={Container}
            >
              {item.images.map((data, index) => (
                <SwiperSlide tag={Slide} key={index} bg={data.img}>
                  <TextContainer>{data.desc}</TextContainer>
                  <Link to={`/products/${item.slug}`}>
                    <Button>shop now</Button>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

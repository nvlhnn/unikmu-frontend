import React, { useEffect, useRef, useState } from "react";
import {
  Pagination,
  Navigation,
  Thumbs,
  FreeMode,
  Grid,
  Mousewheel,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import Navbar from "../components/Navbar";
import { sizes } from "../data";
import Radio from "../components/Radio";
// import Thumbs from '../components/Thumbs';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/grid";
import { deviceSize } from "../components/Responsive";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getCart } from "../redux/cartRedux";
import { createBrowserHistory } from "history";
import Toast from "../components/Toast";
import { ToastContainer, Flip as ToastTransition } from "react-toastify";

const Wrapper = tw.div`
    flex 
    flex-col
    justify-start
    lg:flex-row
    lg:px-52
    md:px-28
    md:mt-10
    // justify-center
    items-center
    lg:items-start
    // justify-items-center
`;

const Slide = tw.div`
    w-screen
    pb-8
    lg:max-w-[28vw]
    md:max-w-[500px]
    // md:mr-5
    mx-0
    // justify-self-center
`;

const Image = tw.img``;

const DetailWrapper = tw.div`
    px-5
    lg:px-0
    py-3
    flex
    flex-col
    md:pt-0
    // md:pl-10
`;
const Title = tw.div` 
    text-left
    font-extrabold
    md:text-2xl
    text-lg
    capitalize
    mb-2
`;

const ChoiceContainer = tw.div`
    flex
    flex-col
    justify-start
    mt-3
`;

const OptionWrapper = tw.div`
    flex
    flex-row
    justify-start
    my-2
    w-full
    flex-wrap
`;
const Price = tw.div`
    font-extrabold
    text-left 
    mt-3
    md:text-2xl
    text-xl
`;

const AddCart = tw.button`
    text-white 
    tracking-wide
    py-3
    font-bold
    mt-4
    capitalize
`;

const ThumbContainer = tw.div`
    h-[420px]
    // overflow-auto
    w-[100%]
    mx-0
    mr-5
`;

const Slider = tw.div`
    w-[100%]
`;

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);
  const [checkedSize, setCheckedSize] = useState(false);
  const [size, setSize] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: deviceSize.laptop });
  const [avaibleSize, setAvaibleSize] = useState([]);
  const token = useSelector((state) => state.user.currentUser?.token);
  const isFetching = useSelector((state) => state.cart.pending);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = () => {
    if (!token) {
      navigate("/login", {
        state: `/products/detail/${slug}`,
      });
    }
    const body = {
      productId: product._id,
      code: product.data[index].code,
      size: size,
      qty: 1,
    };

    dispatch(addCart({ body: body, token: token })).then((a) => {
      dispatch(getCart(token));
    });
    Toast("success", "added to cart");
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + slug);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
    // avaibleSize = getAvaibleSize(product)
  }, [slug]);

  useEffect(() => {
    if (!product) return false;
    setAvaibleSize(
      product.data[index].stocks.filter((a) => a.stock > 0).map((a) => a.size)
    );
  }, [index, product]);

  const handler = (idx) => {
    setIndex(idx);
    swiperRef.slideTo(1);
    setSize(null);
    let sizeRadio = document.getElementsByName("size");
    for (var i = 0; i < sizeRadio.length; i++) {
      sizeRadio[i].checked = false;
    }
  };

  const pagination = {
    clickable: true,
    modifierClass: "absolute -bottom-0 left-0 right-0 ",
    renderBullet: function (index, className) {
      return (
        '<span class="' + className + ' " style="margin: 0 3px 0 3px;"></span>'
      );
    },
  };

  return (
    <>
      <Navbar />
      {product && (
        <Wrapper>
          <div className="preview flex flex-row justify-start basis-[50%]">
            {!isMobile && (
              <Swiper
                direction={"vertical"}
                slidesPerView={5}
                onSwiper={setThumbsSwiper}
                mousewheel={true}
                spaceBetween={2}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                className="swiperThumb basis-[10%]"
                tag={ThumbContainer}
              >
                <SwiperSlide tag={Slider}>
                  <Image src={product.data[index].img} />
                </SwiperSlide>
                {product.images.map((img) => (
                  <SwiperSlide tag={Slider} key={img}>
                    <Image src={img} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
              }}
              onSwiper={setSwiperRef}
              slidesPerView={1}
              pagination={pagination}
              navigation={true}
              clickable={true}
              modules={[Navigation, Pagination, Thumbs, FreeMode]}
              loop={true}
              className={!isMobile && "basis-[90%]"}
              tag={Slide}
              thumbs={{ swiper: thumbsSwiper }}
            >
              <SwiperSlide>
                <Image src={product.data[index].img} />
              </SwiperSlide>
              {product.images.map((img) => (
                <SwiperSlide key={img}>
                  <Image src={img} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <DetailWrapper className="basis-[50%]">
            <Title>{product.name}</Title>
            <div className="desc mb-2">{product.desc}</div>
            <ChoiceContainer>
              <div className="label text-sm">
                color :{" "}
                <span className="ml-2 text-base font-bold uppercase">
                  {product.data[index].colorId.name}
                </span>
              </div>
              <OptionWrapper>
                {product.data.map((item, itemIndex) => (
                  <Radio
                    key={item.img}
                    id={item.img}
                    bg={item.hex}
                    name={"color"}
                    checked={itemIndex == index}
                    disabled={false}
                    onClick={() => handler(itemIndex)}
                  />
                ))}
              </OptionWrapper>
            </ChoiceContainer>
            <ChoiceContainer>
              <div className="label text-sm">
                size :{" "}
                <span className="ml-2 text-base font-bold uppercase">
                  {!size ? "-" : size}
                </span>
              </div>
              <OptionWrapper>
                {sizes.map((item) => (
                  <Radio
                    key={item}
                    id={item}
                    bg={"trasnparant"}
                    name={"size"}
                    title={item}
                    disabled={!avaibleSize.includes(item) && true}
                    onClick={() => avaibleSize.includes(item) && setSize(item)}
                  />
                ))}
              </OptionWrapper>
            </ChoiceContainer>
            <Price>
              <span className="text-xl md:text-lg font-bold">Rp. </span>
              {product.price.toLocaleString()}
            </Price>
            <AddCart
              className={size ? " bg-prime-dark-20 " : "bg-gray-300"}
              onClick={handleSubmit}
              disabled={!size || isFetching ? true : false}
            >
              Add To Cart
            </AddCart>
          </DetailWrapper>
        </Wrapper>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={ToastTransition}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </>
  );
};

export default Product;

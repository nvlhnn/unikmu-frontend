import {
  SettingsInputComponent,
  Search,
  Close,
  ArrowDownward,
  ArrowDropDown,
  KeyboardArrowDown,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Products from "../components/Products";
import Checkbox from "./Checkbox";
import { sizes } from "../data";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { deviceSize } from "./Responsive";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/searchRedux";

const Container = styled.div`
  ${tw`
    mb-10
    flex
    flex-col
    lg:px-52
    md:px-28
    // px-
    // px-5
  `}
`;

const SearchContainer = tw.div`
    // w-full
    mx-5
    mt-5
    bg-white
    flex
    justify-between
    items-center
    py-1
    px-2
    border-2
    border-gray-900
`;

const Input = tw.input`
    border-none
    outline-none
    bg-white
    px-2
    w-full
    text-gray-200
    text-gray-900
`;

const FilterTitle = tw.div`
  // text-black
  text-center
  w-[50%]
  px-4
  py-2
  text-sm
  lowercase
  border-2
  uppercase
`;
const FilterContainer = tw.div`
    // mt-4
    flex
    justify-between
    sticky
    top-[7vh]
    bg-white
    // rounded
    px-5
    py-3
    z-10
`;
const Loader = tw.div`
  border-t-2
  py-8
  flex 
  justify-center 
  items-center
  text-lg
  font-bold
  hover:text-gray-400
  cursor-pointer

`;

const FilterOverlay = styled(motion.div)`
  z-index: 40;
  ${tw`
    overflow-y-scroll
    // h-[2000px]
    fixed
    overflow-scroll
    top-0
    w-screen
    min-h-screen
    bg-white
    p-4
    // z-[1000]
    translate-x-[500px]
  `}
`;

const OverlayTop = tw.div`
  flex
  justify-between
  items-center
  p-4
  mb-5
  text-xl
`;

const FilterItem = tw.div`  
  flex
  flex-wrap
  justify-start
`;

const PriceInput = tw.input`
  // border-none
  border-2
  text-black
  w-[50%]
  focus:border-gray-200
  // radi
  // outline-none
  // bg-[#111827]
  px-2
  text-center
  text-gray-700
  // min-h-[200px]
  py-2
`;

const filterPrice = (setMinPrice, setMaxPrice, minState, maxState) => (
  <div className="container border-2 p-4 mb-4">
    <div className="head mb-3 uppercase">price</div>
    <div className="flex flex-wrap flex-row">
      <PriceInput
        placeholder="min"
        type={"number"}
        onChange={(a) => setMinPrice(a.target.value)}
        value={minState ?? ""}
      />
      <PriceInput
        placeholder="max"
        type={"number"}
        onChange={(a) => setMaxPrice(a.target.value)}
        value={maxState ?? ""}
      />
    </div>
  </div>
);

const filterData = (items, name, filterHandler, state) => (
  <div className="border-2 p-4">
    <div className="head mb-3 uppercase">{name}</div>
    <FilterItem>
      {items.map((item, index) => (
        <Checkbox
          onChange={filterHandler}
          key={index}
          title={item._id ? "" : item}
          id={item._id ?? item}
          value={item._id ?? item}
          name={name}
          bg={item.hex ?? item.name ?? "transparent"}
          state={state}
        />
      ))}
    </FilterItem>
  </div>
);

const Select = tw.select`
  border-2
  border-gray-200
  px-4
  py-2
  lg:ml-2
  
  focus:border-gray-200
`;
const Option = styled.option``;

const breadcumbs = (cat, search) => {
  if (cat && !search) {
    return cat;
  } else if (cat && search) {
    return cat + " > " + search;
  } else if (!cat && search) {
    return search;
  }
};

const List = () => {
  const location = useLocation();

  const cat = location.pathname.split("/")[2];
  const search = useSelector((state) => state.search.value);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [filterSize, setFilterSize] = useState(null);
  const [filterColor, setFilterColor] = useState(null);
  const [sort, setSort] = useState(1);
  const [limit, setLimit] = useState(12);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getColors = async () => {
      try {
        const res = await publicRequest.get("/colors");
        setColors(Array.from(res.data));
      } catch (error) {}
    };
    getColors();
  }, []);

  const filterHandler = (name) => {
    let checked = Array.from(
      document.querySelectorAll(`input[name=${name}]:checked`)
    );
    if (name == "size") {
      setFilterSize(checked.map((a) => a.value).join(","));
    } else if (name == "color") {
      setFilterColor(checked.map((a) => a.value).join(","));
    }
  };

  useEffect(() => {
    // const base_url = window.location.origin;
    // const base_url = "http://localhost:5000";
    let url = cat
      ? `${BASE_URL}/products?limit=${limit}&sortBy=${sort}&cat=${cat}&`
      : `${BASE_URL}/products?limit=${limit}&sortBy=${sort}&`;

    if (search && search !== "") {
      url += "keyword=" + search + "&";
    }
    if (filterSize && filterSize !== "") {
      url += "size=" + filterSize + "&";
    }

    if (filterColor && filterColor !== "") {
      url += "color=" + filterColor + "&";
    }

    if (minPrice && minPrice !== "") {
      url += "minPrice=" + minPrice + "&";
    }

    if (maxPrice && maxPrice !== "") {
      url += "maxPrice=" + maxPrice + "&";
    }

    const getProducts = async () => {
      try {
        const res = await axios
          .get(url)
          .then((res) => setProducts(res.data.result));
        // setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat, filterColor, filterSize, sort, maxPrice, minPrice, search, limit]);

  const handleSearch = () => {
    const value = document.getElementById("search-input").value;
    dispatch(update(value));
  };

  const isMobile = useMediaQuery({ maxWidth: deviceSize.laptop });
  const [isOverlay, setOverlay] = useState(false);
  const animateFrom = { opacity: 1, x: "100%" };
  const animateTo = { opacity: 1, x: 0 };

  window.addEventListener("resize", () => {
    if (!isMobile && isOverlay) {
      setOverlay(false);
    }
  });

  useEffect(() => {
    if (isOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOverlay]);

  return (
    <>
      {isMobile && (
        <>
          {isOverlay && (
            <FilterOverlay
              initial={animateFrom}
              animate={animateTo}
              exit={animateFrom}
              transition={{ duration: 0.5 }}
            >
              <OverlayTop>
                <div>filter</div>
                <Close
                  style={{ fontSize: 30 }}
                  onClick={() => setOverlay(false)}
                />
              </OverlayTop>
              {filterData(
                sizes,
                "size",
                () => filterHandler("size"),
                filterSize
              )}
              {filterData(
                colors,
                "color",
                () => filterHandler("color"),
                filterColor
              )}
              {filterPrice(setMinPrice, setMaxPrice, minPrice, maxPrice)}
              {/* <div className='flex flex-row fixed bottom-0 left-0 justify-center items-center w-screen' >
                <FilterTitle className='bg-prime-dark-20 text-white tracking-wide' onClick={clearFilter}>hapus semua</FilterTitle>
                <FilterTitle className='bg-prime-dark-20 text-white tracking-wide' >terapkan</FilterTitle>
              </div> */}
            </FilterOverlay>
          )}
        </>
      )}

      <Container className="">
        {isMobile && (
          <>
            <SearchContainer>
              <Input
                id="search-input"
                defaultValue={search}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                // autoFocus
              />
              <Search className="text-gray-900 ml-2" onClick={handleSearch} />
            </SearchContainer>
            <FilterContainer>
              <Select
                className="w-[50%] uppercase text-xs text-center"
                onChange={(e) => setSort(e.target.value)}
              >
                <Option value={"1"}>produk terbaru</Option>
                <Option value={"2"}>rendah ke tinggi</Option>
                <Option value={"3"}>tinggi ke rendah</Option>
              </Select>
              <FilterTitle onClick={() => setOverlay(true)}>filter</FilterTitle>
            </FilterContainer>
            <Products products={products.data} />
            {products.totalCount > limit && (
              <Loader onClick={() => setLimit((limit) => limit + 12)}>
                <div className="mr-2">load more </div>
                <KeyboardArrowDown />
              </Loader>
            )}
          </>
        )}

        {!isMobile && (
          <>
            <div
              className={
                "header mt-16 text-gray-700 pb-1 flex mb-8 " +
                (search || cat ? "justify-between" : "justify-end")
              }
            >
              {(search || cat) && (
                <div className="search flex items-center">
                  search :
                  <span className="ml-3 text-black font-semibold capitalize">
                    {/* {cat ? cat + " > " : ""} {search} */}
                    {breadcumbs(cat, search)}
                  </span>
                </div>
              )}
              <div className="right flex flex-row items-center">
                <div className="counter">
                  <span className="text-black font-semibold">
                    {products.count}
                  </span>
                  &nbsp;&nbsp;products
                </div>
                <div className="separator font-extrabold ml-2">
                  &nbsp;|&nbsp;
                </div>
                <div className="sorter ml-2">sortby</div>
                <Select onChange={(e) => setSort(e.target.value)}>
                  <Option value={"1"}>produk terbaru</Option>
                  <Option value={"2"}>rendah ke tinggi</Option>
                  <Option value={"3"}>tinggi ke rendah</Option>
                </Select>
              </div>
            </div>

            <div className="list grid grid-cols-4 gap-10">
              <div className="filter h-32 sticky top-24 ">
                {filterData(sizes, "size", () => filterHandler("size"))}
                {filterData(colors, "color", () => filterHandler("color"))}
                {filterPrice(setMinPrice, setMaxPrice, minPrice, maxPrice)}
              </div>
              <div className="products col-span-3">
                {products.count > 0 && <Products products={products.data} />}
                {products.totalCount > limit && (
                  <Loader onClick={() => setLimit((limit) => limit + 12)}>
                    <div className="mr-2">load more </div>
                    <KeyboardArrowDown />
                  </Loader>
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default List;

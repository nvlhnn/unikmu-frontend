import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { deviceSize } from "./Responsive";
import tw from "twin.macro";
import { Person, Search, ShoppingCart } from "@material-ui/icons";
import { Turn as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/searchRedux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { getCart } from "../redux/cartRedux";
import { Badge } from "@material-ui/core";
import { logoutMethod } from "../redux/userRedux";
// const Container = styled.div`
//     ${tw`

//     `}
// `

const Container = styled.div`
  z-index: 30;
  ${tw`
        bg-prime-dark-20
        // z-50
        h-[7vh]
        md:h-[10vh]
        w-full
        px-4
        sticky
        top-0
        md:px-52
        // border-b-2
        py-5
        flex
        justify-between
        items-center
    `}
`;
const Left = tw.div`
    flex
    items-center
`;

const Logo = tw.h1`
    font-bold
    text-2xl
    mr-5
    text-gray-200
`;

const Right = tw.div`
    flex
    items-center
`;

const CategoryContainer = tw.div`
    flex
    items-center
    flex-col
    justify-center
    items-center
    md:flex-row

    
`;

const CategoryItem = tw.div`
    p-7
    w-full
    flex-basis[1/4]
    cursor-pointer
    text-2xl
    font-bold
    border-b-2
    border-[#1e2f37]
    text-center
    text-gray-200
    md:ml-2
    md:font-semibold
    md:border-b-2
    md:border-b-transparent
    md:hover:border-b-blue-500
    md:py-1
    md:px-3
    md:text-base
    md:hover:bg-[#374151]
    rounded
    
`;

const SearchContainer = tw.div`
    bg-[#111827]
    flex
    items-center
    py-1
    px-2
    border-2
    border-[#1e2f37]
`;

const Input = tw.input`
    border-none
    outline-none
    bg-[#111827]
    px-2
    text-gray-200
`;

const CategoryOverlay = styled(motion.div)`
  transform: translateX(4em);
  z-index: 20;
  ${tw`
        // z-10
        w-full  
        h-auto   
        // bg-blue-500
        position[fixed]
        md:display[none]
        bg-prime-dark-20
    `}
`;

const HambContainer = tw.div`
    position[relative]
    top-0.5
    ml-4
    text-gray-200
    
`;

const Navbar = () => {
  let navigate = useNavigate();
  const loccat = useLocation().pathname.split("/")[2];
  const search = useSelector((state) => state.search.value);
  const isMobile = useMediaQuery({ maxWidth: deviceSize.laptop });
  const [isOpen, setOpen] = useState(false);
  const closeCategory = () => setOpen(false);
  const animateFrom = { opacity: 1, y: "-100%" };
  const animateTo = { opacity: 1, y: 0 };
  const [categories, setCategories] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const cartQty = useSelector((state) => state.cart.totalQty);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCat = async () => {
      const cat = await publicRequest.get("/categories/");
      setCategories(cat.data);
    };
    getCat();

    if (user) dispatch(getCart(user.token));
  }, [user]);

  const handleSearch = () => {
    navigate(`/products`);
    const value = document.getElementById("search-input").value;
    dispatch(update(value));
  };

  const handleUser = () => {
    // window.snap.pay("4460cda4-b926-4ce4-8da5-c9314322825b");
    if (user) {
      // UserMethod(dispatch);
      navigate("/transactions");
    } else {
      navigate("/login");
    }
  };

  const handleCatClick = (a) => {
    isMobile && setOpen(false);
    navigate(`/products/${a.slug}`);
    window.location.reload();
  };

  const navItems = () => {
    return (
      <CategoryContainer>
        {isMobile && (
          <Link to={`/transactions`}>
            <CategoryItem
              className={
                "nav-item " +
                (loccat == "transactions" ? "md:bg-prime-dark-30" : "")
              }
              onClick={() => isMobile && setOpen(false)}
            >
              transactions
            </CategoryItem>
          </Link>
        )}
        {categories.map((a) => (
          // <Link
          //   key={a.slug}
          //   to={`/products/${a.slug}`}
          //   onClick={() => window.location.reload()}
          // >
          <CategoryItem
            className={
              "nav-item " + (loccat == a.slug ? "md:bg-prime-dark-30" : "")
            }
            onClick={() => handleCatClick(a)}
          >
            {a.name}
          </CategoryItem>
          // </Link>
        ))}
      </CategoryContainer>
    );
  };

  return (
    <>
      <Container>
        <Left>
          <Link to={"/"}>
            <Logo>UNIKMU</Logo>
          </Link>
          {!isMobile && categories && navItems()}
        </Left>
        <Right>
          {!isMobile && (
            <>
              <SearchContainer>
                <Input
                  id="search-input"
                  defaultValue={search}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Search
                  className="text-gray-200 ml-2 cursor-pointer"
                  onClick={handleSearch}
                />
              </SearchContainer>
              <div className="user-wrapper relative group">
                <Person
                  className="cursor-pointer ml-4 text-gray-200"
                  style={{ fontSize: 35 }}
                  onClick={handleUser}
                />
                {/* <div className="dropdown absolute group-hover:block hidden rounded bg-white border-prime-300 border-2 p-2">
                  <Link className="mx-2" to={`/transactions`}>
                    transactions
                  </Link>
                </div> */}
              </div>
            </>
          )}
          {isMobile && (
            <Search
              className="cursor-pointer ml-4 text-gray-200 "
              style={{ fontSize: 32 }}
              onClick={handleSearch}
            />
          )}
          <Link to={"/cart"}>
            <Badge badgeContent={cartQty} color="primary">
              <ShoppingCart
                count={76}
                className="cursor-pointer ml-4 text-gray-200"
                style={{ fontSize: 30 }}
              />
            </Badge>
          </Link>
          {isMobile && (
            <HambContainer>
              <Hamburger toggled={isOpen} size={28} toggle={setOpen} />
            </HambContainer>
          )}
        </Right>
      </Container>

      {isOpen && (
        <CategoryOverlay
          initial={animateFrom}
          animate={animateTo}
          exit={animateFrom}
          transition={{ duration: 0.5 }}
          // initial={false}
          // animate={isOpen ? "open" : "close"}
          // variants={variants}
          // transition={{ duration: 0.5 }}
        >
          {categories && navItems()}
        </CategoryOverlay>
      )}
    </>
  );
};

export default Navbar;

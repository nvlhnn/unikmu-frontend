import React, { useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import Navbar from "../components/Navbar";
import { Close } from "@material-ui/icons";
// import { cart } from '../data'
import {
  publicRequest,
  userRequest,
  deleteCart as destroyCart,
  deleteOrder,
} from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart, getCart } from "../redux/cartRedux";

import Address from "../modals/Address";
import Notfound from "../components/Notfound";

const Wrapper = tw.div`
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

const Items = tw.div`
    flex
    flex-col
    w-full
    // mt-4
    // border-b-2
    md:mr-10

`;

const Item = tw.div`
    // border-t-2
    // border-b-2
    flex    
    flex-row
    // py-4
    mt-2
    // md:py-10
    items-start
`;

const Img = tw.img`
    // w-full
    w-[30vw]
    lg:w-[250px]
    // object-fill
`;

const Detail = tw.div`
    flex
    flex-col
    ml-5
    md:ml-7
`;
const Select = tw.select`
  border-2
  text-center
  w-full
  rounded
  border-gray-200
//   px-
  py-2
  w-14
//   ml-2
  focus:border-gray-200
`;

const Option = tw.option``;

const Exit = tw.button`
    
`;

const Summaries = tw.div`   
    flex
    flex-col
    bg-gray-100
    p-5
    mt-5
    rounded
`;
const Summary = tw.div`
    flex 
    flex-row
    justify-between
    items-center
    py-4
    border-b-2
`;
const SumTitle = tw.div`
    font-bold text-base 
    text-gray-500
`;

const SumValue = tw.div`
    font-extrabold
    text-lg

`;

const Checkout = tw.button`
    bg-prime-dark-20 
    text-white 
    tracking-wide
    py-3
    font-bold
    mt-4
    capitalize
    disabled:hover:bg-gray-500
    disabled:bg-gray-500
    hover:bg-prime-dark-10
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart.data);
  const totalPrice = cart
    ? cart.products
        .map((a) => a.productId.price * a.qty)
        .reduce((total, val) => total + val, 0)
    : 0;
  const [cartExceed, setCartExceed] = useState(false);
  const { token, user } = useSelector((state) => state.user.currentUser);
  const [address, setAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  const selectOption = (cartQty, itemQty) => {
    const arr = [];
    let length;

    if (cartQty <= itemQty && itemQty > 7) {
      length = 7;
    } else if (cartQty <= itemQty && itemQty <= 7) {
      length = itemQty;
    } else if (cartQty > itemQty) {
      length = cartQty;
    }

    for (let i = 1; i <= length; i++) {
      arr.push(
        <Option key={i} defaultValue={i}>
          {i}
        </Option>
      );
    }
    return arr;
  };

  useEffect(() => {
    if (cart) {
      setCartExceed(
        cart.products?.find(
          (a) =>
            a.qty >
            a.productId.data?.find((b) => b.code == a.code)
              .stocks?.find((c) => c.size == a.size).stock
        ) != null
      );
    }
  }, [cart]);

  const handleDelete = (productId, code, size) => {
    const params = {
      productId: productId,
      code: code,
      size: size,
    };
    dispatch(deleteCart({ params: params, token: token })).then((a) =>
      dispatch(getCart(token))
    );
  };

  const handleUpdate = (productId, code, size, qty) => {
    const params = {
      productId: productId,
      code: code,
      size: size,
      qty: qty,
    };

    const update = async () => {
      try {
        const res = await userRequest(token)
          .put("/carts", params, {
            header: {
              Authorization: token,
            },
          })
          .then((a) => dispatch(getCart(token)));
      } catch (err) {
        console.log(err);
      }
    };

    update();
  };

  useEffect(() => {
    if (address) {
      const getSnapToken = async () => {
        try {
          const snapToken = await userRequest(token).post(
            "/orders/generate-token-midtrans",
            { shippingAddress: address },
            {
              header: {
                Authorization: token,
              },
            }
          );

          return snapToken;
        } catch (error) {}
      };
      window.snap.show();
      getSnapToken()
        .then((a) => {
          window.snap.pay(a.data.token, {
            onSuccess: function (result) {
              destroyCart(token);
              dispatch(getCart(token));
              navigate("/transactios/detail/" + a.data.orderId);
            },
            onPending: function (result) {
              destroyCart(token);
              dispatch(getCart(token));
              navigate("/transactions/detail/" + a.data.orderId);
            },
            onError: function () {
              deleteOrder(token, user, a.data.orderId);
            },
            onClose: function () {
              // deleteOrder(token, user, a.data.orderId);
              dispatch(getCart(token));
              alert("you closed the popup without finishing the payment");
            },
          });
        })
        .catch((r) => window.snap.hide());
    }
  }, [address]);

  const getCurrentStock = (item) => {
    return item.productId.data?.find((a) => a.code == item.code)
      ["stocks"]?.find((a) => a.size == item.size).stock;
  };

  return (
    <>
      <Navbar />
      <div className="header font-extrabold text-2xl uppercase tracking-wider px-8 mt-4 md:px-28 lg:px-52 md:mt-10">
        Keranjang Belanja
      </div>
      <Address
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        address={address}
        setAddress={setAddress}
      />
      {cart != null ? (
        <>
          <Wrapper>
            {cartExceed && (
              <div className="qty-exceed text-red-600">
                Terdapat produk dalam keranjang yang melebihi stok yang tersedia
              </div>
            )}
            <div className="content-wrapper flex flex-col lg:flex-row w-full lg:items-start">
              <Items className="md:basis-[65%]">
                {cart.products.map((item, index) => (
                  <div
                    className="item-content flex flex-col border-b-2 pb-4 mt-7"
                    key={index}
                  >
                    {item.qty > getCurrentStock(item) && (
                      <div className="qty-exceed-item text-red-600">{`Hanya ${getCurrentStock(
                        item
                      )} buah tersisa di stok.`}</div>
                    )}
                    <Item>
                      {item.productId.data?.filter((a) => a.code == item.code)
                        .map((a, index) => (
                          <Link
                            to={"/products/detail/" + item.productId.slug}
                            key={index}
                          >
                            <Img key={a.code} className="" src={a.img}></Img>
                          </Link>
                        ))}
                      <Detail className="ml-2 w-full">
                        <div className="top flex flex-row justify-between">
                          <Link to={"/products/detail/" + item.productId.slug}>
                            <div className="title font-bold text-md capitalize  text-gray-800">
                              {item.productId.name}
                            </div>
                          </Link>
                          <Exit
                            onClick={() =>
                              handleDelete(
                                item.productId._id,
                                item.code,
                                item.size
                              )
                            }
                          >
                            <Close />
                          </Exit>
                        </div>
                        <div className="color-size mt-0.5 flex flex-row text-gray-500 text-base font-semibold">
                          {item.productId.data?.filter((a) => a.code == item.code)
                            .map((a) => (
                              <div key={a.code} className="color lowercase ">
                                {a.colorId.name}
                              </div>
                            ))}
                          <div className="separator font-light ml-2 mr-3 ">
                            |
                          </div>
                          <div className="size lowercase ">{item.size}</div>
                        </div>

                        <div className="price mt-0.5 font-bold text-base">
                          Rp
                          <span className="text-lg">
                            {item.productId.price?.toLocaleString()}
                          </span>
                        </div>
                        <div className="total flex lg:flex-row flex-col lg:items-center lg:justify-between">
                          <Select
                            defaultValue={item.qty}
                            onChange={(a) =>
                              handleUpdate(
                                item.productId._id,
                                item.code,
                                item.size,
                                a.target.value
                              )
                            }
                            className="mt-4 text-base"
                          >
                            {cart &&
                              selectOption(item.qty, getCurrentStock(item))}
                          </Select>
                          <div className="price mt-0.5 font-bold text-base text-gray-500">
                            sub total :{" "}
                            <span className="font-bold ml-1 text-2xl  text-black">
                              Rp{" "}
                              <span className="text-2xl">
                                {(
                                  item.productId.price * item.qty
                                ).toLocaleString()}
                              </span>
                            </span>
                          </div>
                        </div>
                      </Detail>
                    </Item>
                  </div>
                ))}
              </Items>
              <Summaries className="md:basis-[35%]">
                <div className="title font-bold text-lg uppercase">
                  Ringkasan Pesanan
                </div>
                <Summary>
                  <SumTitle>Sub Total</SumTitle>
                  <SumValue>
                    Rp
                    <span className="text-lg">
                      {totalPrice.toLocaleString()}
                    </span>
                  </SumValue>
                </Summary>
                <Summary>
                  <SumTitle>PPN</SumTitle>
                  <SumValue>
                    Rp
                    <span className="text-lg">
                      {((totalPrice * 10) / 100).toLocaleString()}
                    </span>
                  </SumValue>
                </Summary>
                <Summary>
                  <div className="font-extrabold text-lg">Order Total</div>
                  <SumValue>
                    Rp
                    <span className="text-lg">
                      {(totalPrice + (totalPrice * 10) / 100).toLocaleString()}
                    </span>
                  </SumValue>
                </Summary>
                <Checkout onClick={() => setIsOpen(true)} disabled={cartExceed}>
                  Checkout
                </Checkout>
              </Summaries>
            </div>
          </Wrapper>
        </>
      ) : (
        <Notfound msg={"you have no product in your cart"} />
      )}
    </>
  );
};

export default Cart;

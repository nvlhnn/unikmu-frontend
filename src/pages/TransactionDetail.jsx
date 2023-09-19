import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import Countdown from "../components/Countdown";
import Navbar from "../components/Navbar";
import { userRequest } from "../requestMethod";

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

const Button = tw.button`
    bg-prime-dark-20 
    text-white 
    tracking-wide
    p-3
    font-bold
    mt-4
    capitalize
    w-full
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

const Info = tw.div` 
    // flex
    // flex-row
    // justify-between
    // items-center
    grid 
    grid-flow-row 
    grid-cols-2
    capitalize
`;

const Key = tw.div` 
    font-bold
    vertical-align[top]
    pb-1
    lowercase
`;

const Value = tw.div`
    text-right
    vertical-align[center]
    py-0.5
    
`;

const SummariesWrapper = tw.div`

`;

const TransactionDetail = () => {
  const [order, setOrder] = useState(null);
  const token = useSelector((state) => state.user.currentUser.token);
  const userId = useSelector((state) => state.user.currentUser.user.id);
  const navigate = useNavigate();
  const [diff, setDiff] = useState(null);
  const { orderId } = useParams();

  const getOrder = async () => {
    try {
      const res = await userRequest(token).get(
        "/orders/" + userId + "/" + orderId
      );
      setOrder(res.data);
      setDiff(moment(res.data.expiredDate).diff(moment(), "seconds"));
    } catch (error) {}
  };

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    if (diff && diff <= 1 && diff >= 0) {
      getOrder();
      // navigate("/");
    }
  }, [diff]);

  const handleSnap = () => {
    window.snap.pay(order.token);
  };

  const timer = (order) => (
    <Summaries>
      <div className="flex capitalize flex-row justify-between items-center">
        <SumTitle>expired date</SumTitle>
        <div>{moment(order.expiredDate).format("DD MMMM YYYY HH:mm")}</div>
        {/* <Countdown date={order.expiredDate} /> */}
      </div>
      <div className="flex flex-row justify-between items-center">
        <SumTitle>payment expired in</SumTitle>
        <Countdown date={order.expiredDate} setDiff={setDiff} diff={diff} />
      </div>
      <Button onClick={handleSnap}>Complete Payment</Button>
    </Summaries>
  );

  return (
    <>
      <Navbar />
      <div className="header font-extrabold text-2xl uppercase tracking-wider px-8 mt-4 md:px-28 lg:px-52 md:mt-10">
        Transaction Detail
      </div>
      {order != null && (
        <>
          <Wrapper>
            <div className="content-wrapper flex flex-col lg:flex-row w-full lg:items-start">
              <Items className="md:basis-[65%]">
                {order.products.map((item, index) => (
                  <div
                    className="item-content flex flex-col border-b-2 pb-4 mt-7"
                    key={index}
                  >
                    <Item>
                      {item.productId.data
                        .filter((a) => a.code == item.code)
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
                        </div>
                        <div className="color-size mt-0.5 flex flex-row text-gray-500 text-base font-semibold">
                          {item.productId.data
                            .filter((a) => a.code == item.code)
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
                            {item.productId.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="total flex lg:flex-row flex-col lg:items-center lg:justify-between">
                          <Select
                            defaultValue={item.qty}
                            className="mt-4 text-base"
                            disabled
                          >
                            <Option>{item.qty}</Option>
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
              <SummariesWrapper>
                <Summaries>
                  <div className="title font-bold text-lg uppercase mb-5">
                    Ringkasan Pemesanan
                  </div>
                  <Info>
                    <Key>order date</Key>
                    <Value className="font-bold">
                      {moment(order.createdAt).format("LL")}
                    </Value>
                    <Key>order id</Key>
                    <Value className="break-words">{order._id}</Value>
                    <Key>status</Key>
                    <Value
                      className={
                        " text-lg font-bold " +
                        (order.status == "approved"
                          ? "text-green-400"
                          : order.status == "expired"
                          ? "text-red-400"
                          : order.status == "pending"
                          ? "text-blue-400"
                          : "")
                      }
                    >
                      {order.status}
                    </Value>
                    <Key>shipping adress</Key>
                    <Value>{order.address}</Value>
                  </Info>
                </Summaries>
                <Summaries className="md:basis-[35%]">
                  <div className="title font-bold text-lg uppercase">
                    Ringkasan Pembayaran
                  </div>
                  <Summary>
                    <SumTitle>Sub Total</SumTitle>
                    <SumValue>
                      Rp
                      <span className="text-lg">
                        {order.total.toLocaleString()}
                      </span>
                    </SumValue>
                  </Summary>
                  <Summary>
                    <SumTitle>PPN</SumTitle>
                    <SumValue>
                      Rp
                      <span className="text-lg">
                        {order.tax.toLocaleString()}
                      </span>
                    </SumValue>
                  </Summary>
                  <Summary>
                    <div className="font-extrabold text-lg">Order Total</div>
                    <SumValue>
                      Rp
                      <span className="text-lg">
                        {order.orderTotal.toLocaleString()}
                      </span>
                    </SumValue>
                  </Summary>
                  {/* <Checkout onClick={() => setIsOpen(true)}>Checkout</Checkout> */}
                </Summaries>
                {diff && diff >= 1 && order.status == "pending"
                  ? timer(order)
                  : ""}
              </SummariesWrapper>
            </div>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default TransactionDetail;

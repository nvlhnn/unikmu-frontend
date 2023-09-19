import { KeyboardArrowDown, ModeComment } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import tw from "twin.macro";
import Navbar from "../components/Navbar";
import { userRequest } from "../requestMethod";
import Moment from "moment";
import { Link } from "react-router-dom";
import Nodefound from "../components/Notfound";
// import { orders } from '../data'

const Container = tw.div`
    flex
    flex-col
    lg:px-52
    md:px-28
    p-8
`;

const Items = tw.div`
    flex
    flex-col
`;

const Loader = tw.div`
  pt-8
  flex 
  justify-center 
  items-center
  text-lg
  font-bold
  hover:text-gray-400
  cursor-pointer

`;

const Item = tw.div`
    flex
    flex-col
    w-full
    bg-gray-200
    rounded
    p-3
    mb-5
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

const Row = tw.tr`

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

const Detail = tw.button`
    bg-prime-dark-20
    text-white
    px-3
    w-20    
    mt-4 
    // float-right  
    self-end
`;

const Transactions = () => {
  const [orders, setOrders] = useState(null);
  const token = useSelector((state) => state.user.currentUser.token);
  const userId = useSelector((state) => state.user.currentUser.user.id);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (token && userId) {
      const getOrders = async () => {
        try {
          const res = await userRequest(token).get("/orders/" + userId);
          setOrders(res.data);
        } catch (error) {}
      };

      getOrders();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="header font-extrabold text-2xl uppercase tracking-wider px-8 mt-4 md:px-28 lg:px-52 md:mt-10">
        Transactions
      </div>
      <Container>
        <Items>
          {orders?.length > 0 ? (
            orders
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, limit - 1)
              .map((a, index) => (
                <Item key={index}>
                  <Info>
                    <Key>order date</Key>
                    <Value className="font-bold">
                      {Moment(a.createdAt).format("LL")}
                    </Value>
                    <Key>order id</Key>
                    <Value className="break-words">{a._id}</Value>
                    <Key>status</Key>
                    <Value
                      className={
                        " text-lg font-bold " +
                        (a.status == "approved"
                          ? "text-green-400"
                          : a.status == "expired"
                          ? "text-red-400"
                          : a.status == "pending"
                          ? "text-blue-400"
                          : "")
                      }
                    >
                      {a.status}
                    </Value>
                    <Key>shipping adress</Key>
                    <Value>{a.address}</Value>
                    {/* <tbody>
                    <Row>
                      <Key>order date</Key>
                      <Value className="font-bold">
                        {Moment(a.createdAt).format("LL")}
                      </Value>
                    </Row>
                    <Row>
                      <Key>order id</Key>
                      <Value>{a._id}</Value>
                    </Row>
                    <Row>
                      <Key>status</Key>
                      <Value>{a.status}</Value>
                    </Row>
                    <Row>
                      <Key>shipping adress</Key>
                      <Value>{a.address}</Value>
                    </Row>
                  </tbody> */}
                  </Info>
                  <Detail>
                    <Link to={"/transactions/detail/" + a._id}>detail</Link>
                  </Detail>
                </Item>
              ))
          ) : (
            <Nodefound msg={"you have no transaction"} />
          )}
          {orders?.length > limit && (
            <Loader onClick={() => setLimit((limit) => limit + 5)}>
              <div className="mr-2">load more </div>
              <KeyboardArrowDown />
            </Loader>
          )}
        </Items>
      </Container>
    </>
  );
};

export default Transactions;

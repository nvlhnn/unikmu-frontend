import React from "react";
import Checkbox from "../components/Checkbox";
import Countdown from "../components/Countdown";
import ColorRadio from "../components/Radio";
import Thumbs from "../components/Thumbs";
import { product } from "../data";
import User from "../pages/User";

const Test = () => {
  return (
    // <Checkbox title={'xl'} id={'xl-size'} />
    // <>
    //     <ColorRadio id={'xl-size'} bg={'#121826'} name={'colr'} />
    //     <ColorRadio id={'wqe'} bg={'#4C5662'} name={'colr'} />
    //     <ColorRadio id={'qe'} bg={'#7F321A'} name={'colr'} />
    //     <ColorRadio id={'45'} bg={'#FF8500'} name={'colr'} />
    // </>

    // <Thumbs product={product} />
    // <Countdown date={"2022-04-11T09:25:20.094+00:00"} />
    <User />
  );
};

export default Test;

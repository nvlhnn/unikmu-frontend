import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import tw from "twin.macro";

const Container = tw.div`
    // p-3
    flex
    flex-row
    text-2xl
    font-bold
    justify-center
    items-center
    bg-transparent
`;

const Time = tw.div`
    ml-1

`;

const Countdown = ({ date, diff, setDiff }) => {
  const momentDate = moment(date);
  //   const [diff, setDiff] = useState(momentDate.diff(moment(), "seconds"));
  const prevDiff = useRef();
  const countdownId = useRef();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const setTimes = (diff) => {
    setHour(Math.floor((diff / (60 * 60)) % 24));
    setMinute(Math.floor((diff / 60) % 60));
    setSecond(Math.floor(diff % 60));
  };

  useEffect(() => {
    setTimes(diff);
    prevDiff.current = diff;
    if (diff <= 0) {
      clearInterval(countdownId.current);
      setTimes(0);
    }
  }, [diff]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setDiff(prevDiff.current - 1);
    }, 1000);
    countdownId.current = countdown;
  }, []);

  return (
    <>
      <Container>
        <Time>{String(hour).padStart(2, "0")}</Time>:
        <Time>{String(minute).padStart(2, "0")}</Time>:
        <Time>{String(second).padStart(2, "0")}</Time>
      </Container>
    </>
  );
};

export default Countdown;

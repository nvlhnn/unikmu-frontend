import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { publicRequest } from "../requestMethod";
// import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  ${tw`
        w-[75%]
        md:w-[40%]
  `}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const confirm = document.getElementsByName("confirmPassword")[0];
  const form = document.querySelector("#form");
  const navigate = useNavigate();
  useEffect(() => {}, [inputs]);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.password?.length > 0 &&
      inputs.confirmPassword?.length > 0 &&
      inputs.password !== inputs.confirmPassword
    ) {
      confirm.setCustomValidity("Passwords do not match");
    } else if (
      inputs.password?.length > 0 &&
      inputs.confirmPassword?.length > 0 &&
      inputs.password == inputs.confirmPassword
    ) {
      confirm.setCustomValidity("");
    }

    const valid = form.reportValidity();
    if (valid) {
      const regist = async () => {
        const res = await publicRequest.post("auth/register", inputs);
        return res.status;
      };

      regist();
      navigate("/login");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form id="form">
          <Input
            type={"text"}
            placeholder="name"
            name="name"
            onChange={onChange}
          />
          <Input
            type={"email"}
            placeholder="email"
            name="email"
            onChange={onChange}
          />
          <Input
            type={"password"}
            placeholder="password"
            name="password"
            onChange={onChange}
          />
          <Input
            type={"password"}
            placeholder="confirm password"
            name="confirmPassword"
            onChange={onChange}
            oninvalid="this.setCustomValidity('Enter User Name Here')"
            oninput="this.setCustomValidity('')"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

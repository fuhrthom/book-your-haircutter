import React from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { toast } from "react-hot-toast";
import { login } from "../../firebase/auth";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  height: 100vh;
  width: 50vh;
  object-fit: cover;
  flex: 0.5;
`;

const Title = styled.h3`
  color: #4e4b5c;
  font-size: 32px;
  font-weight: 800;
`;

const InputContainer = styled.form`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const Input = styled.input`
  border: 2px solid lightgrey;
  outline-width: 0;
  padding: 10px 5px;
  font-size: 16px;
  border-radius: 10px;
  width: 25rem;
  margin: 10px 0;
`;

const Button = styled.button`
  background: #db5a42;
  color: white;
  font-size: 26px;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 10px;
  width: 25rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  padding: 10px;

  :hover {
    background: #cc5640;
  }
`;

function Register() {
  const [email, setEmail, updateEmail] = useInput("");
  const [password, setPassword, updatePassword] = useInput("");
  const onSubmit = async (event) => {
    event.preventDefault();

    const notification = toast.loading("Signing in...");

    try {
      const [user, data] = await login(email, password);
      toast.dismiss(notification);
      toast.success("Successfully signed in!");
      console.log("sign in", user, data);
    } catch (e) {
      toast.dismiss(notification);
      toast.error(e.message);
    }
  };

  return (
    <Container>
      <InputContainer onSubmit={onSubmit}>
        <Title>Login</Title>
        <Input placeholder={"e-mail"} value={email} onChange={updateEmail} />
        <Input
          placeholder={"password"}
          type={"password"}
          value={password}
          onChange={updatePassword}
        />
        <Button type={"submit"}>Login</Button>
      </InputContainer>
      <Image src="/salon.webp" alt="salon" />
    </Container>
  );
}

export default Register;

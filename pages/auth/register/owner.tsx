import React from "react";
import styled from "styled-components";
import useInput from "../../../hooks/useInput";
import { toast } from "react-hot-toast";
import { registerCustomer, registerOwner } from "../../../firebase/auth";

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
  const [name, setName, updateName] = useInput("");
  const [address, setAddress, updateAddress] = useInput("");
  const [email, setEmail, updateEmail] = useInput("");
  const [password, setPassword, updatePassword] = useInput("");
  const [phone, setPhone, updatePhone] = useInput("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const notification = toast.loading("Creating...");

    try {
      const [user, data] = await registerOwner(
        email,
        password,
        phone,
        name,
        address
      );
      console.log("user", user, "data", data);
      toast.dismiss(notification);
      toast.success("Successfully registered!");
    } catch (e) {
      toast.dismiss(notification);
      toast.error(e.message);
      console.log("Auth error", e);
    }
  };

  return (
    <Container>
      <InputContainer onSubmit={onSubmit}>
        <Title>Register as a Salon</Title>
        <Input placeholder={"name"} value={name} onChange={updateName} />
        <Input
          placeholder={"address"}
          value={address}
          onChange={updateAddress}
        />
        <Input placeholder={"e-mail"} value={email} onChange={updateEmail} />
        <Input
          placeholder={"password"}
          type={"password"}
          value={password}
          onChange={updatePassword}
        />
        <Input placeholder={"phone"} value={phone} onChange={updatePhone} />
        <Button type={"submit"}>Register</Button>
      </InputContainer>
      <Image src="/salon.webp" alt="salon" />
    </Container>
  );
}

export default Register;

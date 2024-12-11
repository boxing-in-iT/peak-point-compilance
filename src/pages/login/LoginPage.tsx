import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { login } from "../../store/features/authSlice";

// Styles for the page container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  font-family: "Arial", sans-serif;
`;

// Styles for the login form
const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;

  @media (max-width: 368px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #6e8efb;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  background-color: #6e8efb;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5a7cfb;
  }
`;

const Link = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #6e8efb;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>
          <Link href="#">Forgot password?</Link>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

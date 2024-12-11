import React from "react";
import styled, { keyframes } from "styled-components";

// Анимация вращения для индикатора загрузки
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Стили для контейнера с загрузчиком
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f0f0f0;
`;

// Стили для круга (loader)
const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

// Стили для текста
const Text = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;

const LoaderComponent = () => {
  return (
    <LoaderContainer>
      <Loader />
      <Text>Загрузка...</Text>
    </LoaderContainer>
  );
};

export default LoaderComponent;

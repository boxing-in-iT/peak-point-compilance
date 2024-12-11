import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/home/MainPage";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

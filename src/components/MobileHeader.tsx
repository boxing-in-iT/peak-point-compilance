import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (min-width: 850px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  flex-grow: 1;
  text-align: center;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 18px;
  width: 24px;
  cursor: pointer;

  span {
    display: block;
    height: 3px;
    background-color: #333;
    border-radius: 3px;
  }
`;

const EditIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 50%;
  cursor: pointer;
`;

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader = ({ onMenuToggle }: MobileHeaderProps) => {
  return (
    <HeaderContainer>
      <Hamburger onClick={() => onMenuToggle()}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      <Title>Peak Point Compliance</Title>
      <EditIcon />
    </HeaderContainer>
  );
};

export default MobileHeader;

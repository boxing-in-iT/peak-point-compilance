import { CircleX } from "lucide-react";
import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
`;

const InputContainer = styled.div``;

const Input = styled.input`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
`;

const ResultContainer = styled.div``;

interface SearchPageProps {
  toggleSearchModal: () => void;
}

const SearchPage = ({ toggleSearchModal }: SearchPageProps) => {
  return (
    <ModalWrapper>
      <InputContainer>
        <Input />
        <CloseButton>
          <CircleX />
        </CloseButton>
      </InputContainer>
      <ResultContainer></ResultContainer>
    </ModalWrapper>
  );
};

export default SearchPage;

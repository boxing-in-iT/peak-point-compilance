import styled from "styled-components";
import Input from "./Input";
import ChatArea from "./ChatArea";
// import { Edit, Search } from "lucide-react";
// import { useAppDispatch } from "../../../hooks/useAppDispatch";
// import { useAppSelector } from "../../../hooks/useAppSelector";
// import { useEffect, useState } from "react";
// import { setCurrentChat } from "../../../store/features/chatsSlice";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;

  @media (max-width: 850px) {
    padding-top: 50px;
  }
`;

// const TopBar = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const Avatar = styled.div`
//   background-color: #ddd;
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   background-image: url("https://via.placeholder.com/36");
//   background-size: cover;
// `;
// interface ChatContainerProps {
//   messages?: string[];
//   openModal: () => void;
// }

export default function ChatContainer() {
  // const dispatch = useAppDispatch();
  // const currentChat = useAppSelector((state) => state.chats.currentChat);
  // const [loading, setLoading] = useState(true);

  // const habdleClearCurrentChat = () => {
  //   dispatch(setCurrentChat(null));
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false); // Симулируем завершение загрузки
  //   }, 3000); // 3 секунды задержки
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <>
      <Container>
        {/* <TopBar>
          <div style={{ display: "flex", gap: "15px" }}>
            <Search size={20} onClick={openModal} />
            <Edit
              style={{ cursor: "pointer" }}
              size={20}
              onClick={habdleClearCurrentChat}
            />
          </div>
          <Avatar />
        </TopBar> */}

        <ChatArea />
        <Input />
      </Container>
    </>
  );
}

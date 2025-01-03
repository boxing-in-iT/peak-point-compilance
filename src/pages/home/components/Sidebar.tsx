import styled from "styled-components";
import logo from "../../../assets/logo.svg";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setCurrentChat } from "../../../store/features/chatsSlice";
import {
  getChatsForLast7Days,
  getChatsForToday,
  getChatsForYesterday,
} from "../../../utils/dateUtils";
import { IChat } from "../../../types/chat";

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 20px;

  @media (max-width: 850px) {
    padding-top: 60px;
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100vh; // занимает всю высоту экрана
    background-color: #fff;
    border-right: 1px solid #ccc;
    z-index: 1000; // чтобы он был поверх остального контента
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }

  @media (min-width: 851px) {
    display: flex; // Для экранов больше 850px сайдбар всегда видим
  }
`;

const Logo = styled.img`
  width: 132px;
  margin-bottom: 30px;
`;

const History = styled.div`
  width: 100%;
  flex-grow: 1;

  h3 {
    font-size: 28px;
    font-weight: 300;
    line-height: 27px;
    margin-bottom: 25px;
    color: #333;
  }

  h4 {
    font-size: 14px;
    font-weight: 500;
    line-height: 27px;
    margin-bottom: 10px;
    color: black;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 14px;
      margin: 5px 0;
      color: #666;
      cursor: pointer;

      &:hover {
        color: #444;
      }
    }
  }
`;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.chats);

  const handleChatClick = (chat: IChat) => {
    dispatch(setCurrentChat(chat));
  };

  const chatsForToday = getChatsForToday(chats);
  const chatsForYesterday = getChatsForYesterday(chats);
  const chatsForLast7Days = getChatsForLast7Days(
    chats,
    chatsForToday,
    chatsForYesterday
  );

  console.log("Чаты за сегодня:", chatsForToday);
  console.log("Чаты за вчера:", chatsForYesterday);
  console.log("Чаты за последние 7 дней:", chatsForLast7Days);

  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo src={logo} alt="Logo" />
      <History>
        <h3>History</h3>

        {chatsForToday && (
          <>
            <h4>Today</h4>
            {chatsForToday.map((chat) => (
              <>
                <ul key={chat.id}>
                  <li onClick={() => handleChatClick(chat)}>{chat.name}</li>
                </ul>
              </>
            ))}
          </>
        )}
        {chatsForYesterday && (
          <>
            <h4>Yesterday</h4>
            {chatsForYesterday.map((chat) => (
              <ul key={chat.id}>
                <li onClick={() => handleChatClick(chat)}>{chat.name}</li>
              </ul>
            ))}
          </>
        )}
        {chatsForLast7Days && (
          <>
            <h4>Last 7 days</h4>
            {chatsForLast7Days.map((chat) => (
              <ul key={chat.id}>
                <li onClick={() => handleChatClick(chat)}>{chat.name}</li>
              </ul>
            ))}
          </>
        )}
      </History>
    </SidebarContainer>
  );
};

export default Sidebar;

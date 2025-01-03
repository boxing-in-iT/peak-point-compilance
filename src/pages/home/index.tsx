// import { useState } from "react";
// import MobileHeader from "../../components/MobileHeader";
import ChatContainer from "./components/ChatContainer";
// import Sidebar from "./components/Sidebar";

const MainPage = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isSearchModalVisible, setSearchModalVisible] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const toggleSearchModal = () => {
  //   setSearchModalVisible(!isSearchModalVisible);
  // };
  return (
    <>
      {/* <Sidebar isOpen={isMenuOpen} /> */}
      {/* <MobileHeader onMenuToggle={toggleMenu} /> */}
      {/* <ChatContainer openModal={toggleSearchModal} /> */}
      <ChatContainer />

      {/* <Modal isVisible={isSearchModalVisible} onClose={toggleSearchModal}>
        <SearchPage toggleSearchModal={toggleSearchModal} />
      </Modal> */}
    </>
  );
};

export default MainPage;

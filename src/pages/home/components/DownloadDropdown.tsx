import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Download } from "lucide-react";

const DropdownContainer = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  font-size: 24px;
  color: #3498db;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 8px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 250px;
  z-index: 9999; /* Убедитесь, что z-index выше */
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const DownloadTitle = styled.p`
  font-size: 14px;
  font-weight: 100;
  color: gray;
  margin: 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
`;

const DownloadDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={handleToggle}>
        <Download size={20} />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DownloadTitle>Download</DownloadTitle>
          <DropdownItem onClick={() => alert("Download JSON")}>
            JSON
          </DropdownItem>
          <DropdownItem onClick={() => alert("Download CSV")}>CSV</DropdownItem>
          <DropdownItem onClick={() => alert("Download DOCX")}>
            DOCX
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DownloadDropdown;

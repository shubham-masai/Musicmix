import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  ${({ type }) => {
    if (type === "success") {
      return `
        background-color: #42a642; 
      `;
    } else if (type === "error") {
      return `
        background-color: #e74c3c;
      `;
    }
  }}
`;

function Toast({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return isVisible ? (
    <ToastContainer type={type}>{message}</ToastContainer>
  ) : null;
}

export default Toast;
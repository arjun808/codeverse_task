import React from "react";

function Modal({ children, setIsOpen }) {
  return (
    <div className="z-99999  bg-white border-2 rounded-2xl  flex items-center justify-center p-4 h-auto absolute w-auto">
      <div>
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          ❌
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;

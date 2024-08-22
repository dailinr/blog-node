import React from "react";

const ToastError = ({ mensaje }) => {
  return (
    <div className="ToastError">

      <div className="toast rounded-lg w-48 h-16  bg-[#e5202a] text-[#ffffff]">
        <div className="flex flex-row w-full gap-5  items-center px-4 w-full h-full">
          <div className="my-auto text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-alert-circle" >

              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
              
            </svg>
          </div>

          <div>
            <div className="font-bold text-sm"> {mensaje} </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default ToastError;

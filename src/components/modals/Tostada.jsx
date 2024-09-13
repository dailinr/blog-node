import React from "react";

const Tostada = ({ mensaje }) => {
  return (
    <div className="Tostada">

      <div className="toast rounded-lg w-48 h-16  bg-[#008000] text-[#ffffff]">
        <div className="flex flex-row w-full gap-5  items-center px-4 w-full h-full">
          <div className="my-auto text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check-circle" >

              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <path d="m9 11 3 3L22 4"></path>

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

export default Tostada;

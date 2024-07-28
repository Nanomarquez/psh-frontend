/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchTopScoresAction } from "../redux/slices/statSlice";

const FetchButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-auto"
      onClick={() => dispatch(fetchTopScoresAction())}
    >
      Fetch
    </button>
  );
};

export default FetchButton;

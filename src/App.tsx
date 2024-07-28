import React from "react";
import PlayerStats from "./components/PlayerStats";
import { Spinner } from "./components/Spinner";
import { Toast } from "./components/Toast";

const App: React.FC = () => {
  return (
    <div className="w-screen md:h-screen flex flex-col items-center justify-center bg-slate-300 p-2">
      <Toast />
      <Spinner />
      <PlayerStats />
    </div>
  );
};

export default App;

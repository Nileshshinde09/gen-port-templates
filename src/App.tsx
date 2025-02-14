import React from "react";
import { Navbar } from "./components";
import { Home } from "./pages";
const App = (): React.ReactNode => {
  return (
      <main className="w-full h-full">
        <Navbar />
        <Home/>
      </main>
  );
};

export default App;
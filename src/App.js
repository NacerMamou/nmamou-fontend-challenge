import "./App.css";

import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Dashboard from "./routes/dashboard/dashboard.route.jsx";
import { useContext, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

// for (let i = 1; i < 2; i++) {
//   for (let j = 0; j < 12; j++) {
//     periodLeftDate = Date.UTC(2018 + i, j, 1);
//     console.log(`Request for:(${2018 + i}), ${j}, 1`);
//     let st = getStringDate(periodLeftDate);
//     console.log(`Getting: ${st}`);
//     // console.log(getIndexOfStartingDate(periodLeftDate, record));
//     let data = getVolumeForCustomPeriod(record, periodLeftDate, 3);
//     console.log(data);
//   }
// }

{
  /* <div className="App">
        <BeginDateSelector label={"From"} options={opt} />
        <EndDateSelector label={"To"} options={opt} />
        <SecondaryChart />
        <Chart />
        <button>click 1</button>
        <button>Click 2</button>
        <button>Click 3</button>
      </div> */
}

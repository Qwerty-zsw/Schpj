import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./Login/LoginPage";
import Signup from "./Signup/Signup";

const App = () => {
  return (
    <div className="w-100 h-100">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="ورود" element={<LoginPage />} />
          <Route path="ثبت-نام" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

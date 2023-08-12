import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/loading/Loading";
import { lazy, Suspense } from "react";

const Home = lazy(() => import('./components/home/Home'));
const Login = lazy(() => import('./components/login/Login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

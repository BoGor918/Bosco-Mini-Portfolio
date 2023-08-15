// others
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// page components
import Loading from "./components/loading/Loading";
// lazy load components
const Home = lazy(() => import('./components/home/Home'));
const Login = lazy(() => import('./components/login/Login'));

function App() {
  // url parameter
  const queryParameters = new URLSearchParams(window.location.search)
  const widget = queryParameters.get("w")

  useEffect(() => {
    if (widget !== "1" && widget !== "2" && widget !== "3" && widget !== "4") {
      window.location.href = "/?w=1";
    }
  }, [widget]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* link setup */}
          <Route path="/?w=1" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
/* eslint-disable react-hooks/exhaustive-deps */
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
    if (window.location.pathname === "/") {
      if (widget !== "1" && widget !== "2" && widget !== "3" && widget !== "4") {
        window.location.href = "/?w=1";
      }
    }
  }, [widget]);

  // set theme color to meta content and body background color
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (localStorage.getItem('theme') === 'dark') {
      themeColorMeta?.setAttribute('content', '#0B1A33'); // Set the new theme color
      document.body.style.backgroundColor = '#0B1A33';
    } else if (localStorage.getItem('theme') === 'light') {
      themeColorMeta?.setAttribute('content', '#FFFFFF'); // Set the new theme color
      document.body.style.backgroundColor = '#FFFFFF';
    }
  }, [localStorage.getItem('theme')]);

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
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { routes } from "@/router";
import { TOKEN_LOCAL_STORAGE } from "@/app-constants";

const localStorageToken = localStorage.getItem(TOKEN_LOCAL_STORAGE);

const publicRoute = routes.filter(({ isPublic }) => isPublic);
const pathPublicRoutes = publicRoute.map(({ path }) => path);

const publicRoutes = publicRoute.map(({ component: Component, path }) => (
  <Route key={path} path={path} element={<Component />} />
));

const privateRoutes = routes
  .filter(({ isPublic }) => Boolean(!isPublic))
  .map(({ component: Component, path }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

export const AppRoutes = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (localStorageToken) {
      navigate("/workflow");
    } else {
      navigate(
        pathPublicRoutes.includes(pathname) ? pathname : pathPublicRoutes[0]
      );
    }
  }, []);

  return <Routes>{localStorageToken ? privateRoutes : publicRoutes}</Routes>;
};

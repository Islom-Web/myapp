import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import "./App.css";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = lazy(() => import("./user/pages/Users"));
const NewReview = lazy(() => import("./places/pages/NewReview"));
const UserReviews = lazy(() => import("./places/pages/UserReviews"));
const UpdateReview = lazy(() => import("./places/pages/UpdateReview"));
const Auth = lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" index element={<Users />} />
        <Route path="/:userId/places" element={<UserReviews />} />
        <Route path="/places/new" element={<NewReview />} />
        <Route path="/places/:placeId" element={<UpdateReview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" index element={<Users />} />
        <Route path="/:userId/places" element={<UserReviews />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;

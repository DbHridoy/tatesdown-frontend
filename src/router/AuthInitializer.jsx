import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../redux/api/userApi";
import { logout } from "../redux/slice/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const { error, isLoading } = useGetMeQuery(undefined, {
    skip: false,
  });

  useEffect(() => {
    if (error) {
      console.log("Auth invalid → logging out");
      dispatch(logout());
    }
  }, [error, dispatch]);

  if (isLoading) return null; // or splash screen

  return children;
};

export default AuthInitializer;

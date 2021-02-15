import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../App';
import { removeToken } from "../Utils/cookie";

export default function Logout() {
  const setUser = useContext(UserContext)[1];

  useEffect(() => {
    removeToken();
    setUser({});
  });
  
  return (
    <Redirect to="/" />
  );
}
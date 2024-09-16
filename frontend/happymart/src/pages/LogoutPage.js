import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {

    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setUser({ id: '' });


    navigate('/login');
  }, [navigate, setUser]);

  return (
    <div>
      <h1>Logging out...</h1>
      navigate('/')
    </div>
  );
};

export default LogoutPage;

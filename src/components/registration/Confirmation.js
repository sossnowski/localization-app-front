import React from 'react';
import { useParams } from 'react-router-dom';
import { authGetRequestWithParams } from '../../helpers/apiRequests';
import history from '../../history';

const Confirmation = () => {
  const { token } = useParams();
  const confirmUser = async () => {
    const result = await authGetRequestWithParams('confirmUser', { token });
    if (result.status === 200) history.push(`/login/confirmationSuccess`);
    else history.push('/login');
  };
  React.useEffect(() => {
    confirmUser();
  }, []);
  return null;
};

export default Confirmation;

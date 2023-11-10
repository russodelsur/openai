import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const cookies = localStorage.getItem("token");
    const refresh = async () => {
        const response = await axios.post('/.netlify/functions/refreshToken',    
        JSON.stringify({cookies}),
         {
            withCredentials: true
        }
        );
        const { token, user, role } = response.data.user;
        localStorage.setItem("token", token);
        setAuth({ user, role, token });
    }
    return refresh;
};

export default useRefreshToken;
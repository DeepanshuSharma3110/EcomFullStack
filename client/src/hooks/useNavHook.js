import { useNavigate } from 'react-router-dom';

const useNav = (location,delay=1000) => {
    const navigate = useNavigate();

    const navigateTo = (location, delay = 1000) => {
        setTimeout(() => {
            navigate(location);
        }, delay);
    };

    return navigateTo; 
};

export default useNav;
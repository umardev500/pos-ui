import {authService} from '@app/services/auth';
import {mmkvStorage} from '@app/storage';
import {useUserStore} from '@app/stores';
import {useQuery} from '@tanstack/react-query';

const TOKEN_KEY = 'user.token';

// Fetch user data from API
const fetchUserData = async () => {
  const token = mmkvStorage.getString(TOKEN_KEY);
  if (!token) {
    throw new Error('No token found');
  }
  return authService.getMe();
};

// Hook to fetch and set user data
const useSetUserData = () => {
  const setUser = useUserStore(state => state.setUser);

  const {isLoading, isError, error, data} = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  if (data) {
    setUser(data);
  }

  return {isLoading, isError, error};
};

export const userHooks = {
  useSetUserData,
};

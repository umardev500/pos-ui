import {USER_TOKEN_KEY} from '@app/constants';
import {authService} from '@app/services/auth';
import {mmkvStorage} from '@app/storage';
import {useUserStore} from '@app/stores';
import {useMutation} from '@tanstack/react-query';

const useLogin = () => {
  const setUser = useUserStore(state => state.setUser);

  return useMutation({
    mutationFn: (values: {email: string; password: string}) => authService.login(values.email, values.password),
    onSuccess: async data => {
      mmkvStorage.set(USER_TOKEN_KEY, data.access_token);
      const user = await authService.getMe();
      setUser(user);
    },
    onError: error => {
      console.log(error);
      // handle error state or feedback
    },
  });
};

export const authHooks = {
  useLogin,
};

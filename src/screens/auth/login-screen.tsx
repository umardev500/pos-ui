import {authService} from '@app/services/auth';
import {useMutation} from '@tanstack/react-query';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const {mutate} = useMutation({
    mutationFn: () => authService.login('admin@gmail.com', 'admin'),
    onSuccess: data => console.log(data),
    onError: error => console.log(error),
  });

  const handleLogin = () => {
    mutate();
  };

  return (
    <SafeAreaView>
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
};

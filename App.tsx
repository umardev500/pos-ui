import {userHooks} from '@app/hooks';
import {AppNavigator} from '@app/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import './global.css';

const queryClient = new QueryClient();

function App() {
  userHooks.useSetUserData();

  return <AppNavigator />;
}

export default function Wrapper() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

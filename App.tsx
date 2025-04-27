import {LoadingFull} from '@app/components/atoms';
import {userHooks} from '@app/hooks';
import {AppNavigator} from '@app/navigation';
import {sleep} from '@app/utils';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import './global.css';

const queryClient = new QueryClient();

function App() {
  const [isReady, setIsReady] = useState(false);
  const {isLoading} = userHooks.useSetUserData();

  const handleSetReady = async () => {
    await sleep(100);
    setIsReady(true);
  };

  useEffect(() => {
    if (!isLoading) {
      handleSetReady();
    }
  }, [isLoading]);

  return <>{isReady ? <AppNavigator /> : <LoadingFull size={35} />}</>;
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

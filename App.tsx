import {userHooks} from '@app/hooks';
import {LoginScreen} from '@app/screens';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './global.css';

const queryClient = new QueryClient();

function App() {
  userHooks.useSetUserData();

  return <LoginScreen />;
}

export default function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View className="bg-red-200">
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

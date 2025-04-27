import LottieView, {AnimationObject} from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  size?: number;
  source?:
    | string
    | AnimationObject
    | {
        uri: string;
      }
    | undefined;
};

export const Loading: React.FC<Props> = props => {
  const {size = 24, source = require('@app/assets/anim/loading-primary.json')} = props;

  return (
    <LottieView
      colorFilters={[
        {
          keypath: 'LayerName', // ← name of the layer you want to color
          color: 'red', // ← color you want
        },
      ]}
      source={source}
      autoPlay
      loop
      style={{width: size, height: size}}
    />
  );
};

export const LoadingFull: React.FC<Props> = props => {
  const {top} = useSafeAreaInsets();

  const {size = 24, source = require('@app/assets/anim/loading-primary.json')} = props;

  return (
    <View className="flex-1 items-center justify-center" style={{paddingTop: top}}>
      <Loading size={size} source={source} />
    </View>
  );
};

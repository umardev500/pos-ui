import LottieView from 'lottie-react-native';
import React from 'react';

type Props = {
  size?: number;
};

export const Loading: React.FC<Props> = props => {
  const {size = 24} = props;

  return (
    <LottieView
      colorFilters={[
        {
          keypath: 'LayerName', // ← name of the layer you want to color
          color: 'red', // ← color you want
        },
      ]}
      source={require('@app/assets/anim/loading-white-com.json')}
      autoPlay
      loop
      style={{width: size, height: size}}
    />
  );
};

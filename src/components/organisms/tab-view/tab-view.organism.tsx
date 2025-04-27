import {RenderScene} from '@app/types';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {NavigationState, TabView as ReactNativeTabView, Route} from 'react-native-tab-view';

type Props = {
  routes: Route[];
  renderScene: RenderScene;
};

export const TabView: React.FC<Props> = props => {
  const {routes, renderScene} = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const navigationState: NavigationState<Route> = {
    index,
    routes,
  };

  return (
    <ReactNativeTabView
      navigationState={navigationState}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

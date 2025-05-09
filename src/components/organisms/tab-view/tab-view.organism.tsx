import {colors} from '@app/styles';
import {RenderScene} from '@app/types';
import clsx from 'clsx';
import React, {useState} from 'react';
import {Pressable, Text, useWindowDimensions, View} from 'react-native';
import {NavigationState, TabView as ReactNativeTabView, Route, TabBar, TabBarProps} from 'react-native-tab-view';

type Props = {
  routes: Route[];
  renderScene: RenderScene;
  onIndexChange?: (index: number) => void;
};

const TAB_ITEM_W = 100;

export const TabView: React.FC<Props> = props => {
  const {routes, renderScene, onIndexChange} = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const tabState: NavigationState<Route> = {
    index,
    routes,
  };

  const handleIndexChange = (idx: number) => {
    setIndex(idx);
    onIndexChange?.(idx);
  };

  const renderTabBar = (tabProps: TabBarProps<Route>) => (
    <TabBar
      {...tabProps}
      scrollEnabled
      inactiveColor="black"
      tabStyle={{width: TAB_ITEM_W}}
      activeColor={colors.orange[500]}
      indicatorStyle={{backgroundColor: colors.orange[500]}}
      style={{backgroundColor: colors.white}}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0)',
      }}
      renderTabBarItem={tabItemProps => {
        const {route, activeColor, inactiveColor, navigationState, onPress} = tabItemProps;
        const activeRoute = navigationState.routes[navigationState.index];
        const isActive = route.key === activeRoute.key;

        return (
          <Pressable onPress={onPress}>
            <View className="flex-row items-center justify-center h-12 " style={{width: TAB_ITEM_W}}>
              <Text
                style={{color: isActive ? activeColor : inactiveColor}}
                className={clsx('text-sm font-medium text-center', {})}
                numberOfLines={1}
                ellipsizeMode="tail">
                {route.title}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );

  return (
    <ReactNativeTabView
      key={layout.width}
      lazy
      navigationState={tabState}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
};

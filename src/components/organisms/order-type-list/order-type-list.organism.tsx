import {TabView} from '@app/components/organisms/tab-view';
import {useOrderTypes} from '@app/hooks';
import {useCartStore} from '@app/stores';
import {OrderTypeDTO} from '@app/types';
import React from 'react';
import {Text} from 'react-native';
import {SceneMap} from 'react-native-tab-view';

type Props = {};

export const OrderTypeList: React.FC<Props> = ({}) => {
  const {data: orderTypes} = useOrderTypes() || {data: []};
  const isHaveOrderTypes = (orderTypes?.length || 0) > 0;

  // ————————————————————————————————————————————————
  // 📦 Global State Store
  // ————————————————————————————————————————————————
  const setAdditionalInfo = useCartStore(state => state.setAdditionalInfo);

  // Parse routes from orderTypes
  const routes =
    orderTypes?.map((type: OrderTypeDTO) => ({
      key: type.name, // Unique identifier
      title: type.label, // Display title
    })) || [];

  const scenes = SceneMap(
    (orderTypes ?? []).reduce(
      (acc, type: OrderTypeDTO) => {
        acc[type.name] = () => (
          <>
            <Text>{type.label}</Text>
          </>
        );
        return acc;
      },
      {} as {[key: string]: () => React.JSX.Element},
    ),
  );

  const handleIndexChange = (idx: number) => {
    const selectedOrderType = orderTypes?.[idx];
    useCartStore.getState().setAdditionalInfo({orderType: selectedOrderType});
  };

  // Get initial tab index
  let initialTabIndex;
  if (orderTypes?.length) {
    const selectedOrderType = useCartStore.getState().additionalInfo?.orderType;
    initialTabIndex = orderTypes.findIndex((type: OrderTypeDTO) => type.name === selectedOrderType?.name);

    // Fallback to 0 if no match is found (i.e., findIndex returns -1)
    if (initialTabIndex === -1) {
      initialTabIndex = 0;
      setAdditionalInfo({orderType: orderTypes[0]});
    }
  }

  return (
    <>
      {isHaveOrderTypes && (
        <TabView
          initialTabIndex={initialTabIndex}
          onIndexChange={handleIndexChange}
          routes={routes}
          renderScene={scenes}
        />
      )}
    </>
  );
};

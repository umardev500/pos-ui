import {TabView} from '@app/components/organisms/tab-view';
import {useOrderTypes} from '@app/hooks';
import {useCartStore} from '@app/stores';
import {OrderTypeDTO} from '@app/types';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SceneMap} from 'react-native-tab-view';

type Props = {};

export const OrderTypeList: React.FC<Props> = ({}) => {
  const {data: orderTypes} = useOrderTypes() || {data: []};
  const isHaveOrderTypes = (orderTypes?.length || 0) > 0;

  // ————————————————————————————————————————————————
  // 🧠 State
  // ————————————————————————————————————————————————
  const [initialTabIndex, setInitialTabIndex] = useState(0);

  // ————————————————————————————————————————————————
  // 📦 Global State Store
  // ————————————————————————————————————————————————
  const setAdditionalInfo = useCartStore(state => state.setAdditionalInfo);
  const additionalInfo = useCartStore(state => state.additionalInfo);

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

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handleIndexChange = (idx: number) => {
    const selectedOrderType = orderTypes?.[idx];
    useCartStore.getState().setAdditionalInfo({orderType: selectedOrderType});
  };

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————
  useEffect(() => {
    const selectedOrderType = additionalInfo?.orderType;

    if (orderTypes?.length) {
      const foundIndex = orderTypes.findIndex((type: OrderTypeDTO) => type.name === selectedOrderType?.name);

      if (foundIndex !== -1) {
        setInitialTabIndex(foundIndex);
      } else {
        setInitialTabIndex(0);
        setAdditionalInfo({orderType: orderTypes[0]});
      }
    }
  }, [orderTypes]);

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

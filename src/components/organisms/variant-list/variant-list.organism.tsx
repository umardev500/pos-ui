import {VariantItem} from '@app/components/molecules';
import React from 'react';
import {FlatList} from 'react-native';

type Props = {
  data: any[]; // List of items to render
  onDelete: (index: number, data: any) => void;
};

/**
 * Displays a list of variant items and allows deletion of items
 */
export const VariantList: React.FC<Props> = ({data, onDelete}) => {
  // Handles item deletion by calling the onDelete prop
  const handleDelete = (index: number, item: any) => {
    onDelete(index, item);
  };

  // Render item for each variant in the list
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <VariantItem item={item} onDelete={() => handleDelete(index, item)} />;
  };

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16}} // Styling for list container
      data={data} // Data to render
      renderItem={renderItem} // Render each item
      keyExtractor={(item, index) => index.toString()} // Use index as a key for each item
    />
  );
};

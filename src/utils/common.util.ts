import {ImageSourcePropType} from 'react-native';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// convert string or ImageSourcePropType to ImageSourcePropType
export const getImageSource = (photo: string | ImageSourcePropType) => {
  return typeof photo === 'string' ? {uri: photo} : photo;
};

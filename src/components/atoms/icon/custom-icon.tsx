import {createIconSet} from '@react-native-vector-icons/common';
import {StyleProp, TextStyle} from 'react-native';

const glyphMap = {
  x: 0xe900,
  visibility: 0xe901,
  visibility_off: 0xe902,
  alternate_email: 0xe903,
  lock: 0xe904,
  favorite: 0xe905,
  layers: 0xe906,
  style: 0xe907,
  add: 0xe908,
  expand_content: 0xe909,
  local_mall: 0xe90a,
  assigment: 0xe90b,
  menu: 0xe90c,
  receipt: 0xe90d,
  search: 0xe90e,
  notification: 0xe90f,
  check_intermediate_small: 0xe910,
  remove: 0xe911,
};

export type IconName = keyof typeof glyphMap;

const IconRegular = createIconSet(glyphMap, {
  postScriptName: 'icomoon',
  fontFileName: 'icomoon.ttf',
});

const IconFill = createIconSet(glyphMap, {
  postScriptName: 'icomoon',
  fontFileName: 'icomoon.ttf',
});

type Props = {
  fill?: boolean;
  name: keyof typeof glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export const Icon = ({fill = false, name, size = 24, color = 'black', style}: Props) => {
  return fill ? (
    <IconFill name={name} size={size} color={color} style={style} />
  ) : (
    <IconRegular name={name} size={size} color={color} style={style} />
  );
};

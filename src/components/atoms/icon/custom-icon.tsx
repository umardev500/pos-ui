import {createIconSet} from '@react-native-vector-icons/common';
import {StyleProp, TextStyle} from 'react-native';

const glyphMap = {
  home: 0xe88a,
  search: 0xe8b6,
  low_priority: 0xe16d,
  more_vert: 0xe5d4,
  more_horiz: 0xe5d3,
  settings: 0xe8b8,
  arrow_back: 0xe5c4,
  notifications: 0xe7f4,
  task_alt: 0xe2e6,
  schedule: 0xe8b5,
  trending_up: 0xe8e5,
  show_chart: 0xe6e1,
  attach_money: 0xe227,
  style: 0xe41d,
  toll: 0xe8e0,
  settings_power: 0xe8c6,
  translate: 0xe8e2,
  g_translate: 0xe927,
  close: 0xe5cd,
  chevron_left: 0xe5cb,
  chevron_right: 0xe5cc,
  keyboard_arrow_up: 0xe316,
  keyboard_arrow_down: 0xe313,
  add: 0xe145,
  check: 0xe5ca,
  lock: 0xe897,
  email_alternate: 0xe0e6,
  arrow_upward: 0xe5d8,
  arrow_downward: 0xe5db,
  electric_bolt: 0xec1c,
  electrical_services: 0xf102,
  offline_bolt: 0xe932,
  paid: 0xf041,
  favorite: 0xe87d,
  vital_sign: 0xe650,
  restaurant: 0xe56c,
  local_laundry_service: 0xe54a,
  apparel: 0xef7b,
  location_on: 0xe0c8,
  nights_stay: 0xea46,
  routine: 0xe20c,
  wb_sunny: 0xe430,
  partly_cloudy_day: 0xf172,
  moon_stars: 0xf34f,
  bed_time: 0xef44,
  radio_button_unchecked: 0xe836,
  radio_button_checked: 0xe837,
  update: 0xe923,
  book_6: 0xf3df,
  history_toggle_off: 0xf17d,
  explore: 0xe87a,
  planet: 0xf387,
};

export type IconName = keyof typeof glyphMap;

const IconRegular = createIconSet(glyphMap, {
  postScriptName: 'Material Symbols Rounded Regular',
  fontFileName: 'ms.ttf',
});

const IconFill = createIconSet(glyphMap, {
  postScriptName: 'Material Symbols Rounded Filled',
  fontFileName: 'ms_fill.ttf',
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

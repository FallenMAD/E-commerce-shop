import { ESortValues, TSortValues } from '../types';

export const sortValues: TSortValues[] = [
  {
    value: ESortValues.ALL,
    label: 'All',
  },
  {
    value: ESortValues.HIGHEST,
    label: 'From highest to lowest',
  },
  {
    value: ESortValues.LOWEST,
    label: 'From lowest to highest',
  },
];

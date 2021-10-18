// interfaces
import { AnyObject } from 'interfaces/common';

export const getItem = (value: AnyObject) => value;
export const getItemId = (({ id }: AnyObject) => id);
export const getItemName = (({ name }: AnyObject) => name);
export const getItemValue = (({ value }: AnyObject) => value);

export const prepareValue = (value: string | number) => ({ value, label: value });

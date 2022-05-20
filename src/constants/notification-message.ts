import { isEmpty, isEqual } from 'lodash';
import { ERROR_KEY, ERROR_CODE } from './error-message';

const mapActionTypeToSuccessMessage = new Map([
  ['', 'Save changes Successfully!'],
]);

const mapActionTypeToErrorMessage = new Map([
  ['', 'Something wrong! Please try again!'],
]);

const mapActionTypeWithErrorMessageToIgnoreToastNotify = new Map([
  ['', ERROR_KEY.ERROR_SHIFT_VALIDATOR],
]);

const mapActionTypeErrorDuplicateDriver = new Map([
  ['', 'Something wrong! Please try again!'],
  [ERROR_CODE.ERROR_DUPLICATE_ID_CARD, 'The citizen ID is already registered, please try again'],
  [ERROR_CODE.ERROR_DUPLICATE_PHONE, 'The phone number is already registered, please try again'],
]);

export const getSuccessMessage = (actionType: string) => {
  const type = actionType.replace('/fulfilled', '');
  return mapActionTypeToSuccessMessage.get(type);
};

export const getErrorMessage = (actionType: string, actionError?: any) => {
  const errorMessage = actionError?.message;
  const code = actionError?.error?.code;
  const type = actionType.replace('/rejected', '');

  return !isEmpty(errorMessage) && isEqual(mapActionTypeWithErrorMessageToIgnoreToastNotify.get(type), errorMessage)
    ? null
    : code
    ? mapActionTypeErrorDuplicateDriver.get(code)
    : mapActionTypeToErrorMessage.get(type);
};

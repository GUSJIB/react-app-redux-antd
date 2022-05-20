import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from '../shared/reducers/reducer.utils';

export default () => next => action => {
  const { error, payload } = action;
  /**
   *
   * The notification middleware serves to add success and error notifications
   */
  if (isFulfilledAction(action) && payload) {
    const message = getSuccessMessage(action.type);
    if (!isEmpty(message)) {
      toast.success(message);
    }
  }

  if (isRejectedAction(action) && error && error.isAxiosError) {
    const { request, response } = error;
    const notInvalidTokenError = response?.status !== 401 && !request?.responseURL.includes('/oauth/token');
    if (notInvalidTokenError) {
      const responseError = action.error?.response?.data;
      const message = getErrorMessage(action.type, responseError);
      if (isEmpty(message) && message !== null) {
        toast.error(getErrorMessage(''));
      }
      toast.error(message);
    }
  }

  return next(action);
};

import { getErrorMessage, getSuccessMessage } from '../constants/notification-message';
import { isEmpty } from 'lodash';

import { useContext } from 'react';
import { AppStore } from '../contexts/appStore/store';
import { TOAST_ENUM } from '../contexts/appStore/reducer';
import type { ToastType } from '../components/Toast/Toast';

const useToast = () => {
  const { dispatch } = useContext(AppStore);

  const success = (message: string, title?: string) => {
    dispatch({
      type: TOAST_ENUM.SHOW_TOAST,
      payload: {
        open: true,
        type: 'success',
        title,
        message
      }
    });
  };

  const error = (message: string, title?: string) => {
    dispatch({
      type: TOAST_ENUM.SHOW_TOAST,
      payload: {
        open: true,
        type: 'error',
        title,
        message
      }
    });
  };

  const warning = (message: string, title?: string) => {
    dispatch({
      type: TOAST_ENUM.SHOW_TOAST,
      payload: {
        open: true,
        type: 'warning',
        title,
        message
      }
    });
  };

  const info = (message: string, title?: string) => {
    dispatch({
      type: TOAST_ENUM.SHOW_TOAST,
      payload: {
        open: true,
        type: 'info',
        title,
        message
      }
    });
  };

  const toast = (type: ToastType, message: string, title?: string) => {
    dispatch({
      type: TOAST_ENUM.SHOW_TOAST,
      payload: {
        open: true,
        type,
        title,
        message
      }
    });
  };

  const closeToast = () => {
    dispatch({
      type: TOAST_ENUM.HIDE_TOAST
    });
  };

  return { toast, closeToast, success, error, warning, info };
};
export default useToast;

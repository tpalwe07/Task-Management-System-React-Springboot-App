import type { ToastType } from '../../../components/Toast/Toast';

export enum TOAST_ENUM {
  SHOW_TOAST = 'SHOW_TOAST',
  HIDE_TOAST = 'HIDE_TOAST'
}

interface TOAST_PAYLOAD {
  open: boolean;
  type?: ToastType;
  title?: React.ReactNode;
  message: React.ReactNode;
}

type SHOW_TOAST_PAYLOAD = {
  type: TOAST_ENUM.SHOW_TOAST;
  payload: TOAST_PAYLOAD;
};

type HIDE_TOAST_PAYLOAD = {
  type: TOAST_ENUM.HIDE_TOAST;
};

export interface TOAST_STATE {
  toast: TOAST_PAYLOAD | null;
}

export type TOAST_ACTIONS = SHOW_TOAST_PAYLOAD | HIDE_TOAST_PAYLOAD;

export const initialToastState: TOAST_STATE = {
  toast: null
};

export const toastReducer = (state: TOAST_STATE, action: TOAST_ACTIONS) => {
  switch (action.type) {
    case TOAST_ENUM.SHOW_TOAST: {
      return {
        ...state,
        toast: {
          open: true,
          type: action.payload.type,
          title: action.payload.title,
          message: action.payload.message
        }
      };
    }

    case TOAST_ENUM.HIDE_TOAST: {
      return {
        ...state,
        toast: null
      };
    }

    default:
      return state;
  }
};

import React, { useContext } from 'react';
import Toast from '../Toast/Toast';
import { AppStore } from '../../contexts/appStore/store';
import { getToastState } from '../../contexts/appStore/selector';
import useToast from '../../hooks/responsive/useToast';

const ToastContainer: React.FC = () => {
  const { state } = useContext(AppStore);
  const { closeToast } = useToast();
  const toastState = getToastState(state);

  if (!toastState) {
    return null;
  }

  return (
    <Toast
      open={toastState.open}
      type={toastState.type}
      title={toastState.title}
      message={toastState.message}
      onClose={closeToast}
    />
  );
};

ToastContainer.displayName = 'ToastContainer';
export default ToastContainer;


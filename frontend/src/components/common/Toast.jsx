import toast from 'react-hot-toast';
import { SuccessToastStyle, ErrorToastStyle } from '../../styles';

export const successToast = (success, position = 'bottom-right') => {
  return toast.success(success, {
    style: SuccessToastStyle,
    duration: 3000,
    position
  });
};

export const errorToast = (error, position = 'bottom-right') => {
  toast.error(error, {
    style: ErrorToastStyle,
    duration: 3000,
    position
  });
};

import toast from 'react-hot-toast';

export const successToast = (success, position = 'bottom-right') => {
  return toast.success(success, {
    duration: 3000,
    position
  });
};

export const errorToast = (error, position = 'bottom-right') => {
  toast.error(error, {
    duration: 3000,
    position
  });
};

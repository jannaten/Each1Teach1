import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';

/*===================================================================
	ModalRootComponent
	example: dispatch(modalOpen(modalContent, null, null));
	example: dispatch(modalOpen(<content>, <callback>, <options>));
	- callback: optional e.g. () => console.log('Hello, World')
	- options: object optional (size: sm | md | lg, keyboard: true | false)

	https://react-bootstrap.github.io/components/modal/
===================================================================*/

export default function ModalRootComponent() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);
  window.onpopstate = () => dispatch(closeModal());

  useEffect(() => {
    dispatch(closeModal());
  }, [location.pathname]);

  return (
    <Modal
      backdrop={modalState.options?.backdrop || 'static'}
      size={modalState.options?.size || 'md'}
      keyboard={modalState.options?.keyboard || true}
      fullscreen={modalState.options?.fullscreen || false}
      centered={modalState.options?.centered || true}
      show={!!modalState.content}
      onHide={
        modalState.callback
          ? () => modalState.callback()
          : () => dispatch(closeModal())
      }>
      {modalState.content}
    </Modal>
  );
}

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = (props) => {
    const { openModal, setOpenModal, onConfirm, children, isConfirm } = props;

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleYesClose = () => {
        setOpenModal(false);
        onConfirm();
    };

    return (
        <Dialog disableBackdropClick={true}
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{isConfirm && 'Confirmation'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isConfirm && (<><Button onClick={handleYesClose} color="primary">
                    Yes
                </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
                </Button></>)}
                {!isConfirm && (<Button onClick={handleClose} color="primary">
                    Okay!
                </Button>)}
            </DialogActions>
        </Dialog>
    )
}

export default Modal;
import React, { FC, Fragment, SyntheticEvent, MouseEvent, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';

type MatAlertSnackbarProps = {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
};

export const MatAlertSnackbar: FC<MatAlertSnackbarProps> = ({ type, message }: MatAlertSnackbarProps) => {
    const [open, setOpen] = useState(true);

    const closeHandler = (_: SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            autoHideDuration={5000}
            open={open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={closeHandler}
        >
            <Alert
                variant="filled"
                onClose={closeHandler}
                severity={type}
                action={
                    <Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeHandler}>
                            &#10006;
                        </IconButton>
                    </Fragment>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

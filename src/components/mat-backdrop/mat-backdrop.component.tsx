import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

type MatBackdropProps = {
    isOpen: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const MatBackdrop: FC<MatBackdropProps> = ({ isOpen }: MatBackdropProps) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={isOpen}>
            <CircularProgress variant="indeterminate" color="primary" />;
        </Backdrop>
    );
};

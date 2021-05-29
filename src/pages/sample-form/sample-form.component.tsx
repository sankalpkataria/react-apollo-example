import { FetchResult } from '@apollo/client/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import { User } from 'models/user';
import React, { FC } from 'react';

type SampleFormProps = {
    addUser: (user: User) => Promise<FetchResult<User>>;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));

export const SampleForm: FC<SampleFormProps> = ({ addUser }: SampleFormProps) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            age: '',
        },
        onSubmit: async (values: User) => {
            await addUser(values);
            formik.resetForm();
        },
    });
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                    id="name"
                    variant="outlined"
                    margin="normal"
                    label="Name"
                    size="small"
                    inputProps={{ 'aria-label': 'name' }}
                    fullWidth={true}
                    {...formik.getFieldProps('name')}
                />
                <TextField
                    id="email"
                    variant="outlined"
                    margin="normal"
                    label="Email address"
                    size="small"
                    inputProps={{ 'aria-label': 'email' }}
                    fullWidth={true}
                    {...formik.getFieldProps('email')}
                />
                <TextField
                    type="number"
                    id="age"
                    variant="outlined"
                    margin="normal"
                    label="Age"
                    size="small"
                    inputProps={{ 'aria-label': 'age' }}
                    fullWidth={true}
                    {...formik.getFieldProps('age')}
                />
                <Button
                    variant="contained"
                    fullWidth={true}
                    disabled={!formik.values.email}
                    size="small"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <Typography> Check Console after submit to see the results </Typography>
        </Card>
    );
};
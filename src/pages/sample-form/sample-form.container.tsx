import { useMutation, useApolloClient } from '@apollo/client/react';
import { writeUserToCache } from 'apollo/cache/user';
import { MatAlertSnackbar } from 'components/mat-alert-snackbar/mat-alert-snackbar.component';
import { MatBackdrop } from 'components/mat-backdrop/mat-backdrop.component';
import { User } from 'models/user';
import React, { FC, Fragment } from 'react';
import { SampleForm } from './sample-form.component';
import { addUserMutation } from './user.graphql';
export const SampleFormContainer: FC = () => {
    const apolloClient = useApolloClient();
    const [addUser, { loading, error }] = useMutation(addUserMutation, {
        fetchPolicy: 'no-cache',
        onError: (err) => {
            console.log(err, 'error');
        },
        onCompleted: (data) => {
            console.log(data, 'data=--');
            writeUserToCache(apolloClient, data?.addUser);
        },
    });
    return (
        <Fragment>
            <SampleForm addUser={(user: User) => addUser({ variables: { ...user } })} />
            {error ? <MatAlertSnackbar message={error.message} type="error" /> : ''}
            {loading ? <MatBackdrop isOpen={loading} /> : ''}
        </Fragment>
    );
};

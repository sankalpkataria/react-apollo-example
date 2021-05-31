import { useMutation, useApolloClient } from '@apollo/client/react';
import { writeUserToCache } from 'apollo/cache/user';
import { MatAlertSnackbar } from 'components/mat-alert-snackbar/mat-alert-snackbar.component';
import { MatBackdrop } from 'components/mat-backdrop/mat-backdrop.component';
import { User } from 'models/user';
import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SampleForm } from './sample-form.component';
import { addUserMutation } from './user.graphql';
export const SampleFormContainer: FC = () => {
    const apolloClient = useApolloClient();
    const [addUser, { data, loading, error }] = useMutation(addUserMutation, {
        fetchPolicy: 'no-cache',
        onError: (err) => {
            console.log(err, 'error');
        },
        onCompleted: (result) => {
            writeUserToCache(apolloClient, result?.addUser);
        },
    });
    return (
        <Fragment>
            <SampleForm addUser={(user: User) => addUser({ variables: { ...user } })} />
            {data?.addUser?.id ? <Link to={`/results/${data?.addUser?.id}`}>See results</Link> : undefined}
            {error ? <MatAlertSnackbar message={error.message} type="error" /> : ''}
            {loading ? <MatBackdrop isOpen={loading} /> : ''}
        </Fragment>
    );
};

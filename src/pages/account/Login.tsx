import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout from './AccountLayout';
import { useLogin } from './hooks';

export type UserData = {
    email: string;
    password: string;
};

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t("ACCOUNT.Don't have an account?")}{' '}
                    <Link to={'/account/register'} className="text-muted ms-1 me-1 text-primary-jetapay">
                        <b>{t('ACCOUNT.CREATE_ACC')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();

    const { loading, userLoggedIn, user, error, schemaResolver, onSubmit, redirectUrl } = useLogin();

    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} replace />}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto mb-4">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('ACCOUNT.Sign In')}</h4>
                    <small className="text-muted">
                        {t('ACCOUNT.Enter your email address and password to access admin panel.')}
                    </small>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: 'test', password: 'test' }}
                >
                    <FormInput
                        label={t('ACCOUNT.Email address')}
                        labelClassName="mb-1"
                        type="email"
                        name="email"
                        placeholder={t('ACCOUNT.Enter your email')}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={t('ACCOUNT.Password')}
                        labelClassName="mb-1"
                        type="password"
                        name="password"
                        placeholder={t('ACCOUNT.Enter your password')}
                        containerClass={'mb-1'}
                    />

                    <div className="mb-3 text-center d-flex">
                        <Link to="/account/forget-password" className="text-muted float-end">
                            <small>{t('ACCOUNT.Forgot your password?')}</small>
                        </Link>
                    </div>
                    
                    <div className="text-center d-flex-1">
                        <Button variant="primary" type="submit" disabled={loading} className="w-100 rounded-3 pt-2 pb-2">
                            {t('ACCOUNT.Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;

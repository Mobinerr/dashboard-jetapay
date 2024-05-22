import { Navigate, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout from './AccountLayout';
import { useRegister } from './hooks';

export type UserData = {
    fullname: string;
    email: string;
    password: string;
};

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('ACCOUNT.Already have account?')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1 me-1 text-primary-jetapay">
                        <b>{t('ACCOUNT.Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = () => {
    const { t } = useTranslation();
    const { loading, userSignUp, error, schemaResolver, onSubmit } = useRegister();

    return (
        <>
            {userSignUp ? <Navigate to={'/account/confirm'}></Navigate> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto mb-4">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('ACCOUNT.Sign Up')}</h4>
                    <small className="text-muted mb-4">
                        {t("ACCOUNT.Don't have an account? Create your account, it takes less than a minute.")}
                    </small>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={t('ACCOUNT.Full Name')}
                        labelClassName="mb-1"
                        type="text"
                        name="fullname"
                        placeholder={t('ACCOUNT.Enter your name')}
                        containerClass={'mb-2'}
                    />
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
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('ACCOUNT.I accept Terms and Conditions')}
                        labelClassName="mb-1"
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3 text-muted'}
                    />

                    <div className="text-center d-flex-1">
                        <Button variant="primary" type="submit" disabled={loading} className="w-100 rounded-3 pt-2 pb-2">
                            {t('ACCOUNT.Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>

            </AccountLayout>
        </>
    );
};

export default Register;

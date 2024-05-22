import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from 'components';
import AccountLayout from './AccountLayout';
import { useForgetPassword } from './hooks';

export type UserData = {
    email: string;
};

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('ACCOUNT.Back to')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1 me-1 text-primary-jetapay">
                        <b>{t('ACCOUNT.Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ForgetPassword = () => {
    const { t } = useTranslation();
    const { loading, passwordReset, resetPasswordSuccess, error, schemaResolver, onSubmit } = useForgetPassword();

    return (
        <AccountLayout bottomLinks={<BottomLink />}>
            <div className="text-center m-auto mb-4">
                <h4 className="text-dark-50 text-center mt-0 font-weight-bold">{t('ACCOUNT.Reset_Pass_Title')}</h4>
                <small className="text-muted">
                    {t("ACCOUNT.Reset_Pass_Des")}
                </small>
            </div>

            {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

            {error && !resetPasswordSuccess && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}

            {!passwordReset && (
                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label={t('ACCOUNT.Email address')}
                        labelClassName="mb-1"
                        type="email"
                        name="email"
                        placeholder={t('ACCOUNT.Enter your email')}
                        containerClass={'mb-4'}
                    />

                    <div className="mb-0 text-center d-flex-1">
                        <Button variant="primary" type="submit" disabled={loading} className="w-100 rounded-3 pt-2 pb-2">
                            {t('ACCOUNT.Submit')}
                        </Button>
                    </div>
                </VerticalForm>
            )}
        </AccountLayout>
    );
};

export default ForgetPassword;

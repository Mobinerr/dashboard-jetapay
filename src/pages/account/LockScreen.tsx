import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Row, Col } from 'react-bootstrap';
import { VerticalForm, FormInput } from 'components';
import AccountLayout from './AccountLayout';
import avatar1 from 'assets/images/users/avatar-1.jpg';
import { useLockScreen } from './hooks';

export type UserData = {
    password: string;
};

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('ACCOUNT.Not you? return')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1 me-1 text-primary-jetapay">
                        <b>{t('ACCOUNT.Sign In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const LockScreen = () => {
    const { t } = useTranslation();
    const { schemaResolver, onSubmit } = useLockScreen();

    return (
        <AccountLayout bottomLinks={<BottomLink />}>
            <div className="text-center w-75 m-auto mb-4">
                <img src={avatar1} height="64" alt="" className="rounded-circle shadow" />
                <h4 className="text-dark-50 text-center mt-3 fw-bold">{t('ACCOUNT.Hi ! Michael')}</h4>
                <small className="text-muted mb-4">{t('ACCOUNT.Enter your password to access the admin.')}</small>
            </div>

            <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                <FormInput
                    label={t('ACCOUNT.Password')}
                    labelClassName="mb-1"
                    type="password"
                    name="password"
                    placeholder={t('ACCOUNT.Enter your password')}
                    containerClass={'mb-4'}
                />

                <div className="mb-0 text-center d-flex-1">
                    <Button variant="primary" type="submit" className="w-100 rounded-3 pt-2 pb-2">
                        {t('ACCOUNT.Log In')}
                    </Button>
                </div>
            </VerticalForm>
        </AccountLayout>
    );
};

export default LockScreen;

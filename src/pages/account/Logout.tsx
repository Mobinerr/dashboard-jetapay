import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import AccountLayout from './AccountLayout';
import logoutIcon from 'assets/images/logout-icon.svg';
import { useLogout } from './hooks';

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

const Logout = () => {
    const { t } = useTranslation();
    useLogout();

    return (
        <AccountLayout bottomLinks={<BottomLink />}>
            <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('ACCOUNT.See You Again !')}</h4>
                <small className="text-muted mb-4">{t('ACCOUNT.You are now successfully sign out.')}</small>

                <div className="logout-icon m-auto mt-4">
                    <img src={logoutIcon} width={100} height={100} alt="" />
                </div>
            </div>
        </AccountLayout>
    );
};

export default Logout;

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AccountLayout from './AccountLayout';
import mailSent from 'assets/images/mail_sent.svg';

const Confirm = () => {
    const { t } = useTranslation();

    return (
        <AccountLayout>
            <div className="text-center m-auto mb-4">
                <img src={mailSent} alt="mail sent" height="64" />
                <h4 className="text-dark-50 text-center mt-4 fw-bold">{t('ACCOUNT.Confirm_Email_Title')}</h4>
                <small className="text-muted">
                    {t('ACCOUNT.Confirm_Email_Des')}
                </small>
            </div>
            <div className="text-center d-flex-1 mb-0">
                <Link className="btn btn-primary w-100 rounded-3 pt-2 pb-2" to="/account/login">
                    {t('ACCOUNT.Confirm_Email_Btn')}
                </Link>
            </div>
        </AccountLayout>
    );
};

export default Confirm;

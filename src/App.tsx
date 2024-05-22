import Routes from 'routes/Routes';
import { configureFakeBackend } from 'helpers';
import { useRedux } from 'hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// For Default import Saas.scss
import 'assets/scss/Saas.scss';
// import 'assets/scss/Creative.scss';
// import 'assets/scss/Modern.scss';

const App = () => {

    const { i18n } = useTranslation();
    const { appSelector } = useRedux();
    const { layoutDirection } = appSelector((state) => ({ layoutDirection: state.Layout.layoutDirection, }));
    const { layoutLanguage } = appSelector((state) => ({ layoutLanguage: state.Layout.layoutLanguage, }));

    useEffect(() => {
        document.dir = layoutDirection;
        document.documentElement.setAttribute('lang',layoutLanguage);
        i18n.changeLanguage(layoutLanguage);
    }, [layoutDirection , layoutLanguage , i18n]);

    configureFakeBackend();
    return <Routes />;
};

export default App;

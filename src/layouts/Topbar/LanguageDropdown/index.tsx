import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useToggle , useRedux } from 'hooks';
import { Language } from '../../types';
import enFlag from './flags/us.jpg';
import irFlag from './flags/iran.jpg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { changeLayoutDirection , changeLayoutLanguage } from 'redux/actions';
import * as layoutConstants from 'appConstants';

const Languages: Language[] = [
    {
        name: 'English',
        flag: enFlag,
        action: layoutConstants.LayoutLanguage.LAYOUT_LANGUAGE_EN,
        dir: layoutConstants.LayoutDirection.LAYOUT_DIRECTION_LTR,
    },
    {
        name: 'فارسی',
        flag: irFlag,
        action: layoutConstants.LayoutLanguage.LAYOUT_LANGUAGE_FA,
        dir: layoutConstants.LayoutDirection.LAYOUT_DIRECTION_RTL,
    },
];

const LanguageDropdown = () => {

    const { dispatch, appSelector } = useRedux();
    const { layoutLanguage } = appSelector((state) => ({
        layoutLanguage: state.Layout.layoutLanguage,
    }));

    const [language , setLanguage] = useState(layoutLanguage);
    const SelectedLanguage = language === 'en' ? Languages[0] : Languages[1];
    const [isOpen, toggleDropdown] = useToggle();
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setLanguage(lang);
        document.documentElement.setAttribute('lang',lang);
        if(lang === 'fa'){
            dispatch(changeLayoutDirection(layoutConstants.LayoutDirection.LAYOUT_DIRECTION_RTL));
            dispatch(changeLayoutLanguage(layoutConstants.LayoutLanguage.LAYOUT_LANGUAGE_FA));
        }
        if(lang === 'en'){
            dispatch(changeLayoutDirection(layoutConstants.LayoutDirection.LAYOUT_DIRECTION_LTR));
            dispatch(changeLayoutLanguage(layoutConstants.LayoutLanguage.LAYOUT_LANGUAGE_EN));
        }
    };

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-languages"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none"
            >
                <img src={SelectedLanguage.flag} alt={SelectedLanguage.name} className="me-0 me-sm-1" height="12" />{' '}
                <span className="align-middle d-none d-sm-inline-block">{SelectedLanguage.name}</span>{' '}
                <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu">
                <div onClick={toggleDropdown}>
                    {Languages.map((lang, i) => {
                        return (
                            <Link to="#" className="dropdown-item notify-item" key={i + '-lang'} onClick={() => handleLanguageChange(lang.action)}>
                                <img src={lang.flag} alt={lang.name} className="me-1" height="12" />{' '}
                                <span className="align-middle">{lang.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageDropdown;
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { DefaultLayout, VerticalLayout, HorizontalLayout, DetachedLayout, FullLayout } from 'layouts';
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import { LayoutTypes } from 'appConstants';
import { useRedux } from 'hooks';

// lazy load all the views

// auth
const Login = React.lazy(() => import('pages/account/Login'));
const Logout = React.lazy(() => import('pages/account/Logout'));
const Register = React.lazy(() => import('pages/account/Register'));
const Confirm = React.lazy(() => import('pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('pages/account/LockScreen'));
const EcommerceDashboard = React.lazy(() => import('pages/dashboard/Ecommerce'));

// - ecommece pages
const EcommerceProducts = React.lazy(() => import('pages/apps/Ecommerce/Products'));

const ErrorPageNotFound = React.lazy(() => import('pages/error/PageNotFound'));
const ErrorPageNotFoundAlt = React.lazy(() => import('pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('pages/error/ServerError'));

// icons
const Dripicons = React.lazy(() => import('pages/icons/Dripicons'));
const MDIIcons = React.lazy(() => import('pages/icons/MDIIcons'));
const Unicons = React.lazy(() => import('pages/icons/Unicons'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { appSelector } = useRedux();

    const { layout } = appSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls: React.ComponentType = VerticalLayout;

        switch (layout.layoutType) {
            case LayoutTypes.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case LayoutTypes.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case LayoutTypes.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'account',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> }
                    ],
                },
                {
                    path: 'error-404',
                    element: <LoadComponent component={ErrorPageNotFound} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={ServerError} />,
                }
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'Admin'} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    children: [
                        {
                            path: 'ecommerce',
                            element: <LoadComponent component={EcommerceDashboard} />,
                        },
                    ],
                },
                {
                    path: 'apps',
                    children: [
                        {
                            path: 'ecommerce/products',
                            element: <LoadComponent component={EcommerceProducts} />,
                        },
                    ],
                },

                {
                    path: 'pages',
                    children: [
                        {
                            path: 'error-404-alt',
                            element: <LoadComponent component={ErrorPageNotFoundAlt} />,
                        },
                    ],
                },
                {
                    path: 'ui',
                    children: [
                        {
                            path: 'icons',
                            children: [
                                {
                                    path: 'unicons',
                                    element: <LoadComponent component={Unicons} />,
                                },
                                {
                                    path: 'mdi',
                                    element: <LoadComponent component={MDIIcons} />,
                                },
                                {
                                    path: 'dripicons',
                                    element: <LoadComponent component={Dripicons} />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };

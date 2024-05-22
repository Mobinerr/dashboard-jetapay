export type MenuItemType = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemType[];
};

const MENU_ITEMS: MenuItemType[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboards',
        label: "Dashboard",
        isTitle: false,
        icon: 'uil-home-alt',
        url: '/dashboard/ecommerce'
    },
    // { key: 'apps', label: 'Apps', isTitle: true },
    {
        key: 'apps-ecommerce',
        label: 'Ecommerce',
        isTitle: false,
        icon: 'uil-store',
        url: '/apps/ecommerce/products'
    }
];

export { MENU_ITEMS };

export const menu = [
    {
        icon: 'MdOutlineSpaceDashboard',
        title: 'Главная',
        url: '/',
        desc: 'Главная',
        allowAccess: ['admin', 'user', 'viewer']
    },
    {
        icon: 'BsClipboardCheck',
        title: 'Номенклатура',
        url: '/nomenclature',
        desc: 'Номенклатура',
        allowAccess: ['admin', 'user']
    },
    {
        icon: 'MdReceipt',
        title: 'Приход',
        url: '/receipt',
        desc: 'Приход',
        allowAccess: ['admin', 'user']
    },
    {
        icon: 'BiTransfer',
        title: 'Перемещения',
        url: '/transfers',
        desc: 'Перемещения',
        allowAccess: ['admin', 'user']
    },
    {
        icon: 'FaWarehouse',
        title: 'Склады',
        url: '/warehouses',
        desc: 'Склады',
        allowAccess: ['admin', 'user']
    },
    {
        icon: 'AiOutlineInfoCircle',
        title: 'О нас',
        url: '/about',
        desc: 'О нас',
        allowAccess: ['admin', 'user', 'viewer']
    },
    {
        icon: 'MdOutlineAdminPanelSettings',
        title: 'Администратор',
        url: '/admin',
        desc: 'Администратор',
        allowAccess: ['admin']
    },
];
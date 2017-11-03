import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { MENU_ITEMS } from '../../constants/menu';
import SecondaryMenu from '../SecondaryMenu';

it('renders without crashing', () => {
    const menuItems = Object.keys(MENU_ITEMS).map((menu) => {
        let items = MENU_ITEMS[menu],
            key = menu.toLowerCase();

        shallow(<SecondaryMenu items={items} />);
    });
});

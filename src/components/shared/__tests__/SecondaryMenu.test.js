import React from 'react';
import { shallow } from 'enzyme';

import { MENU_ITEMS } from '../../../constants/menu';
import SecondaryMenu from '../toolbar/SecondaryMenu';

describe('SecondaryMenu', () => {

    it('renders without crashing', () => {
        const menuItems = Object.keys(MENU_ITEMS).map(menu => {
            let items = MENU_ITEMS[menu];
            // let key = menu.toLowerCase();

            shallow(<SecondaryMenu items={items} />);
        });
    });
});

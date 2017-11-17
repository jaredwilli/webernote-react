import React from 'react';
import { Link } from 'react-router-dom';

import { shorten } from '../../common/helpers.js';
import { PLURALS } from '../../constants/noteConst';

function NavListItem({ type, notes, items, ...props }) {
    if (!notes.length || !items.length) {
        return <div></div>;
    }

    // Set the initial count value and normalize the name
    items = items.map(item => {
        item.name = (item.label) ? item.label : item.name;
        return item;
    });

    // Unpluralize the type for notebooks and labels
    type = (type !== 'tags') ? PLURALS[type] : type;

    // Set the items with the total count of each item from notesWithType
    const itemWithCount = (item) => notesWithType.reduce((sum, note) => {
        return (note[type].id === item.id) ? sum + 1 : sum;
    }, 0);

    const tagsWithCount = (item) => notesWithType.map(note => {
        let count = note[type].reduce((sum, tag) => {
            return (tag.id === item.id) ? sum + 1 : sum;
        }, 0);
        return count;
    });

    const listMenu = (items) => items.map(item => {
        const itemCount = (type === 'tags') ? tagsWithCount(item) : itemWithCount(item);

        return (itemCount === 0) ? <span className="empty"></span> : (
            <li key={item.id} id={item.id}>
                <Link to={'/' + type + '/' + item.name.toLowerCase()}>
                    {(type === 'label') &&
                        <div className="note-label" style={{ background: item.hex }} />
                    }
                    <span className="name">{shorten(item.name, 25)}</span>
                </Link>&nbsp;
                <span className="count">
                    {(type === 'tags') ? tagsWithCount(item) : itemWithCount(item)}
                </span>
            </li>
        );
    });

    return (
        <ul className={type + '-list'}>
            {listMenu(items)}
        </ul>
    );
}

export default NavListItem;

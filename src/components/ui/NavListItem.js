import React from 'react';
import { Link } from 'react-router-dom';
import { shorten } from '../../common/helpers.js';
import { PLURALS } from '../../constants/colors';

function NavListItem({ type, notes = [], items = [], ...props }) {
    // Set the initial count value and normalize the name
    items = items.map(item => {
        item.name = (item.label) ? item.label : item.name;
        return item;
    });

    // Unpluralize the type for notebooks and labels
    type = (type !== 'tags') ? PLURALS[type] : type;

    const notesWithType = (type) => notes.filter(note => note[type] )

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

    return (
        <ul className={type + '-list'}>
            {items.map(item =>
                <li key={item.id} id={item.id}>
                    {(type === 'label') &&
                        <div className="note-label" style={{ background: item.hex }} />
                    }
                    <Link to={`/${type}/${item.name.toLowerCase()}`}>
                        <span className="name">{shorten(item.name, 25)}</span>
                    </Link>&nbsp;
                    <span className="count">
                        {(type === 'tags') ? tagsWithCount(item) : itemWithCount(item)}
                    </span>
                </li>
            }
        </ul>
    );
}

export default NavListItem;

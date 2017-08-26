import React from 'react';

function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

function Note(props) {
    return (
        <li className="note">
            <button className="delete">X</button>
            <h2 className="title">{props.title}</h2>
            <p>
                <span className="date">{formatDate(props.modified_date)}</span>
                <span className="tag-item">{props.tags}</span>
                <span className="description">{props.description}</span>
            </p>
        </li>
    );
}

export default Note;

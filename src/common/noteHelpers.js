// helper functions
import _ from 'lodash';
import React from 'react';

import { shorten } from './helpers.js';
import {Link} from 'react-router-dom';

/**
 * sortNotes
 *
 * @param {Array} notes
 */
export const sortNotes = (notes, sort) => {
    notes = notes.sort((a, b) =>
        new Date(a[sort.sortBy || 'created_date']).getTime() -
        new Date(b[sort.sortBy || 'created_date']).getTime()
    );
    return (sort.order === 'desc') ? notes.reverse() : notes;
}

export function compareObjs(a, b) {
    function fn(otherArray) {
        return (current) => {
            return otherArray.filter((other) => {
                return other.id === current.id && other.label === current.label;
            }).length === 0;
        };
    }
    return a.filter(fn(b)).concat(b.filter(fn(a)));
}

/**
 * noteNavItems
 *
 * @description Builds out the left nav bar menu items for notebooks, tags, labels.
 * @param {Object} obj
 * @param {Object} notes
 */
export function noteNavItems(obj, notes) {
    const key = Object.keys(obj)[0];
    let prop = (key === 'tags') ? 'label' : 'name';
    let items = '';

    if (obj[key] && obj[key].length) {
        items = obj[key].map((o, i) =>
            <li key={i} id={o.id}>
                <Link to={'/' + key + '/' + o[prop].toLowerCase()}>
                    {(key === 'label') ? <div className="note-label" style={{background: o.hex}} /> : ''}
                    <span className="name">{shorten(o[prop], 25)}</span>
                </Link>&nbsp;
                <span className="count">{getObjCounts({ [key]: o }, notes)}</span>
            </li>
        );
    }
    return items;
}

/**
 * getObjectCounts
 *
 * @description Get the number of notebooks, tags, and labels that each note has.
 * @param {Object} objType
 * @param {Object} notes
 */
export function getObjCounts(objType, notes) {
    let count = 0;

    if (!objType || !notes) {
        return count;
    } else {
        let key = Object.keys(objType)[0];

        if (notes && notes.length) {
            notes.forEach((note) => {
                if (!note[key]) {
                    return;
                }

                // Tags
                if (note[key] && Array.isArray(note[key])) {
                    note[key].forEach((tkey) => {
                        if (tkey.id === objType[key].id) {
                            count++;
                        }
                    })
                }
                // Notebooks & Labels
                else if (note[key].id === objType[key].id) {
                    count++;
                }
            });
        }
    }
    return count;
}

/**
 * getNotebookCount
 *
 * @param {Object} notebook
 * @param {Array} notes
 * @returns {Object} obj with notebook name and note count using it
 */
export function getNotebookCount(notebook, notes) {
    let count = 0;

    // iterate over notes
    if (notes.length) {
        notes.forEach((n) => {
            if (!n.notebook) return;

            if (n.notebook.name === notebook.name) {
                count++;
            }
        });
    }

    return {
        notebook: notebook,
        count: count
    };
}

/**
 * getTagCount
 *
 * @description
 * Get the total count for notes that have each tag assigned to them. If a tag has zero notes it should remove the tag from the tags bucket, so need to trigger a removeTag event.
 *
 * @param {Object} tag
 * @param {Array} notes
 * @returns {Object} obj with tag name and note count using it
 */
export function getTagCount(tag, notes) {
    let count = 0;

    // iterate over notes
    if (notes.length) {
        notes.forEach((n) => {
            if (!n.tags) return;

            // iterate over note tags
            n.tags.forEach((t) => {
                if (tag.label === t.label) {
                    count++;
                }
            });
        });
    }

    return {
        tag: tag,
        count: count
    };
}

/**
 * getLabelCount
 *
 * @param {Object} label
 * @param {Array} notes
 * @returns {Object} obj with label name and note count using it
 */
export function getLabelCount(label, notes) {
    let count = 0;

    // iterate over notes
    if (notes.length) {
        notes.forEach((n) => {
            if (!n.label) return;

            if (n.label.hex === label.hex) {
                count++;
            }
        });
    }

    return {
        label: label,
        count: count
    };
}

/**
 * getTags
 *
 * @param {Object} noteTags
 */
export function getTags(noteTags) {
    let tags = '';
    if (noteTags) {
        tags = noteTags.map((t) =>
            <span key={t.id} className="Select-value">
                <span className="Select-value-label" id="react-select-2--value-">
                    {t.label}
                </span>
            </span>
        );
    }

    return (
        <div className="Select tags Select--multi has-value">
            <span className="Select-multi-value-wrapper" id="react-select-2--value">
                {tags}
            </span>
        </div>

    );
}

/**
 * getDeletedTags
 *
 * @param {*} tags
 * @param {*} note
 */
// TODO: refactor this
export function getDeletedTags(tags, note) {
    let noteTagsCopy = note.tags,
        tagsCopy = tags,
        tagSize = _.size(tagsCopy),
        noteTagSize = _.size(noteTagsCopy);

    // Need to remove tags if tagSize is smaller than note tags
    if (tagSize < noteTagSize) {
        for (let i = 0; i < tagsCopy.length; i++) {
            for (let j = 0; j < noteTagsCopy.length; j++) {
                // If they match splice it out. whats left needs to be removed.
                if (tagsCopy[i].id === noteTagsCopy[j].id) {
                    noteTagsCopy.splice(j, 1);
                }
            }
        }
        return noteTagsCopy;
    }
    return false;
}

/**
 * createNewNote
 *
 * @param {String} refId
 */
export function createNewNote(refId, user) {
    return {
        id: refId,
        isEditing: true,
        title: '',
        description: '',
        url: '',
        notebook: {},
        tags: [],
        created_date: new Date().getTime(),
        modified_date: ''
    };
}

/**
 * Generate a new tag object
 *
 * @param {*} refId
 * @param {*} tag
 * @param {*} note
 */
export function createNewTag(refId, tag, note) {
    // no className - not new tag...
    if (!tag.className) return;
    delete tag.className;

    // Add some extra data to tag object
    tag.id = refId;
    tag.value = refId;
    tag.label = tag.label;

    return tag;
}

/**
 * Generate a new notebook object
 *
 * @param {*} refId
 * @param {*} notebook
 * @param {*} note
 */
export function createNewNotebook(refId, notebook) {
    if (!notebook.name) return;

    // Add some extra data to notebook object
    notebook.id = refId;
    notebook.value = refId;
    notebook.name = notebook.name;

    return notebook;
}

/**
 * getSelectedNotebook
 *
 * @param {Object} e event object from the onChange event of notebook select menu
 * @param {Object} notebooks the current list of notebooks
 */
export function getSelectedNotebook(e, notebooks) {
    let notebookId = '';

    if (e.target.value === 'All Notebooks') {
        return { name: e.target.value, id: 'all_notebooks' };
    }

    // Find the value of the selected notebook from the select menu options
    for (let notebook of e.target.children) {
        if (notebook.value === e.target.value) {
            notebookId = notebooks.filter(function(book) {
                return book.id === notebook.id;
            })[0];
        }
    }
    return notebookId;
}

/**
 * filterData
 *
 * @param {Object} user
 * @param {Object} data
 * @param {Object} filter
 */
export function filterData(data, filters) {
    if (filters) {
        let filterKeys = Object.keys(filters);
        // Loop over the filterKeys
        filterKeys.forEach((filterKey) => {
            data = data.filter((d) => {
                if (d[filterKey] && filters[filterKey].id !== 'all_notebooks') {
                    // if data has the filter return those with same id
                    return d[filterKey].id === filters[filterKey].id;
                }
                return d;
            });
            return data;
        });
    }
    return data;
}

export function hasNotesAndOneOtherData(props) {
    // has 1+ notes
    if (props && props.notes && props.notes.length) {
        // has 1+ notebook or tags or label
        if ((props.notebooks && props.notebooks.length) ||
            (props.tags && props.tags.length) ||
            (props.labels && props.labels.length)) {
            return true;
        }
    }
    return false;
}

// helper functions
import _ from 'lodash';
import React from 'react';

/**
 * sortNotes
 *
 * @param {Array} notes
 */
export function sortNotes(notes) {
    notes.sort((a, b) => {
        let aDate = a.created_date; // (a.modified_date !== '') ? a.modified_date : a.created_date;
        let bDate = b.created_date; // (b.modified_date !== '') ? b.modified_date : b.created_date;

        return new Date(aDate).getTime() - new Date(bDate).getTime();
    }).reverse();
    return notes;
}

/**
 * getNotebookCount
 *
 * @param {Object} notebook
 * @param {Array} notes
 * @returns {Object} obj with notebook name and note count using it
 */
export function getNotebookCount(notebook, notes, user) {
    let count = 0;

    // iterate over notes
    if (notes.length) {
        notes.forEach(function(n) {
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
export function getTagCount(tag, notes, user) {
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
    const newNote = {
        uid: (user) ? user.uid : null,
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
    return newNote;
}

/**
 * Generate a new tag object
 *
 * @param {*} refId
 * @param {*} tag
 * @param {*} note
 */
export function createNewTag(refId, tag, note, user) {
    // no className - not new tag...
    if (!tag.className) return;
    delete tag.className;

    // Add some extra data to tag object
    tag.uid = (user) ? user.uid : null;
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
export function createNewNotebook(refId, notebook, user) {
    if (!notebook.name) return;

    // Add some extra data to notebook object
    notebook.uid = (user) ? user.uid : null;
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
export function filterData(user, data, filters) {
    if (user) {
        data = data.filter((d) => {
            return d.uid === user.uid;
        });
    } else {
        data = data.filter((d) => {
            return d.uid === undefined || d.uid === null;
        });
    }

    if (filters) {
        let filterKeys = Object.keys(filters);
        // Loop over the filterKeys
        filterKeys.forEach((filterKey) => {
            // If user exists get filter just theirs
            if (user) {
                data = data.filter((d) => {
                    if (filters[filterKey].id === 'all_notebooks') {
                        return d;
                    }

                    return d[filterKey].uid === user.uid &&
                        d[filterKey].id === filters[filterKey].id;
                });
            } else {
                data = data.filter((d) => {
                    if (filters[filterKey].id === 'all_notebooks') {
                        return d;
                    } else if (d[filterKey]) {
                        // if data has the filter return those with same id
                        return d[filterKey].id === filters[filterKey].id;
                    }
                });
            }

            return data;
        });
    }

    return data;
}

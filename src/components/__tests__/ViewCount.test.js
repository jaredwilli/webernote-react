import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import ViewCount from '../ViewCount';
import * as mocks from '../../mocking/noteHelpers-mock';

describe('ViewCount', () => {
    const props = {
        notebooks: mocks.notebooks,
        notes: mocks.notes,
        notebookFilter: mocks.notebookFilter,
        onChange: jest.fn(() => {
            return 'onChange called!';
        })
    };

    it('renders without crashing', () => {
        shallow(<ViewCount
            notes={props.notes}
            notebookFilter={props.snotebookFilter}
            notebooks={props.notebooks}
            onChange={() => props.onChange()} />);
    });

});

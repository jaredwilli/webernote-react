import React  from 'react';

class BaseFilter extends React.PureComponent{
    constructor(props, context){
        super(props, context);
        this.filter = this.filter.bind(this);
        this.state = {};
    }

    filter(filterObj){
        const filterName = this.props.filterName;
        const filter = {};
        filter[filterName] = filterObj;

        this.props.onFiltered(filter, this.props.isMultiSelect);
    }
}

export default BaseFilter;

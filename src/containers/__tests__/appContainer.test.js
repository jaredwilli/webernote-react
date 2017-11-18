import React from 'react';
import { withRouter } from 'react-router-dom';

import sinon from 'sinon';
import { mount } from 'enzyme';

import AppContainer from '../appContainer';

describe('AppContainer', () => {
    const anonUser = {
        uid: 'abc123',
        isAnonymous: true,
        displayName: '',
        email: '',
        photoURL: ''
    };

    it('allows us to set props', () => {
        const wrapper = mount(<AppContainer.WrappedComponent user={anonUser} />);

        console.log(wrapper.debug());
        // console.log(wrapper.instance().props);

        expect(wrapper.props().user).to.equal(anonUser);
        wrapper.setProps({ user: { newProp: 'booyaa' }});
        expect(wrapper.props().user.newProp).to.equal('booyaa');
    });

    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = mount((<AppContainer onButtonClick={onButtonClick} />));
        wrapper.find('button').simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });

    it('calls componentDidMount', () => {
        sinon.spy(AppContainer.prototype, 'componentDidMount');
        const wrapper = mount(<AppContainer />);
        expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
        Foo.prototype.componentDidMount.restore();
    });
});

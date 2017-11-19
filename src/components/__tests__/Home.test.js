import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Home from '../Home';

describe('Home', () => {
    const anonUser = {
        uid: 'abc123',
        isAnonymous: true,
        displayName: '',
        email: '',
        photoURL: ''
    };

    it('allows us to set props', () => {
        shallow(<Home />);
        // const wrapper = mount(<Home.WrappedComponent user={anonUser} />);
        // console.log(wrapper.debug());
        // console.log(wrapper.instance());

        // expect(wrapper.)
        // expect(wrapper.props().user).to.equal(anonUser);
        // wrapper.setProps({ user: { newProp: 'booyaa' }});
        // expect(wrapper.props().user.newProp).to.equal('booyaa');
    });

    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount((<Home onButtonClick={onButtonClick} />));
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });

    // it('calls componentDidMount', () => {
    //     sinon.spy(Home.prototype, 'componentDidMount');
    //     const wrapper = mount(<Home />);
    //     expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
    //     Foo.prototype.componentDidMount.restore();
    // });
});

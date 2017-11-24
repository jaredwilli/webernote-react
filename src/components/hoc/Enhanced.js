import { Enhance } from './Enhance';

class MyComponent {
	render() {
		if (!this.data) {
            return <div>Waiting...</div>;
        }

		return <div>{ this.data }</div>;
	}
}

export default Enhance(MyComponent); // Enhanced component

import { Enhance } from './Enhance';

class HighOrder {
	render() {
		if (!this.data) return <div>Waiting...</div>;
		return <div>{this.data}</div>;
	}
}

export default Enhance(HighOrder); // Enhanced component

function sanitize(strings, ...values) {
	const dirty = strings.reduce(
		(prev, next, i) => `${prev}${next}${values[i]} || ''}`,
		''
	);
	return DomPurify.sanitize(dirty);
}

const first = 'Wes';
const aboutMe = sanitize`I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;

const html = `
    <h3>${first}</h3>
    <p>${aboutMe}</p>
`;

const bio = document.querySelector('.bio');
bio.innerHTML = html;

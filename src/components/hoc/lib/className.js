import styles from 'flexbox.css';

export default function getClass(className) {
	return styles && styles[className] ? styles[className] : className;
}

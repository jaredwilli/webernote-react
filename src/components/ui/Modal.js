import React from 'react';
import CloseBtn from '../stateless/CloseBtn';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.listenKeyboard = this.listenKeyboard.bind(this);
		this.onOverlayClick = this.onOverlayClick.bind(this);
	}

	componentDidMount() {
        if (this.props.onClose) {
            window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
		}
	}

	componentWillUnmount() {
        if (this.props.onClose) {
            window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
		}
	}

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    }

	onOverlayClick() {
		this.props.onClose();
	}

	onDialogClick(event) {
		event.stopPropagation();
	}

	render() {
        const { overlayStyle={}, contentStyle={}, dialogStyle={} } = this.props;

		return (
			<div className="modal">
				<div className="modal-overlay" style={overlayStyle} />
				<div className="modal-content"
					style={contentStyle}
					onClick={this.onOverlayClick}>
					<div className="modal-dialog"
                        onClick={this.onDialogClick}
                        style={dialogStyle}>
                        <CloseBtn onClick={this.onOverlayClick} />

						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;

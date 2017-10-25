import React from 'react';

import '../styles/modal.css';

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
        const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {};
        const contentStyle = this.props.contentStyle ? this.props.contentStyle : {};
        const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {};

		return (
			<div>
				<div className="modal-overlay" style={overlayStyle} />
				<div className="modal-content"
					style={contentStyle}
					onClick={this.onOverlayClick}>
					<div className="modal-dialog"
                        onClick={this.onDialogClick}
                        style={dialogStyle}>
                        <span className="x-button"
                            onClick={this.onOverlayClick}>×
                        </span>

						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;

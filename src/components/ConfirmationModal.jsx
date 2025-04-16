import React from "react";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="wrapper-text">{message}</div>
				<div className="modal-buttons">
					<button onClick={onConfirm}>Да</button>
					<button onClick={onCancel}>Нет</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;

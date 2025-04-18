import React, { useState, useEffect } from "react";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, withInput = false }) => {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (!isOpen) setInputValue(""); // очищаем при закрытии
	}, [isOpen]);

	const handleConfirm = () => {
		onConfirm(withInput ? inputValue : null);
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="wrapper-text">{message}</div>
				<br />
				{withInput && (
					
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Введите значение"
					/>
				)}

				<div id="modal-buttons">
					<button onClick={handleConfirm}>Да</button>
					<button onClick={onCancel}>Нет</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;

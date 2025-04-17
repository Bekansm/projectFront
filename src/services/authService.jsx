import React from "react";

export function InputField({
	type,
	name,
	placeholder,
	register,
	errors,
	validation,
}) {
	return (
		<div>
			<input
				type={type}
				placeholder={placeholder}
				{...register(name, validation)}
			/>
			{errors[name] && <p className="wrapper-text">{errors[name].message}</p>}
		</div>
	);
}

export function ServerError({ error }) {
	if (!error) return null;
	return <p className="wrapper-text">{error}</p>;
}

export async function handleFormSubmit(
	data,
	setServerError,
	apiCall,
	reset,
	dispatch,
	tokenAction,
	navigate,
	redirectTo
) {
	setServerError("");
	try {
		const result = await apiCall(data);
		localStorage.setItem("token", result.token);
		dispatch(tokenAction(result.token));
		console.log("Операция прошла успешно!");

		reset();
		navigate(redirectTo);
	} catch (err) {
		setServerError(err.message);
	}
}

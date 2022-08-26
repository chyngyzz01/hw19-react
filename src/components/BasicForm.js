import { useEffect, useState } from 'react';

const BasicForm = (props) => {
	const [inputValue, setInputValue] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});
	const [firstInputValid, setFirstInputValid] = useState(true);
	const [secondInputValid, setSecondInputValid] = useState(true);
	const [emailInputValid, setEmailInputValid] = useState(true);
	const [isFormValid, setIsFormValid] = useState(false);

	const firstNameBlurHandler = () => {
		setFirstInputValid(true);
		if (inputValue.firstName.trim().length > 4) {
			setFirstInputValid(true);
			return;
		}
		setFirstInputValid(false);
	};
	const lastNameBlurHandler = () => {
		setSecondInputValid(true);
		if (inputValue.lastName.trim().length > 5) {
			setSecondInputValid(true);
			return;
		}
		setSecondInputValid(false);
	};
	const emailBlurHandler = () => {
		setEmailInputValid(true);
		if (inputValue.email.trim().includes('@')) {
			setEmailInputValid(true);
			return;
		}
		setEmailInputValid(false);
	};

	useEffect(() => {
		if (inputValue.firstName && inputValue.lastName && inputValue.email) {
			setIsFormValid(true)
			return
		}
		setIsFormValid(false)
	})

	const submitHandler = (event) => {
		event.preventDefault();
		setInputValue({
			firstName: '',
			lastName: '',
			email: '',
		});
	};

	const firstInputClasses = !firstInputValid
		? 'form-control invalid'
		: 'form-control';
	const secondInputClasses = !secondInputValid
		? 'form-control invalid'
		: 'form-control';
	const emailInputClasses = !emailInputValid
		? 'form-control invalid'
		: 'form-control';
	return (
		<form onSubmit={submitHandler}>
			<div className='control-group'>
				<div className={firstInputClasses}>
					<label htmlFor='fistName'>First Name</label>
					<input
						type='text'
						id='fistName'
						onChange={(e) =>
							setInputValue({
								...inputValue,
								firstName: e.target.value,
							})
						}
						onBlur={firstNameBlurHandler}
					/>

					{!firstInputValid && (
						<p className='error-text'>
							Length must be greater than 4
						</p>
					)}
				</div>
				<div className={secondInputClasses}>
					<label htmlFor='lastName'>Last Name</label>
					<input
						type='text'
						id='lastName'
						onChange={(e) =>
							setInputValue({
								...inputValue,
								lastName: e.target.value,
							})
						}
						onBlur={lastNameBlurHandler}
					/>
					{!secondInputValid && (
						<p className='error-text'>
							Length must be greater than 5
						</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>E-Mail Address</label>
				<input
					type='email'
					id='email'
					onChange={(e) =>
						setInputValue({ ...inputValue, email: e.target.value })
					}
					onBlur={emailBlurHandler}
				/>
				{!emailInputValid && (
					<p className='error-text'>Wrong login!!! (Must be @)</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!isFormValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;

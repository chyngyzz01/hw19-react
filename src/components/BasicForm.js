import { useEffect, useRef, useState } from 'react';

const BasicForm = (props) => {
	let isRenderedOnce = false;

	const firstNameInputRef = useRef();
	const lastNameInputRef = useRef();
	const emailInputRef = useRef();
	const [isFirstNameValid, setIsFirstNameValid] = useState(true);
	const [isLastNameValid, setIsLastNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isTouched, setIsTouched] = useState(true);

	const firstNameInputBlurHandler = () => {
		const firstName = firstNameInputRef.current.value;
		if (firstName.trim().length > 4) {
			setIsFirstNameValid(true);
			return;
		}
		setIsFirstNameValid(false);
	};

	const lastNameHandlerBlur = () => {
		const lastName = lastNameInputRef.current.value;
		if (lastName.trim().length > 6) {
			setIsLastNameValid(true);
			return;
		}
		setIsLastNameValid(false);
	};

	const emailHandlerBlur = () => {
		const email = emailInputRef.current.value;
		if (email.trim().includes('@')) {
			setIsEmailValid(true);
			return;
		}
		setIsEmailValid(false);
	};

	console.log(isTouched);

	console.log('isFirstNameValid:', isFirstNameValid);

	useEffect(() => {
		if (!isRenderedOnce) {
			isRenderedOnce = true;
			return null;
		}
		if (isRenderedOnce) {
			if (isFirstNameValid && isLastNameValid && isEmailValid) {
				setIsTouched(false);
			} else {
				setIsTouched(true);
			}
		}
	}, [isFirstNameValid, isLastNameValid, isEmailValid, isRenderedOnce]);

	const submitHandler = (event) => {
		event.preventDefault();
		setIsFirstNameValid(true);
		setIsLastNameValid(true);
		setIsEmailValid(true);
	};

	const firstInputClasses = isFirstNameValid
		? 'form-control'
		: 'form-control invalid';

	const secondInputClasses = isLastNameValid
		? 'form-control'
		: 'form-control invalid';
	const emailInputClasses = isEmailValid
		? 'form-control'
		: 'form-control invalid';

	return (
		<form onSubmit={submitHandler}>
			<div className='control-group'>
				<div className={firstInputClasses}>
					<label htmlFor='fistName'>First Name</label>
					<input
						ref={firstNameInputRef}
						onBlur={firstNameInputBlurHandler}
						type='text'
						id='fistName'
					/>
					{!isFirstNameValid && (
						<p className='error-text'>
							Length must be greater than 4
						</p>
					)}
				</div>
				<div className={secondInputClasses}>
					<label htmlFor='lastName'>Last Name</label>
					<input
						ref={lastNameInputRef}
						onBlur={lastNameHandlerBlur}
						type='text'
						id='lastName'
					/>
					{!isLastNameValid && (
						<p className='error-text'>
							Length must be greater than 5
						</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>E-Mail Address</label>
				<input
					ref={emailInputRef}
					onBlur={emailHandlerBlur}
					type='email'
					id='email'
				/>
				{!isEmailValid && (
					<p className='error-text'>Wrong login!!! (Must be @)</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={isTouched}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;

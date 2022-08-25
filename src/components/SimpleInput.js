import { useRef, useState } from 'react';

const SimpleInput = () => {
	const inputRef = useRef();
	const [isValueValid, setIsValueValid] = useState(true);
	const [isTouched, setIsToushed] = useState(false);

	const nameInputHandlerBlur = () => {
		setIsValueValid(true);
		const inputValue = inputRef.current.value;
		if (inputValue.trim().length < 4) {
			setIsToushed(false);
			setIsValueValid(false);
			return;
		}
		setIsToushed(true);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setIsValueValid(true);
	};

	const inputClasses = isValueValid ? 'form-control' : 'form-control invalid';

	return (
		<form onSubmit={submitHandler}>
			<div className={inputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					ref={inputRef}
					onBlur={nameInputHandlerBlur}
					type='text'
					id='name'
				/>
				{!isValueValid && <p className='error-text'>error</p>}
			</div>
			<div className='form-actions'>
				<button disabled={!isTouched}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

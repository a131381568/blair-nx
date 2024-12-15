import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface InputHandle {
	focus: () => void;
	clear: () => void;
	getValue: () => string;
}

interface FocusedInputProps extends InputHTMLAttributes<HTMLInputElement> {
	onValueChange?: (value: string) => void;
	value?: string; // 明確定義 value prop
}

const StyledInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(25, 108, 36, 0.2);
  }
`;

export const FocusedInput = forwardRef<InputHandle, FocusedInputProps>(
	({ onValueChange, value = '', ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const [internalValue, setInternalValue] = useState(value);

		useImperativeHandle(ref, () => ({
			focus: () => {
				inputRef.current?.focus();
			},
			clear: () => {
				setInternalValue('');
				onValueChange?.('');
			},
			getValue: () => internalValue,
		}), [internalValue, onValueChange]);

		useEffect(() => {
			setInternalValue(value);
		}, [value]);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (props.disabled)
				return;
			const newValue = e.target.value;
			setInternalValue(newValue);
			onValueChange?.(newValue);
		};

		return (
			<StyledInput
				ref={inputRef}
				value={internalValue}
				onChange={handleChange}
				{...props}
			/>
		);
	},
);

FocusedInput.displayName = 'FocusedInput';

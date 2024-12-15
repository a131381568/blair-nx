import { type InputHTMLAttributes, forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import type { Theme } from '../components/styled/theme';

interface FocusedInputProps extends InputHTMLAttributes<HTMLInputElement> {
	onValueChange?: (value: string) => void;
}

export interface InputHandle {
	focus: () => void;
	clear: () => void;
	getValue: () => string;
}

const StyledInput = styled.input`
  flex: 1;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(25, 108, 36, 0.2);
  }
`;

export const FocusedInput = forwardRef<InputHandle, FocusedInputProps>(
	({ onValueChange, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);

		useImperativeHandle(
			ref,
			() => ({
				focus: () => inputRef.current?.focus(),
				clear: () => {
					if (inputRef.current) {
						inputRef.current.value = '';
						onValueChange?.('');
					}
				},
				getValue: () => inputRef.current?.value || '',
			}),
			[onValueChange],
		);

		return (
			<StyledInput
				ref={inputRef}
				onChange={e => onValueChange?.(e.target.value)}
				{...props}
			/>
		);
	},
);

FocusedInput.displayName = 'FocusedInput';

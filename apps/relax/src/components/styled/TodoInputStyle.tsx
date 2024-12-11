import styled from 'styled-components';

export const InputContainer = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing.sm};
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Input = styled.input`
	flex: 1;
	padding: ${({ theme }) => theme.spacing.sm};
	border: 1px solid ${({ theme }) => theme.colors.gray};
	border-radius: 4px;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary};
		box-shadow: 0 0 0 2px rgba(25, 108, 36, 0.2);
	}
`;

export const AddButton = styled.button`
	padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
	background-color: ${({ theme }) => theme.colors.primary};
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		opacity: 0.9;
	}

	&:disabled {
		background-color: ${({ theme }) => theme.colors.gray};
		cursor: not-allowed;
	}
`;

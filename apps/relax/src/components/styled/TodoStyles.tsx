import styled from 'styled-components';
import { theme } from './theme';
import type { Theme } from './theme';

// Types
interface TodoItemProps {
	$completed: boolean;
	theme: Theme;
}

// Styled Components
const TodoContainer = styled.div`
  padding: ${theme.spacing.md};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p {
    color: ${theme.colors.gray};
    font-style: italic;
  }
`;

const TodoHeader = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const TodoItem = styled.li<TodoItemProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm};
  margin: ${theme.spacing.sm} 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  background: ${({ $completed }) => $completed ? '#f0fff4' : 'white'};
  color: ${({ $completed }) => $completed ? theme.colors.primary : theme.colors.gray};

  div {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    span.completed {
      text-decoration: line-through;
    }
  }

  &:hover {
    background: #f7fafc;
  }
`;

const TodoCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1rem;
  height: 1rem;
  cursor: pointer;

  &:checked {
    accent-color: ${theme.colors.primary};
  }
`;

const DeleteButton = styled.button`
  padding: ${theme.spacing.sm};
  color: ${theme.colors.danger};
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: #c53030;
    background: #fff5f5;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TodoStats = styled.div`
  margin-top: ${theme.spacing.md};
  font-style: italic;
  font-size: 0.875rem;
  color: ${theme.colors.gray};

  span {
    margin: 0 ${theme.spacing.sm};
    font-weight: bold;

    &.completed {
      color: ${theme.colors.primary};
    }

    &.pending {
      color: ${theme.colors.danger};
    }
  }
`;

export {
	TodoContainer,
	TodoHeader,
	TodoItem,
	TodoCheckbox,
	DeleteButton,
	TodoStats,
};

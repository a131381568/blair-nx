import styled from 'styled-components';
import { useLanguageContext } from '../hooks/useContexts';
import { useTodoStore } from '../stores/useTodoStore';

const DetailContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  background: white;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, $danger }) =>
		$danger ? theme.colors.danger : theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Status = styled.div<{ $completed: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $completed }) =>
		$completed ? theme.colors.primary : theme.colors.gray};
`;

export const TodoDetail = () => {
	const { t } = useLanguageContext();
	const { todos, activeId, toggleTodo, deleteTodo, loadingStates } = useTodoStore();

	const item = todos.find(todo => todo.id === activeId);

	if (!item)
		return null;

	return (
		<DetailContainer>
			<DetailHeader>
				<DetailTitle>{item.text}</DetailTitle>
				<div>
					<ActionButton
						onClick={() => toggleTodo(item.id)}
						disabled={loadingStates[`toggle-${item.id}`]}
						style={{ marginRight: '8px' }}
					>
						{loadingStates[`toggle-${item.id}`]
							? t('loadIng')
							: (item.completed ? t('detailMarkInCompleted') : t('detailMarkCompleted'))}
					</ActionButton>
					<ActionButton
						$danger
						onClick={() => deleteTodo(item.id)}
						disabled={loadingStates[`delete-${item.id}`]}
					>
						{loadingStates[`delete-${item.id}`] ? t('deleteIng') : t('deleteTodo')}
					</ActionButton>
				</div>
			</DetailHeader>
			<Status $completed={item.completed} data-testid="detail-state">
				{t('detailState')}
				:
				{item.completed ? t('detailCompleted') : t('detailInCompleted')}
			</Status>
		</DetailContainer>
	);
};

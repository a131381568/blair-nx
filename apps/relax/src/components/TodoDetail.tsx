import styled from 'styled-components';
import { useLanguageContext } from '../hooks/useContexts';
import type { TodoDetailProps } from '../types/list';

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

export const TodoDetail = ({ item, onToggle, onDelete }: TodoDetailProps) => {
	const { t } = useLanguageContext();

	return (
		<DetailContainer>
			<DetailHeader>
				<DetailTitle>{item.text}</DetailTitle>
				<div>
					<ActionButton
						onClick={() => onToggle(item.id)}
						style={{ marginRight: '8px' }}
					>
						{item.completed ? t('detailMarkInCompleted') : t('detailMarkCompleted')}
					</ActionButton>
					<ActionButton
						$danger
						onClick={() => onDelete(item.id)}
					>
						{t('deleteTodo')}
					</ActionButton>
				</div>
			</DetailHeader>
			<Status $completed={item.completed}>
				{t('detailState')}
				:
				{' '}
				{item.completed ? t('detailCompleted') : t('detailInCompleted')}
			</Status>
		</DetailContainer>
	);
};

import { useQuery } from '@tanstack/react-query';
import { scrumboardApiService } from '../../services/scrumboardApiService';

export const getScrumboardBoardListQueryKey = (listId: string) => ['loop', 'board-list', listId];

export function useGetScrumboardBoardList(listId: string) {
	return useQuery({
		queryFn: () => scrumboardApiService.getScrumboardBoardList(listId),
		queryKey: getScrumboardBoardListQueryKey(listId),
		enabled: !!listId
	});
}

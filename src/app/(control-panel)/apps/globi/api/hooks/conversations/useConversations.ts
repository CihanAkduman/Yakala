import { useQuery } from '@tanstack/react-query';
import { globiApiService } from '../../services/globiApiService';

export const conversationsQueryKey = ['globi', 'conversations'];

export const useConversations = () => {
	return useQuery({
		queryFn: globiApiService.getConversations,
		queryKey: conversationsQueryKey
	});
};
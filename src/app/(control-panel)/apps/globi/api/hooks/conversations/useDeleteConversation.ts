import { useMutation, useQueryClient } from '@tanstack/react-query';
import { globiApiService } from '../../services/globiApiService';
import { conversationsQueryKey } from './useConversations';

export const useDeleteConversation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: globiApiService.deleteConversation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
		}
	});
};
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { globiApiService } from '../../services/globiApiService';
import { conversationsQueryKey } from './useConversations';

export const useUpdateConversation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: globiApiService.updateConversation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
		}
	});
};
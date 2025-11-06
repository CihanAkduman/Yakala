import { useMutation, useQueryClient } from '@tanstack/react-query';
import { globiApiService } from '../../services/globiApiService';
import { conversationsQueryKey } from './useConversations';

export const useCreateConversation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: globiApiService.createConversation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
		}
	});
};
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarApi } from '../../services/calendarApiService';
import { shiftsQueryKey } from './useShifts';
import { useSnackbar } from 'notistack';

export const useDeleteShift = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: calendarApi.deleteShift,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: shiftsQueryKey });
		},
		onError: () => {
			enqueueSnackbar('Vardiya silinirken hata oluştu!', {
				variant: 'error'
			});
		}
	});
};
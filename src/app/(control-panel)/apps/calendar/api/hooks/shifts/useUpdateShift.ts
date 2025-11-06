import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarApi } from '../../services/calendarApiService';
import { shiftsQueryKey } from './useShifts';
import { useSnackbar } from 'notistack';

export const useUpdateShift = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: calendarApi.updateShift,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: shiftsQueryKey });
		},
		onError: () => {
			enqueueSnackbar('Vardiya güncellenirken hata oluştu!', {
				variant: 'error'
			});
		}
	});
};
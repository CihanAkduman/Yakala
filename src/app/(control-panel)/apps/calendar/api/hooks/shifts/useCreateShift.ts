import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarApi } from '../../services/calendarApiService';
import { shiftsQueryKey } from './useShifts';
import { useSnackbar } from 'notistack';

export const useCreateShift = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation({
		mutationFn: calendarApi.createShift,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: shiftsQueryKey });
		},
		onError: () => {
			enqueueSnackbar('Vardiya oluşturulurken hata oluştu!', {
				variant: 'error'
			});
		}
	});
};
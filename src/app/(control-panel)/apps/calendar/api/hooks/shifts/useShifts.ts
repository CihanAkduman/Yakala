import { useQuery } from '@tanstack/react-query';
import { calendarApi } from '../../services/calendarApiService';

export const shiftsQueryKey = ['calendar', 'shifts'];

export const useShifts = () => {
	return useQuery({
		queryFn: calendarApi.getShifts,
		queryKey: shiftsQueryKey
	});
};
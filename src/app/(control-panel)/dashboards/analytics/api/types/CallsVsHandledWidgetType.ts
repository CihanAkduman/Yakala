type DateString = string;

type DataPoint = {
	x: DateString;
	y: number;
};

type Series = {
	name: string;
	data: DataPoint[];
};

/**
 * Gelen vs. İşlenen Çağrılar Widget Type
 */
type CallsVsHandledWidgetType = {
	overallScore: number;
	averageRatio: number;
	predictedRatio: number;
	series: Series[];
	ranges: Record<string, number>;
};

export default CallsVsHandledWidgetType;
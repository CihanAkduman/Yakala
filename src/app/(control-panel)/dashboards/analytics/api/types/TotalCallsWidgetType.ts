/**
 * Series Type
 */
type Series = {
	name: string;
	data: number[];
};

/**
 * Toplam Çağrılar Widget Type
 */
type TotalCallsWidgetType = {
	amount: number;
	labels: string[];
	series: Series[];
};

export default TotalCallsWidgetType;
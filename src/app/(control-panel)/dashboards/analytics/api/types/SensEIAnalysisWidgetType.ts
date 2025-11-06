type SensEIAnalysisWidgetType = {
	amount: number;
	labels: string[];
	series: Array<{ name: string; data: number[] }>;
	change?: number;
};

export default SensEIAnalysisWidgetType;
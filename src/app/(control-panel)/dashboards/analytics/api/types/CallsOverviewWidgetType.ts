type CallsOverviewWidgetType = {
	overallScore: number;
	averageRatio: number;
	predictedRatio: number;
	series: Array<{ name: string; data: Array<{ x: string; y: number }> }>;  // Record yerine Array
	ranges: Record<string, number>;  // string yerine number
};

export default CallsOverviewWidgetType;
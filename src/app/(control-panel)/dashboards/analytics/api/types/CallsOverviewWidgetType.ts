type CallsOverviewWidgetType = {
	ranges: Record<string, string>;
	series: Record<string, Array<{ name: string; data: Array<{ x: string; y: number }> }>>;
};

export default CallsOverviewWidgetType;
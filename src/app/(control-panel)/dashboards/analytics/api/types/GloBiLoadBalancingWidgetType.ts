type GloBiLoadBalancingWidgetType = {
	amount: number;
	labels: string[];
	series: Array<{ name: string; data: number[] }>;
	efficiency?: number;
};

export default GloBiLoadBalancingWidgetType;
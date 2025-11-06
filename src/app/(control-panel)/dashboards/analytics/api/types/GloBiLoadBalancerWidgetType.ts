/**
 * Series Type
 */
type Series = {
	name: string;
	data: number[];
};

/**
 * GloBi Yük Dengeleme Widget Type
 */
type GloBiLoadBalancerWidgetType = {
	currentLoad: number;
	optimalLoad: number;
	callsHandled: number;
	status: 'normal' | 'warning' | 'high';
	peakHours: string[];
	labels: string[];
	series: Series[];
};

export default GloBiLoadBalancerWidgetType;
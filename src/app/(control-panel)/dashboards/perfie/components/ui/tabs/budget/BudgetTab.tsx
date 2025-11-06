import { motion } from 'motion/react';
import DilEkibiOverviewWidget from './widgets/DilEkibiOverviewWidget';
import DilEkibiKpiWidget from './widgets/DilEkibiKpiWidget';
import HaftalikSatisKpiWidget from './widgets/HaftalikSatisKpiWidget';
import AylikSatisKpiWidget from './widgets/AylikSatisKpiWidget';
import YillikSatisKpiWidget from './widgets/YillikSatisKpiWidget';
import SsrSatisDetaylariWidget from './widgets/SsrSatisDetaylariWidget';

/**
 * The BudgetTab component.
 */
function BudgetTab() {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			className="grid w-full min-w-0 grid-cols-1 gap-4 px-6 py-4 sm:grid-cols-6 md:px-8"
			variants={container}
			initial="hidden"
			animate="show"
		>
			{/* En üstte Dil Ekibi Overview */}
			<motion.div
				variants={item}
				className="sm:col-span-6"
			>
				<DilEkibiOverviewWidget />
			</motion.div>

			{/* Dil Ekibi KPI Karşılaştırması */}
			<motion.div
				variants={item}
				className="sm:col-span-3 lg:col-span-4"
			>
				<DilEkibiKpiWidget />
			</motion.div>

			{/* Sağ taraftaki 3 küçük widget */}
			<div className="grid grid-cols-1 gap-y-6 sm:col-span-3 lg:col-span-2">
				<motion.div
					variants={item}
					className="sm:col-span-2"
				>
					<HaftalikSatisKpiWidget />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2"
				>
					<AylikSatisKpiWidget />
				</motion.div>
				<motion.div
					variants={item}
					className="sm:col-span-2"
				>
					<YillikSatisKpiWidget />
				</motion.div>
			</div>

			{/* Alt kısımda SSR Satış Detayları Tablosu */}
			<motion.div
				variants={item}
				className="sm:col-span-6"
			>
				<SsrSatisDetaylariWidget />
			</motion.div>
		</motion.div>
	);
}

export default BudgetTab;
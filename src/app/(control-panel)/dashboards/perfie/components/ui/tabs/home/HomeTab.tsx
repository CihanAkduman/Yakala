import { motion } from 'motion/react';
import KaliteWidget from './widgets/KaliteWidget';
import SatisWidget from './widgets/SatisWidget';
import AhtWidget from './widgets/AhtWidget';
import MmaWidget from './widgets/MmaWidget';
import PerformansWidget from './widgets/PerformansWidget';
import CagriTuruDagilimiWidget from './widgets/CagriTuruDagilimiWidget';
import GelistirmeOnerileriWidget from './widgets/GelistirmeOnerileriWidget';
import PersonalBewertungWidget from './widgets/PersonalBewertungWidget'; 
import YillikPerformansWidget from './widgets/YillikPerformansWidget'; 

/**
 * The HomeTab component.
 */
function HomeTab() {
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
			className="grid w-full min-w-0 grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 md:grid-cols-4 md:px-8"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={item}>
				<KaliteWidget />
			</motion.div>
			<motion.div variants={item}>
				<SatisWidget />
			</motion.div>
			<motion.div variants={item}>
				<AhtWidget />
			</motion.div>
			<motion.div variants={item}>
				<MmaWidget />
			</motion.div>
			
		
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4"
			>
				<PerformansWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>
				<CagriTuruDagilimiWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>
				<GelistirmeOnerileriWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>
				<PersonalBewertungWidget />
			</motion.div>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4 lg:col-span-2"
			>
				<YillikPerformansWidget />
			</motion.div>

		</motion.div>
	);
}

export default HomeTab;
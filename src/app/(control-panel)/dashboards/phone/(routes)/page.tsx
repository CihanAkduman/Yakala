'use client';
import FusePageSimple from '@fuse/core/FusePageSimple';
import PhoneDashboardAppHeader from '../components/ui/PhoneDashboardAppHeader';
import CustomerDetailsWidget from '../components/ui/widgets/CustomerDetailsWidget';
import CustomerHistoryWidget from '../components/ui/widgets/CustomerHistoryWidget';
import PassengerAnalysisWidget from '../components/ui/widgets/PassengerAnalysisWidget';
import PhoneDialerWidget from '../components/ui/widgets/PhoneDialerWidget'; // NEU

function PhoneDashboardAppView() {
    return (
        <FusePageSimple
            header={<PhoneDashboardAppHeader />}
            content={
                <div className="grid w-full grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-2">
                    {/* Erste Zeile - CustomerDetails (volle Breite) */}
                    <div className="lg:col-span-2">
                        <CustomerDetailsWidget />
                    </div>
                    
                    {/* Zweite Zeile - PhoneDialer (volle Breite) */}
                    <div className="lg:col-span-2">
                        <PhoneDialerWidget />
                    </div>
                    
                    {/* Dritte Zeile - History und Analysis (nebeneinander) */}
                    <div>
                        <CustomerHistoryWidget />
                    </div>
                    <div>
                        <PassengerAnalysisWidget />
                    </div>
                </div>
            }
        />
    );
}
export default PhoneDashboardAppView;
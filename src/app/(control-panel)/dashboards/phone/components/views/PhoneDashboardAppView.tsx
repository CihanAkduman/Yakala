import FusePageSimple from '@fuse/core/FusePageSimple';
import CustomerDetailsWidget from '../widgets/CustomerDetailsWidget';
import CustomerHistoryWidget from '../widgets/CustomerHistoryWidget';
import PhoneDashboardAppHeader from '../PhoneDashboardAppHeader';

function PhoneDashboardAppView() {
  return (
    <FusePageSimple
      header={<PhoneDashboardAppHeader />}
      content={
        <div className="w-full">
          {/* Customer Details Widget - Full Width */}
          <div className="mx-8 md:mx-8 my-24 md:my-32">
            <CustomerDetailsWidget />
          </div>
          
          {/* Customer History Widget - Half Width, Left Aligned */}
          <div className="mx-8 md:mx-8 mb-24 md:mb-32">
            <div className="w-full lg:w-1/2">
              <CustomerHistoryWidget />
            </div>
          </div>
        </div>
      }
    />
  );
}

export default PhoneDashboardAppView;
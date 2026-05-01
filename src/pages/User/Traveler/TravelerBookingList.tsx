import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { KYCSTATUS } from "../../../shared/constants_Types/types/roles";
import TravelerKYCWaiting from "./TravelerConponents/TravelerKYCWaiting";
import TravelerKYCRegistration from "./TravelerConponents/TravelerKYCRegistration";
import TravelerKYCRejected from "./TravelerConponents/TravelerKYCRejected";
import TravelerTravelRequestList from "./TravelerConponents/TravelerTravelRequestList";
import { Header } from "../components/Header";

const TravelerBookingList = () => {
  const { user } = useSelector(
    (state: RootState) => state.userState
  );

  const renderContent = () => {
    switch (user?.kycStatus) {
      case KYCSTATUS.PENDING:
        return <TravelerKYCRegistration />;

      case KYCSTATUS.REGISTERED:
      case KYCSTATUS.RESUBMITTED:
        return <TravelerKYCWaiting />;

      case KYCSTATUS.REJECTED:
        return <TravelerKYCRejected />;

      case KYCSTATUS.APPROVED:
        return <TravelerTravelRequestList />;

      default:
        return null;
    }
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <div className="pt-24 bg-gray-50 min-h-screen">
        {renderContent()}
      </div>
    </>
  );
};

export default TravelerBookingList;

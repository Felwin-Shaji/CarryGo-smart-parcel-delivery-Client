import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { KYCSTATUS } from "../../../constants_Types/types/roles";
import TravelerKYCWaiting from "./TravelerConponents/TravelerKYCWaiting";
import TravelerKYCRegistration from "./TravelerConponents/TravelerKYCRegistration";
import TravelerKYCRejected from "./TravelerConponents/TravelerKYCRejected";
import TravelerBookingContents from "./TravelerConponents/TravelerBookingContents";
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
        return <TravelerBookingContents />;

      default:
        return null;
    }
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <div className="pt-20 mt-10">
        {renderContent()}
      </div>
    </>
  );
};

export default TravelerBookingList;

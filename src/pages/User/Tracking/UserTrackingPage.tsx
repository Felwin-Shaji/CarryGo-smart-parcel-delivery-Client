import { useUserTracking } from "../../../Services/User/userTracking";
import { Header } from "../components/Header";
import TrackingPage from "./TrackingPage/TrackingPage"

const UserTrackingPage = () => {
    const { getAgencyTracking, getTravelerTracking } = useUserTracking();

    return (
        <>
            <Header isLoggedIn />
            <div className="p-14 bg-gray-50 min-h-screen">

                <TrackingPage fetchAgencyTracking={getAgencyTracking} fetchTravelerTracking={getTravelerTracking} />
            </div>
        </>
    )
}

export default UserTrackingPage
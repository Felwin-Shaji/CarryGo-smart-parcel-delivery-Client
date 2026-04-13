import { useUserParcelTracking } from "../../../Services/User/userParcelTracking";
import { Header } from "../components/Header";
import TrackingPage from "./TrackingPage/TrackingPage"

const UserTrackingPage = () => {
    const { getUserParcelTracking } = useUserParcelTracking();

    return (
        <>
            <Header isLoggedIn />
            <div className="pt-24 bg-gray-50 min-h-screen">

                <TrackingPage fetchTracking={getUserParcelTracking} />
            </div>
        </>
    )
}

export default UserTrackingPage
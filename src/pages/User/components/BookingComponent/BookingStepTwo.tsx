import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import type {
  getServiceableHubWithAgencyDTO,
  getServiceableTravelerDTO,
} from "../../../../shared/constants_Types/types/User/Booking/bookingResponse.dto";

import BookingLayout from "./BookingStepsComponents/BookingLayout";
import PartnerTabs from "./BookingStepsComponents/PartnerTabs";
import TravelerCard from "./BookingStepsComponents/TravelerCard";
import BookingOverview from "./BookingStepsComponents/BookingOverview";
import { AgencyCard } from "./BookingStepsComponents/AgencyCard";
import NoServiceAvailable from "./BookingStepsComponents/NoServiceAvailable";

import { useBooking } from "../../../../Services/User/Booking/createBooking";
import BookingNavigation from "./BookingStepsComponents/BookingNavigation";
import { UserPagination } from "../UserPagination";

const BookingStepTwo = () => {
  const { state, dispatch } = useBookingContext();
  const { checkServiceableAgency, checkServiceableTraveler } = useBooking();

  const [tab, setTab] = useState<"AGENCIES" | "TRAVELERS">("AGENCIES");
  const [loadingAgencies, setLoadingAgencies] = useState(true);
  const [loadingTravelers, setLoadingTravelers] = useState(false);

  // const [agencyPage, setAgencyPage] = useState(1);
  // const [agencyTotalPages, setAgencyTotalPages] = useState(1);

  const [travelerPage, setTravelerPage] = useState(1);
  const [travelerTotalPages, setTravelerTotalPages] = useState(1);

  const handleBack = () => {
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_BOOKING" });
  };

  const handleContinue = () => {
    dispatch({ type: "SET_STEP", payload: 3 });
  };

  /**
   * Fetch Agencies
   */
  useEffect(() => {
    const fetchAgencies = async () => {
      if (!state.pickupAddress?.location || !state.deliveryAddress?.location)
        return;

      setLoadingAgencies(true);

      const res = await checkServiceableAgency(
        state.pickupAddress.location,
        state.deliveryAddress.location,
      );

      dispatch({
        type: "SET_SERVICEABLE_AGENCIES",
        payload: res,
      });

      // setAgencyTotalPages(res.totalPages);

      setLoadingAgencies(false);
    };

    fetchAgencies();
  }, [state.pickupAddress, state.deliveryAddress]);

  /**
   * Fetch Travelers (lazy load)
   */
  useEffect(() => {
    if (tab !== "TRAVELERS") return;
    if (state.serviceableTravelers?.length) return;

    const fetchTravelers = async () => {
      if (!state.pickupAddress?.location || !state.deliveryAddress?.location)
        return;

      setLoadingTravelers(true);

      const res = await checkServiceableTraveler(
        state.pickupAddress.location,
        state.deliveryAddress.location,
        travelerPage,
        5
      );

      dispatch({
        type: "SET_SERVICEABLE_TRAVELERS",
        payload: res.data,
      });

      setTravelerTotalPages(res.totalPages);

      setLoadingTravelers(false);
    };

    fetchTravelers();
  }, [tab, travelerPage]);

  /**
   * Selection handlers
   */
  const handleSelectAgency = (agency: getServiceableHubWithAgencyDTO) => {
    dispatch({
      type: "SELECT_AGENCY",
      payload: {
        agencyId: agency.agency.agencyId,
        fromHubId: agency.fromHub.hubId,
        toHubId: agency.toHub.hubId,
      },
    });
  };

  const handleSelectTraveler = (traveler: getServiceableTravelerDTO) => {
    dispatch({
      type: "SELECT_TRAVELER",
      payload: {
        travelerId: traveler.traveler.travelerId,
        travelRequestId: traveler.travelRequest.travelRequestId,
      },
    });
  };

  /**
   * Loading state
   */
  if (loadingAgencies) {
    return (
      <BookingLayout
        step={2}
        title="Choose Service"
        description="Select the courier service for delivery."
        left={
          <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
            Checking available delivery partners...
          </div>
        }
        right={
          <BookingOverview
            pickup={state.pickupAddress?.formattedAddress}
            delivery={state.deliveryAddress?.formattedAddress}
            partnerSelected={false}
          />
        }
      />
    );
  }

  /**
   * No service state
   */
  const noServiceAvailable =
    state.serviceableAgencies?.length === 0 &&
    state.serviceableTravelers?.length === 0;

  if (noServiceAvailable) {
    return (
      <BookingLayout
        step={2}
        title="Choose Service"
        description="Select the courier service for delivery."
        left={
          <>
            <PartnerTabs
              tab={tab}
              setTab={setTab}
            />

            <NoServiceAvailable />
          </>
        }
        right={
          <BookingOverview
            pickup={state.pickupAddress?.formattedAddress}
            delivery={state.deliveryAddress?.formattedAddress}
            partnerSelected={false}
          />
        }
      />
    );
  }

  return (
    <BookingLayout
      step={2}
      title="Choose Service"
      description="Select the courier service for delivery."
      left={
        <>
          <PartnerTabs
            tab={tab}
            setTab={setTab}
          />

          {/* Agencies */}
          {tab === "AGENCIES" && (
            <>
              {state.serviceableAgencies?.length ? (
                <>
                  <div className="space-y-3">
                    {state.serviceableAgencies.map((agency) => (
                      <AgencyCard
                        key={agency.agency.agencyId}
                        agency={agency}
                        selected={state.partnerId === agency.agency.agencyId}
                        onSelect={() => handleSelectAgency(agency)}
                      />
                    ))}
                  </div>
                  {/* <UserPagination
                    currentPage={agencyPage}
                    totalPages={agencyTotalPages}
                    onPageChange={setAgencyPage}
                  /> */}
                </>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    🚫 No delivery agencies available.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Travelers */}
          {tab === "TRAVELERS" && (
            <>
              {loadingTravelers ? (
                <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
                  Finding travelers for this route...
                </div>
              ) : state.serviceableTravelers?.length ? (
                <>
                  <div className="space-y-3">
                    {state.serviceableTravelers.map((traveler) => (
                      <TravelerCard
                        key={traveler.travelRequest.travelRequestId}
                        traveler={traveler}
                        selected={state.partnerId === traveler.traveler.travelerId}
                        onSelect={() => handleSelectTraveler(traveler)}
                      />
                    ))}
                  </div>
                  <UserPagination
                    currentPage={travelerPage}
                    totalPages={travelerTotalPages}
                    onPageChange={setTravelerPage}
                  />
                </>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    🚫 No travelers available for this route.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      }
      right={
        <BookingOverview
          pickup={state.pickupAddress?.formattedAddress}
          delivery={state.deliveryAddress?.formattedAddress}
          partnerSelected={!!state.partnerId}
        >
          <BookingNavigation
            onBack={handleBack}
            onReset={handleReset}
            onContinue={handleContinue}
            disableContinue={!state.partnerId}
          />
        </BookingOverview>
      }
    />
  );
};

export default BookingStepTwo;
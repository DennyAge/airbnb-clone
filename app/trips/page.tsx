import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getReservations from '@/app/actions/getReservations';
import TripsClient from '@/app/trips/TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if ( !currentUser ) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subTitle="Please login"
        />
      </ClientOnly>
    );
  }
  const reservations = await getReservations( {
    userId: currentUser.id,
  } );

  if ( reservations.length === 0 ) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips foud"
          subTitle="looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default TripsPage;
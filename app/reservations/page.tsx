import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getReservations from '@/app/actions/getReservations';
import ReservationsClient from '@/app/reservations/ReservationsClient';

const ReservationsPage =  async ()  => {
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
    authorId: currentUser.id,
  } );

  if ( reservations.length === 0 ) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subTitle="Looks like you have no reservations on your prop"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
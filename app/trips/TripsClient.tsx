'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import toast from 'react-hot-toast';
import { SafeReservation, SafeUser } from '@/app/types';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/Listings/ListingCard';


interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient = ( {
  reservations,
  currentUser
}:TripsClientProps ) => {

  const router = useRouter();
  const [ deletingId, setDeletingId ] = useState( '' );

  const onCancel = useCallback( ( id: string ) => {
    setDeletingId( id );
    console.log( id );
    axios.delete( `api/reservations/${ id }` )
      .then( () => {
        toast.success( 'Reservation successfully deleted' );
        router.refresh();
      } )
      .catch( ( error ) => {
        toast( error?.response?.data?.error );
      } )
      .finally( () => {
        setDeletingId( '' );
      } );
  }, [ router ] );

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you've going"
      />
      <div
        className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        "
      >
        {reservations.map( ( reservation ) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={ reservation }
            onAction={onCancel}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ) )}
      </div>
    </Container>
  );
};

export default TripsClient;
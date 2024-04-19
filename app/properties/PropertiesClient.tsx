'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import toast from 'react-hot-toast';
import { SafeListing, SafeUser } from '@/app/types';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/Listings/ListingCard';


interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient = ( {
  listings,
  currentUser
}:PropertiesClientProps ) => {

  const router = useRouter();
  const [ deletingId, setDeletingId ] = useState( '' );

  const onCancel = useCallback( ( id: string ) => {
    setDeletingId( id );
    console.log( id );
    axios.delete( `api/listings/${ id }` )
      .then( () => {
        toast.success( 'Listing successfully deleted' );
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
        title="Properties"
        subTitle="List of your properties"
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
        {listings.map( ( listing ) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={onCancel}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            actionLabel="Delete properti"
            currentUser={currentUser}
          />
        ) )}
      </div>
    </Container>
  );
};

export default PropertiesClient;
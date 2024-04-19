import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getListings from '@/app/actions/getListings';
import PropertiesClient from '@/app/properties/PropertiesClient';


const PropertiesPage = async () => {
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

  const listings = await getListings( {
    userId: currentUser.id,
  } );

  if ( listings.length === 0 ) {
    return (
      <ClientOnly>
        <EmptyState
          title="No propertis foud"
          subTitle="looks like you havent propertis"
        />
      </ClientOnly>
    );
  }
    
  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PropertiesPage;
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getFavoriteListings from '@/app/actions/getFavoriteListings';
import FavoritesClient from '@/app/favorites/FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if ( listings.length === 0 ) {
    return  (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subTitle="Looks like you have no favorites listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
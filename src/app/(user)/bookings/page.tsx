import React from 'react'
import BookingsPage from './_components/UserBookings'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getBookings } from '../../../../actions/bookings';

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  const bookings = await getBookings();
  console.log(bookings);

  return <BookingsPage bookings={bookings} />
}

export default page

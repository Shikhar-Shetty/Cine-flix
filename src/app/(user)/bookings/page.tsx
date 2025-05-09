import React from 'react'
import BookingsPage from './_components/UserBookings'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getBookings } from '../../../../actions/bookings';

const page = async() => {
    const session = await getServerSession(authOptions);
    console.log(session);
    
    const userId = session?.user.userId;
    const bookings = await getBookings(userId);
    console.log(bookings);
    


  return (
    <div>
        <BookingsPage bookings={bookings}/>
    </div>
  )
}

export default page

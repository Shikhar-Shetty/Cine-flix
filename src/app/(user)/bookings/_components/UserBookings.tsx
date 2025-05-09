"use client";
import DeleteBookingButton from "../../../../components/DeleteBookingButton";


interface BookingProps {
    bookings: any[];
  }

export default function BookingsPage({ bookings }: BookingProps) {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You don&apos;t have any bookings yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-lg font-semibold">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.bookingDate).toLocaleTimeString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                  ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {booking.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-end">
                <DeleteBookingButton bookingId={booking.id} userId={booking.userId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
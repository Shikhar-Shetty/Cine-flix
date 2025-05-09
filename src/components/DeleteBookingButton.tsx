"use client";

import { useState } from "react";
import { deleteBooking } from "../../actions/bookings";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteBookingButtonProps {
  bookingId: number;
  userId: number;
}

export default function DeleteBookingButton({ bookingId, userId }: DeleteBookingButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBooking(bookingId, userId);
      router.refresh();
    } catch (err) {
      console.error("Failed to delete booking:", err);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
    >
      {isDeleting ? (
        <>
          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          <span>Cancelling...</span>
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          <span>Cancel Booking</span>
        </>
      )}
    </button>
  );
}
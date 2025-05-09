"use server";
import prisma from "../lib/prisma";

export const addBooking = async (userId: number, bookingDate: Date) => {
  try {
    const newBooking = await prisma.bookings.create({
      data: {
        userId: userId,
        bookingDate: bookingDate,
        status: "pending", 
      },
    });
    return newBooking;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw new Error("Failed to add booking");
  }
};

export const getBookings = async (userId: number) => {
  try {
    const bookings = await prisma.bookings.findMany({
      where: { userId: userId },
      orderBy: { bookingDate: "desc" },
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
};

export const deleteBooking = async (bookingId: number, userId: number) => {
  try {
    const booking = await prisma.bookings.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.userId !== userId) {
      throw new Error("Booking not found or user is not authorized");
    }

    await prisma.bookings.delete({
      where: { id: bookingId },
    });

    return { message: "Booking deleted successfully" };
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw new Error("Failed to delete booking");
  }
};

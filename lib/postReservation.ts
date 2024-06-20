export default async function createReservation(
  roomId: string,
  email: string | null,
  initDate: Date,
  endDate: Date
) {
  const url = `http://localhost:3000/api/rooms/${roomId}/reservations`;

  if (!email) {
    throw new Error("You must be logged in to create a reservation.");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        initDate: initDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Tentar converter o corpo da resposta para JSON
      console.error(
        `HTTP error! Status: ${response.status}, Error: ${JSON.stringify(
          errorResponse
        )}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An error occurred while processing the reservation.");
  }
}

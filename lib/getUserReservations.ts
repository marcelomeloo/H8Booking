export default async function getUserReservations(email: string) {
    let responseClone: any;
    const res = await fetch(
      `${process.env.BASE_URL}/api/users/reservations?email=${email}`,
    )
    .then(response => {
        responseClone = response.clone(); // 2
        return response.json();
    })
    .catch((e) => {
        console.log(e);
      throw new Error(e);
    });
    const string = await responseClone?.text()
    return string;
  }
  
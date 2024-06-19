import axios from "axios";

function generateRandomColor(): string {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - random.length) + random;
}

export const handlePictureAPI = async (
  firstName: string,
  lastName: string
): Promise<Blob> => {
  let apiUrl = 'https://ui-avatars.com/api/';
  apiUrl += `?name=${encodeURIComponent(firstName + " " + lastName)}&size=200&color=fff&rounded=true`;
  const randomBackgroundColor = generateRandomColor();
  apiUrl += `&background=${encodeURIComponent(randomBackgroundColor)}`;

  const response = await axios.get(apiUrl, { responseType: 'blob' });
  return response.data;
};

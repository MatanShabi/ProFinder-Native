import axios from "axios";

function generateRandomColor(): string {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - random.length) + random;
}

export const handlePictureAPI = async (firstName: string, lastName: string): Promise<Blob> => {
  let apiUrl = 'https://ui-avatars.com/api/';
  const nameParam = `?name=${encodeURIComponent(firstName + " " + lastName)}`;
  const sizeParam = `&size=200`;
  const colorParam = `&color=fff`;
  const roundedParam = `&rounded=true`;

  apiUrl += nameParam + sizeParam + colorParam + roundedParam;

  const randomBackgroundColor = generateRandomColor();
  const backgroundParam = `&background=${encodeURIComponent(randomBackgroundColor)}`;

  apiUrl += backgroundParam;

  const response = await axios.get(apiUrl, { responseType: 'blob' });
  return response.data;
};

export const generateRandomName = () => {
  const characters = "0123456789abcdefghijklmnop";
  let result = "";
  for (let i = 0; i < 40; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

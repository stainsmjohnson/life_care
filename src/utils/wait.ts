export const wait = (duration: number = 5000) => {
  console.log('## App in wait state...');

  return new Promise(resolve => {
    setTimeout(() => {
      console.log('## App wait terminated.');
      resolve(true);
    }, duration);
  });
};

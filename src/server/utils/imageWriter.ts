import fs from 'fs/promises';

export default async (base64: string, filePath: string) => {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64Data, 'base64');
  await fs.writeFile(filePath, dataBuffer);
};

export async function sourceToBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function sourceToBase64(url: string): Promise<string> {
  try {
    const blob = await sourceToBlob(url);
    const base64String = await blobToBase64(blob);
    return base64String;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to convert image to Base64.');
  }
}

export function base64ToBlob(base64: string): Blob {
  let byteCharacters: string;
  if (base64.split(',').length === 2) {
    byteCharacters = atob(base64.split(',')[1]);
  } else {
    byteCharacters = atob(base64);
  }
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'image/jpeg' }); // Replace 'image/jpeg' with the appropriate MIME type if needed
}

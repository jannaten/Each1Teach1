export const getCroppedImg = (imageSrc, crop) => {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180;
  };

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    // Resize the image
    const resizeCanvas = document.createElement('canvas');
    const minDimension = 400;
    const maxDimension = 800; // Adjust this value to change the output size
    let width = canvas.width;
    let height = canvas.height;

    if (width > height) {
      if (width > maxDimension) {
        height *= maxDimension / width;
        width = maxDimension;
      } else if (width < minDimension) {
        height *= minDimension / width;
        width = minDimension;
      }
    } else {
      if (height > maxDimension) {
        width *= maxDimension / height;
        height = maxDimension;
      } else if (height < minDimension) {
        width *= minDimension / height;
        height = minDimension;
      }
    }

    resizeCanvas.width = width;
    resizeCanvas.height = height;

    const resizeCtx = resizeCanvas.getContext('2d');
    resizeCtx.drawImage(canvas, 0, 0, width, height);

    return new Promise((resolve) => {
      resizeCanvas.toBlob(
        (file) => {
          file.name = 'cropped_and_resized.jpeg';
          resolve(URL.createObjectURL(file));
        },
        'image/jpeg',
        0.8
      ); // Adjust the quality as needed
    });
  };

  return getCroppedImg(imageSrc, crop);
};

export default getCroppedImg;

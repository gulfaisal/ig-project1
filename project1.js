// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0)
//means the top-left pixels of the foreground and background are aligned.
function composite(bgImg, fgImg, fgOpac, fgPos) {
  const { x: xPos, y: yPos } = fgPos;

  //Get boundaries of background image withing wich to set foreground pixels:
  const startX = Math.max(0, xPos);
  const startY = Math.max(0, yPos);
  const endX = Math.min(bgImg.width, xPos + fgImg.width);
  const endY = Math.min(bgImg.height, yPos + fgImg.height);

  //We will now go column, by column and row by row, replacing pixels as needed:
  for (var y = startY; y < endY; y++) {
    for (var x = startX; x < endX; x++) {
      const bgIndex = getIndex(x, y, bgImg.width);
      const fgIndex = getIndex(x - xPos, y - yPos, fgImg.width);
      const fgAlpha = (fgImg.data[fgIndex + 3] / 255) * fgOpac;

      if (fgAlpha > 0) {
        //Red Pixel combination:
        bgImg.data[bgIndex] =
          fgImg.data[fgIndex] * fgAlpha + bgImg.data[bgIndex] * (1 - fgAlpha);
        //Green:
        bgImg.data[bgIndex + 1] =
          fgImg.data[fgIndex + 1] * fgAlpha +
          bgImg.data[bgIndex + 1] * (1 - fgAlpha);
        //Blue
        bgImg.data[bgIndex + 2] =
          fgImg.data[fgIndex + 2] * fgAlpha +
          bgImg.data[bgIndex + 2] * (1 - fgAlpha);
        //Alpha
        bgImg.data[bgIndex + 3] =
          fgImg.data[fgIndex + 3] * fgAlpha +
          bgImg.data[bgIndex + 3] * (1 - fgAlpha);
      }
    }
  }
}
//Util function to locate index for given coordinates:
const getIndex = (x, y, width) => {
  //Get the red index:
  const redIndex = y * (width * 4) + x * 4;
  return redIndex;
};

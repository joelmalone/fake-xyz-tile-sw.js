function onFetch(event) {
  const url = new URL(event.request.url)
  if (url.host === 'fake-xyz-server') {
    event.respondWith(
      generateImage(url)
    );
  }
}

async function generateImage(url) {
  const [, x, y, z] = url.pathname
    .split('/')
    .map(i => Number.parseInt(i))

  const canvas = new OffscreenCanvas(256, 256);
  var context = canvas.getContext("2d");
  context.fillStyle = '#F74D0060';
  context.fillRect(8, 8, 240, 240);
  context.font = "20px Arial";
  context.fillStyle = 'black';
  context.fillText(`${x}, ${y}, ${z}`, 16, 128);
  const blob = await canvas.convertToBlob()
  return new Response(blob)
}

self.addEventListener("fetch", onFetch);

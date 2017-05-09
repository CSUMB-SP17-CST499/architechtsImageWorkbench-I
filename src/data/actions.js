const setPreviewImageUrl = (url) => ({
  url,
  type: 'SET_PREVIEW_IMAGE_URL',
});

const setImages = (images) => ({
  images,
  type: 'SET_IMAGES',
});

export { setImages, setPreviewImageUrl, setPreviewLabels };

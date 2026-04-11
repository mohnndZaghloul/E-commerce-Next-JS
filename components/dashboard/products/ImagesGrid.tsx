type ImagesGrid_TP = {
  imageUrls: string[];
  handleRemove: (urlToRemove: string) => void;
};

export default function ImagesGrid({ imageUrls, handleRemove }: ImagesGrid_TP) {
  return (
    <>
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {imageUrls.map((url) => (
            <div key={url} className="relative">
              <img src={url} className="w-full h-24 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

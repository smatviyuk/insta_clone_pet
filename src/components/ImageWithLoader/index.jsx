import { Bars } from "react-loader-spinner";
import cn from "classnames";
import "./styles.css";
import { useState } from "react";

const ImageWithLoader = ({ src, alt, className }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const onError = () => {
    setIsImageError(true);
    setIsImageLoaded(false);
  };

  return (
    <div className={cn("cnImageWithLoaderRoot", className)}>
      {!isImageLoaded && (
        <div className="cnImageWithLoaderWrapper">
          {isImageError ? (
            "err"
          ) : (
            <Bars width={15} height={15} color="#000BFF" />
          )}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsImageLoaded(true)}
        className={cn(
          "cnImageWithLoaderImage",
          isImageLoaded && "cnImageWithLoaderImageLoaded"
        )}
        onError={onError}
      />
    </div>
  );
};

export default ImageWithLoader;

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import Link from "next/link";

const PostGallery = ({
  images,
  postId,
}: {
  images: string[];
  postId: string;
}) => {
  return (
    <LightGallery
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames="w-full grid grid-cols-2 md:grid-cols-4 gap-[10px]"
    >
      {images.map((img, i) => {
        let span = "col-span-2"; 
        if (images.length === 1) {
          span = "md:col-span-4"; 
        } else if (images.length === 2) {
          span = "col-span-2 md:col-span-2"; 
        } else if (images.length === 3) {
          if (i < 2) {
            span = "col-span-2 md:col-span-2"; 
          } else {
            span = "col-span-2 md:col-span-4"; 
          }
        } else if (images.length === 4) {
          span = "col-span-1 md:col-span-1"; 
        }

        return (
          <Link
            href={img}
            key={`${postId} Image ${i + 1}`}
            className={`rounded-[10px] w-full aspect-[150/75] ${span}`}
          >
            <Image
              width={600}
              height={300}
              alt={`Image ${i + 1}`}
              src={img}
              className="rounded-[10px] w-full h-full object-cover"
            />
          </Link>
        );
      })}
    </LightGallery>
  );
};

export default PostGallery;
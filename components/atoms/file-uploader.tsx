import imageCompression from "browser-image-compression";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

export function FileUploader(props: {
  children: ReactNode;
  onFileLoaded: (base64: string) => void;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: async (files) => {
      const compressedFile = await imageCompression(files[0], {
        maxSizeMB: 0.3,
        alwaysKeepResolution: true,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;

        props.onFileLoaded(result);
      };

      if (compressedFile) reader.readAsDataURL(compressedFile);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input data-cy="add-image" {...getInputProps()} />
      {props.children}
    </div>
  );
}

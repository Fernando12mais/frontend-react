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
    onDrop: (files) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;

        props.onFileLoaded(result);
      };

      if (files?.length) reader.readAsDataURL(files[0]);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {props.children}
    </div>
  );
}

import { Builder } from "@/Client";
import { Utils } from "@/Utils";

export const MyFs = {
  root: `${Builder.roots.jomla}/api/v1`,
  Post: async (formData: FormData, id: string) => {
    return await fetch(`${MyFs.root}/upload-one?id=${id}`, {
      method: "POST",
      body: formData,
    });
  },
  uploadFile: async (file: File, id?: string) => {
    if (!id) id = Utils.getUUID();
    const formData = new FormData();
    formData.append("file", file);
    await MyFs.Post(formData, id);
    return id;
  },
  ensureUploaded: async (src: any) => {
    if (src)
      if (typeof src !== "string") {
        if (src.file) src = await MyFs.uploadFile(src.file);
      }
    return src;
  },
  Get: (id: string) => `${MyFs.root}/images/${id}.webp`,
  Load: (src) => {
    return src.startsWith("http") ? src : MyFs.Get(src);
  },
};

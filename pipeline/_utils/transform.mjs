export function transformToMetadataCollection(object, source) {
  return object.collection.map((item) => {
    const metadata = item;

    if (metadata.arxiv) {
      metadata.arxiv = `arxiv:${metadata.arxiv
        .trim()
        .toLowerCase()
        .replace("arxiv:", "")}`;
    }

    metadata.addTime = new Date();
    metadata.authors = metadata.authors
      .map((author) => {
        return `${author.first_name} ${author.last_name}`;
      })
      .join(", ");
    metadata.minifiedtitle = `${metadata.title
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()}`;
    metadata.source = source;
    metadata.hits = 1;
    metadata.permission = 2;

    return metadata;
  });
}

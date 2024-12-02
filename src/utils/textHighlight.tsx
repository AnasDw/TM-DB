export const TextHighlight = (text: string, searchString: string) => {
  const index = text.toLowerCase().indexOf(searchString.toLowerCase());

  if (index !== -1) {
    const before = text.substring(0, index);
    const matched = text.substring(index, index + searchString.length);
    const after = text.substring(index + searchString.length);

    return (
      <div>
        {before}
        <span style={{ fontWeight: 600 }}>{matched}</span>
        {after}
      </div>
    );
  }

  // Return the original text if the substring is not found
  return text;
};

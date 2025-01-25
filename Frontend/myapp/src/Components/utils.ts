export const convertToEmbedLink = (url : String) => {
    const regex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return "Invalid Link";
  }
  

  
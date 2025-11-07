/**
 * Gera a URL completa para imagens do servidor
 * @param {string} filename - Nome do arquivo da imagem
 * @returns {string} URL completa da imagem
 */
export const getImageUrl = (filename) => {
  if (!filename) return '';
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'https://nest-visalytica.onrender.com';
  return `${baseUrl}/uploads/${filename}`;
};

/**
 * Componente de imagem que usa a URL correta do servidor
 */
export const ServerImage = ({ src, alt, className, ...props }) => {
  const imageUrl = getImageUrl(src);
  
  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className={className}
      {...props}
    />
  );
};
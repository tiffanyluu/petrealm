import Image from 'next/image';

const PetImage = ({ type }) => {
  return (
    <Image 
      src={`/${type.toLowerCase()}.png`} 
      alt={type} 
      width={100} 
      height={100} 
    />
  );
};

export default PetImage;

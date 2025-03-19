"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';

const PetImage = ({ type, isBouncing=false }) => {
  return (
    <motion.div 
        animate={isBouncing ? { y: [-10, 0, -10, 0] } : {}}
        transition={{ duration: 0.4, repeat: 2}}
      >
        <Image 
          src={`/${type.toLowerCase()}.png`} 
          alt={type} 
          width={100} 
          height={100} 
        />
      </motion.div>
  );
};

export default PetImage;

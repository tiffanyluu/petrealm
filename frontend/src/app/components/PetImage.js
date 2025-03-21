"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';

const PetImage = ({ type, isBouncing = false }) => {
  return (
    <div className="w-full h-48 flex justify-center items-center">
      <motion.div
        animate={isBouncing ? { y: [-10, 0, -10, 0] } : {}}
        transition={{ duration: 0.4, repeat: 2 }}
      >
        <Image
          src={`/${type.toLowerCase()}.png`}
          alt={type}
          width={100}
          height={100}
          className="max-h-full max-w-full object-contain"
        />
      </motion.div>
    </div>
  );
};

export default PetImage;

/**
 * This file acts as a central hub to import and export all pet-related controller functions. 
 * Each function handles a specific operation, such as adding, retrieving, 
 * feeding, releasing pets, and applying hunger decay.
 */

const { getAllPets } = require('./get-all-pets');
const { getPetById } = require('./get-pet-by-id');
const { addPet } = require('./add-pet');
const { feedPet } = require('./feed-pet');
const { releasePet } = require('./release-pet');
const { hungerDecay } = require('./hunger-decay');

module.exports = {
    getAllPets,
    getPetById,
    addPet,
    feedPet,
    releasePet,
    hungerDecay
};
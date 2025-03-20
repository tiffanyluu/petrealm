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
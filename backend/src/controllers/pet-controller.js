const petModel = require('../models/pet-model');
const { logger, sendMetric } = require('../config/logger');

// Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await petModel.getAllPets();
        logger.info(`Retrieved ${pets.length} pets`);
        sendMetric("PetsRetrieved", pets.length);
        res.json(pets);
    } catch (err) {
        logger.error(`Error fetching pets: ${err.message}`);
        sendMetric("ErrorsLogged", 1);
        res.status(500).send({ message: "Error fetching pets" });
    }
};

// Get pet by ID
exports.getPetById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const pet = await petModel.getPetById(id);
        if (pet) {
            logger.info(`Retrieved pet: ${pet.name} (ID: ${id})`);
            sendMetric("PetFetched", 1);
            res.json({ pet });
        } else {
            logger.warn(`Pet not found (ID: ${id})`);
            res.status(404).send({ message: 'Pet not found' });
        }
    } catch (err) {
        logger.error(`Error fetching pet: ${err.message}`);
        sendMetric("ErrorsLogged", 1);
        res.status(500).send({ message: "Error fetching pet" });
    }
};

// Add a new pet
exports.addPet = async (req, res) => {
    const { name } = req.body;
    try {
        const newPet = await petModel.addPet(name);
        logger.info(`New pet created: ${newPet.name} (ID: ${newPet.id})`);
        sendMetric("PetsCreated", 1);
        res.json({ message: 'New pet added', pet: newPet });
    } catch (err) {
        logger.error(`Error adding pet: ${err.message}`);
        sendMetric("ErrorsLogged", 1);
        res.status(500).send({ message: "Error adding pet" });
    }
};

// Feed a pet (update hunger level)
exports.feedPet = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const fedPet = await petModel.feedPet(id);
        if (fedPet) {
            logger.info(`Pet fed: ${fedPet.name} (ID: ${id}) - Hunger increased and last fed updated`);
            sendMetric("PetsFed", 1);
            res.json({ message: 'Hunger level increased and feeding time recorded', pet: fedPet });
        } else {
            logger.warn(`Pet not found (ID: ${id})`);
            res.status(404).send({ message: "Pet not found" });
        }
    } catch (err) {
        logger.error(`Error updating hunger level for pet (ID: ${id}): ${err.message}`);
        sendMetric("ErrorsLogged", 1);
        res.status(500).send({ message: "Error updating hunger level" });
    }
};

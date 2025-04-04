/**
 * Express router for handling pet-related API routes.
 */

const express = require('express');
const router = express.Router();
const petController = require('../controllers');

// Define API routes, calling controller functions
router.get('/pets', petController.getAllPets);
router.get('/pets/:id', petController.getPetById);
router.post('/pets', petController.addPet);
router.post('/pets/:id/feed', petController.feedPet);
router.delete('/pets/:id', petController.releasePet);

module.exports = router;

/**
 * Provides Lambda-compatible functions to handle API requests.  
 * Calls controller functions and formats HTTP responses.  
 * Includes operations for fetching, adding, feeding, releasing pets, and applying hunger decay.  
 */

const petController = require('../controllers');

const createResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': 'https://petrealm.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  body: JSON.stringify(body)
});

module.exports.getAllPets = async (event) => {
  try {
    const pets = await petController.getAllPets();
    return createResponse(200, pets);
  } catch (error) {
    console.error('Error getting all pets:', error);
    return createResponse(500, { message: 'Error getting all pets' });
  }
};

module.exports.getPetById = async (event) => {
  const id = parseInt(event.pathParameters.id, 10);
  if (isNaN(id)) {
    return createResponse(400, { message: "Invalid pet ID" });
  }
  try {
    const pet = await petController.getPetById(id);
    if (pet) {
      return createResponse(200, pet);
    } else {
      return createResponse(404, { message: 'Pet not found' });
    }
  } catch (error) {
    console.error(`Error getting pet by ID ${id}:`, error);
    return createResponse(500, { message: 'Error getting pet by ID' });
  }
};

module.exports.addPet = async (event) => {
  const { name } = JSON.parse(event.body);
  if (!name) {
    return createResponse(400, { message: 'Pet name is required' });
  }
  try {
    const newPet = await petController.addPet(name);
    return createResponse(201, { message: 'New pet added', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    return createResponse(500, { message: 'Error adding pet' });
  }
};

module.exports.releasePet = async (event) => {
  const { id } =event.pathParameters;
  if (!id) {
    return createResponse(400, { message: 'Pet ID is required' });
  }
  try {
    const releasedPet = await petController.releasePet(id);
    if (!releasedPet) {
      return createResponse(404, { message: 'Pet not found' });
    }
    return createResponse(200, { message: 'Pet released', pet: releasedPet });
  } catch (error) {
    console.error('Error releasing pet:', error);
    return createResponse(500, { message: 'Error releasing pet' });
  }
};


module.exports.feedPet = async (event) => {
  const id = parseInt(event.pathParameters.id, 10);
  if (isNaN(id)) {
    return createResponse(400, { message: 'Invalid pet ID' });
  }
  try {
    const fedPet = await petController.feedPet(id);
    if (fedPet) {
      return createResponse(200, fedPet);
    } else {
      return createResponse(404, { message: 'Pet not found' });
    }
  } catch (error) {
    console.error(`Error feeding pet with ID ${id}:`, error);
    return createResponse(500, { message: 'Error feeding pet' });
  }
};

module.exports.hungerDecay = async () => {
  try {
    await petController.hungerDecay();
    return createResponse(200, { message: 'Hunger decay applied to all pets' });
  } catch (error) {
    console.error('Error applying hunger decay:', error);
    return createResponse(500, { message: 'Error applying hunger decay' });
  }
};


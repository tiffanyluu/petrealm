const pool = require('../config');
const petTypes = ["Dragon", "Unicorn", "Phoenix", "Griffin", "Pegasus"];

exports.addPet = async (name) => {
    if (!name) throw new Error("Pet name is required");
    const randomType = petTypes[Math.floor(Math.random() * petTypes.length)];
    try {
        const { rows } = await pool.query(
            'INSERT INTO public.pet_profiles (name, type, hunger, last_fed_at) VALUES ($1, $2, 100, NOW()) RETURNING *',
            [name, randomType]
        );
        return rows[0];
    } catch (error) {
        console.error("Error adding new pet:", error);
        throw new Error("Failed to add new pet");
    }
};
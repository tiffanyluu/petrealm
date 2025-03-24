/**
 * Increases a pet's hunger level by 10, up to a maximum of 100%.
 * Returns the updated pet profile or null if no pet with the given ID is found.
 */

const pool = require('../config');

exports.feedPet = async (id) => {
    if (!id) throw new Error("Pet ID is required");

    try {
        const now = new Date().toISOString();
        const { rows } = await pool.query(
            'UPDATE public.pet_profiles SET hunger = LEAST(hunger + 10, 100), last_fed_at = $1 WHERE id = $2 RETURNING *',
            [now, id]
        );
        return rows[0] || null;
    } catch (error) {
        console.error(`Error feeding pet with ID ${id}:`, error);
        throw new Error("Failed to feed pet");
    }
};
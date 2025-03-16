const pool = require('../config');
const { logger, sendMetric } = require('../utils');

exports.handler = async (event) => {
    logger.info('Hunger decay function started');
    try {
        const {rowCount} = await pool.query(
            'UPDATE public.pet_profiles SET hunger = GREATEST(hunger - 5, 0) RETURNING id;'
        );
        logger.info(`Updated hunger for ${rowCount} pets`);
        sendMetric("Hunger decay success", rowCount);
        logger.info('Hunger decay function completed successfully');
        return { message: "Hunger decay applied successfully!" };
    } catch (err) {
        logger.error('Error applying hunger decay:', err);
        sendMetric("Hunger Decay Failure", 1);
    }
}
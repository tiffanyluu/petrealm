/** 
 * Express server that handles pet routes under "/api".  
 * Listens on the specified port (defaults to 3000).  
*/

const express = require('express');
const app = express();
const petRoutes = require('./routes');

app.use(express.json());
app.use('/api', petRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
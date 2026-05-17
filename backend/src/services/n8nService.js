const axios = require("axios");

const triggerWorkflow = async (
    payload
) => {
    try {
        const response =
            await axios.post(
                process.env.N8N_WEBHOOK_URL,
                payload
            );

        return response.data;

    } catch (error) {
        console.error(
            "n8n workflow error:",
            error.message
        );

        throw error;
    }
};

module.exports = {
    triggerWorkflow,
};
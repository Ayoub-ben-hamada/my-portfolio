exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // Dynamically import node-fetch to support ESM in Netlify Functions
        const fetch = (await import('node-fetch')).default;

        console.log("Request received.");

        const { name, email, subject, message } = JSON.parse(event.body);
        console.log("Parsed request body:", { name, email, subject, message });

        const API_KEY = process.env.ELASTIC_EMAIL_API_KEY; // Secure API Key
        console.log("API Key:", API_KEY);  // Log the API key

        const FROM_EMAIL = "ayoubbenhamada2@gmail.com"; // Replace with your verified email
        const TO_EMAIL = "ayoubbenhamada25@gmail.com"; // Replace with your destination email

        // Try to fetch the Elastic Email API
        const response = await fetch("https://api.elasticemail.com/v2/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                apikey: API_KEY,
                from: FROM_EMAIL,
                to: TO_EMAIL,
                subject: subject,
                bodyText: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                isTransactional: true
            }),
        });

        // Log the raw response text for debugging
        const rawResponse = await response.text();
        console.log("Raw Response:", rawResponse);

        // If response is not empty, attempt to parse it as JSON
        let result = {};
        if (rawResponse) {
            try {
                result = JSON.parse(rawResponse);
                console.log("Elastic Email Response:", result);
            } catch (e) {
                console.error("Error parsing JSON:", e);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: "Failed to parse JSON response", details: e.message }),
                };
            }
        } else {
            console.error("Received empty response");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Received empty response from Elastic Email" }),
            };
        }

        if (result.success === true) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Message sent successfully!" }),
            };
        } else {
            console.error("Elastic Email returned an error:", result);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to send message", details: result }),
            };
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
};

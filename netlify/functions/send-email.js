const fetch = (await import('node-fetch')).default;

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        console.log("Request received.");  // Log when the function starts executing
        
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
        console.log("Raw Response:", rawResponse);  // Log raw response

        // If response is not empty, attempt to parse it as JSON
        let result = {};
        if (rawResponse) {
            try {
                result = JSON.parse(rawResponse);
                console.log("Elastic Email Response:", result);  // Log the parsed response
            } catch (e) {
                console.error("Error parsing JSON:", e);
            }
        } else {
            console.error("Received empty response");
        }

        if (result.success === true) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Message sent successfully!" }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to send message", details: result }),
            };
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

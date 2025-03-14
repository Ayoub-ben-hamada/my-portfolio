const fetch = require("node-fetch");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { name, email, subject, message } = JSON.parse(event.body);

        const API_KEY = process.env.ELASTIC_EMAIL_API_KEY; // Secure API Key
        const FROM_EMAIL = "ayoubbenhamada2@gmail.com"; // Replace with your verified email
        const TO_EMAIL = "ayoubbenhamada25@gmail.com"; // Replace with your destination email

        // Send email request to Elastic Email API
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

        // Check if the email was sent successfully
        if (response.ok) {
            const result = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(result), // Success response
            };
        } else {
            const error = await response.json();
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: error.message || "Failed to send email" }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

/**
 * EmailJS Configuration and Contact Form Handler
 * 
 * Setup Instructions:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an email service (Gmail recommended)
 * 3. Create an email template with these variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 * 4. Get your Public Key from Account > General
 * 5. Replace the values below with your actual keys
 */

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'ceDrF1bLeMnnvigiX',  // EmailJS public key
    serviceId: 'service_anyi16m',   // EmailJS service ID
    templateId: 'template_e01wt5i'  // EmailJS template ID
};

// Initialize EmailJS
(function() {
    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
    });
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const loadingMsg = contactForm.querySelector('.loading');
        const errorMsg = contactForm.querySelector('.error-message');
        const sentMsg = contactForm.querySelector('.sent-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Hide all messages
        loadingMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        sentMsg.style.display = 'none';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            from_name: contactForm.querySelector('[name="from_name"]').value,
            from_email: contactForm.querySelector('[name="from_email"]').value,
            subject: contactForm.querySelector('[name="subject"]').value,
            message: contactForm.querySelector('[name="message"]').value,
            to_email: 'ayoubbenhamada25@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            formData
        ).then(
            function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Hide loading, show success
                loadingMsg.style.display = 'none';
                sentMsg.style.display = 'block';
                submitBtn.disabled = false;

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    sentMsg.style.display = 'none';
                }, 5000);
            },
            function(error) {
                console.error('FAILED...', error);
                
                // Hide loading, show error
                loadingMsg.style.display = 'none';
                errorMsg.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer ou me contacter directement à ayoubbenhamada25@gmail.com';
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;

                // Hide error message after 5 seconds
                setTimeout(function() {
                    errorMsg.style.display = 'none';
                }, 5000);
            }
        );
    });
});

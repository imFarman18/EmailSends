// Initialize EmailJS
(function(){
  emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

function sendEmails() {
  // Get form values
  const senderEmail = document.getElementById("senderEmail").value;
  const emails = document.getElementById("emails").value.split(',').map(email => email.trim());
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  const fileInput = document.getElementById("attachment").files[0];

  if (!fileInput) {
    alert("Please attach a PDF file.");
    return;
  }

  // Read file as Base64
  const reader = new FileReader();
  reader.onload = function(event) {
    const base64String = event.target.result.split(',')[1]; // Remove "data:application/pdf;base64,"

    // Loop through email list and send to each one individually
    emails.forEach((recipientEmail) => {
      const emailParams = {
        from_email: senderEmail,
        to_email: recipientEmail,
        subject: subject,
        message: message,
        attachment: base64String
      };

      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams)
        .then(function(response) {
          console.log("Email successfully sent to " + recipientEmail, response.status, response.text);
          alert(`Email successfully sent to ${recipientEmail}`);
        })
        .catch(function(error) {
          console.log("Failed to send email to " + recipientEmail, error);
          alert(`Failed to send email to ${recipientEmail}`);
        });
    });
  };

  reader.readAsDataURL(fileInput);
}


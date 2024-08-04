document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    // Check if all fields are filled
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Name validation
    var namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        alert('Please enter a valid name. Only letters and spaces are allowed.');
        return;
    }

    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    alert('Form submitted successfully!');
    console.log('Form submitted successfully!');

    localStorage.setItem('contactFormData', JSON.stringify({ name: name, email: email, message: message }));

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

});

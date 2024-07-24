document.addEventListener('DOMContentLoaded', function() {
    // Fetch dropdown values from the server
    fetch('/dropdown-values')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dropdown data:', data); // Debugging line
        if (data.error) {
            console.error('Error fetching dropdown values:', data.error);
            return;
        }

        const locationSelect = document.getElementById('location');

        // Clear existing options (if any)
        locationSelect.innerHTML = '';

        // Populate Location Alias dropdown
        data.locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationSelect.appendChild(option);
        });

        // Optional: Check if options were added
        if (locationSelect.options.length === 0) {
            console.log('No options added to the dropdown.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('prediction-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            date: document.getElementById('date').value,
            location: document.getElementById('location').value,
            article: document.getElementById('article').value,
            discount: document.getElementById('discount').value
        };

        // Send POST request to the /predict endpoint
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Display error message
                document.getElementById('results').innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
            } else {
                // Display prediction results
                document.getElementById('results').innerHTML = `
                    <h2>Prediction Results:</h2>
                    <p>Predicted Quantity: ${data.predicted_qty}</p>
                    <p>Predicted Value: ${data.predicted_value}</p>
                `;
            }
        })
        .catch(error => {
            // Display general error message
            console.error('Error:', error);
            document.getElementById('results').innerHTML = '<p style="color: red;">An error occurred. Please try again.</p>';
        });
    });
});

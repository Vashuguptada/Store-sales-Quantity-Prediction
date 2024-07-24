from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# Load the trained models and label encoders
model_qty = joblib.load('models/model_qty.pkl')
model_value = joblib.load('models/model_value.pkl')
label_encoders = joblib.load('models/label_encoders.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Create a DataFrame with the input data
        input_data = pd.DataFrame({
            'DATE': [datetime.now()],  # Use current date if not provided
            'Location Alias': [data['location']]
        })

        # Extract date-related features
        input_data['Year'] = input_data['DATE'].dt.year
        input_data['Month'] = input_data['DATE'].dt.month
        input_data['Day'] = input_data['DATE'].dt.day
        input_data['Weekday'] = input_data['DATE'].dt.dayofweek

        # Encode categorical features
        categorical_features = ['Location Alias']
        for col in categorical_features:
            input_data[col] = label_encoders[col].transform(input_data[col])

        # Add dummy values for missing features (if necessary)
        input_data['Discount'] = 0  # Default value or handle accordingly
        input_data['Article no'] = 0  # Default value or handle accordingly

        # Select relevant features
        features = ['Location Alias', 'Article no', 'Year', 'Month', 'Day', 'Weekday', 'Discount']
        X = input_data[features]

        # Make predictions
        pred_qty = model_qty.predict(X)[0]
        pred_value = model_value.predict(X)[0]

        # Convert NumPy types to standard Python types
        pred_qty = float(pred_qty)  # Convert to float
        pred_value = float(pred_value)  # Convert to float

        return jsonify({
            'predicted_qty': round(pred_qty, 2),
            'predicted_value': round(pred_value, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

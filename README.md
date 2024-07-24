# Store-sales-Quantity-Prediction
Predict Store wise Sales &amp; Quantity (sku's)


This project predicts future store sales quantity and value using historical sales data and XGBoost regression models.

## Description

This script processes historical store sales data, trains XGBoost models to predict sales quantity and value, and then generates predictions for the next month. It handles various store locations, article numbers, and discount types.

## Features

- Data preprocessing and feature engineering
- XGBoost model training for sales quantity and value prediction
- Future date generation for next month predictions
- Handling of categorical variables
- Prediction of sales for all combinations of store, article, and discount for each day of the next month
- Aggregation of predictions by store

## Requirements

- Python 3.x
- pandas
- numpy
- scikit-learn
- xgboost
- joblib
- Google Colab (for Google Drive integration)

## Installation

To install the required packages, run:

## Usage

1. Upload your 'store sales.xlsx' file to your Google Drive in the 'Market basket analysis' folder.
2. Run the script in Google Colab or adjust the file paths for local execution.
3. The script will generate two CSV files:
   - 'Next_Month_Predictions.csv': Detailed predictions for each combination of store, article, and discount.
   - 'Next_Month_Store_Totals.csv': Aggregated predictions for each store.

## File Structure

- `store sales.xlsx`: Input file containing historical sales data
- `vmodel_qty.pkl`: Saved XGBoost model for quantity prediction
- `vmodel_value.pkl`: Saved XGBoost model for value prediction
- `vlabel_encoders.pkl`: Saved label encoders for categorical variables
- `Next_Month_Predictions.csv`: Output file with detailed predictions
- `Next_Month_Store_Totals.csv`: Output file with aggregated store predictions



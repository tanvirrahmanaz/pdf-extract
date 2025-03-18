
import sys
import pandas as pd
from PyPDF2 import PdfReader
import re

def extract_data_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    data = []

    for page in reader.pages:
        text = page.extract_text()
        lines = text.split('\n')

        order_id = ""
        order_date = ""
        deliver_to = ""
        phone = ""
        delivery_address = ""
        total = 0.0

        for idx, line in enumerate(lines):
            # Your extraction logic goes here (as in the code you shared earlier)
            # Example: parsing "Order ID", "Order Date", etc.

        if order_id:
            data.append({
                "Order ID": order_id,
                "Order Date": order_date,
                "Deliver To": deliver_to,
                "Phone": phone,
                "Delivery Address": delivery_address,
                "Total": total
            })

    return data

def save_to_excel(data, output_path):
    df = pd.DataFrame(data)

    if not df.empty:
        total_sum = df["Total"].sum()
        total_orders = len(df)
        summary_row = {
            "Order ID": "TOTAL SUMMARY",
            "Order Date": "",
            "Deliver To": "",
            "Phone": "",
            "Delivery Address": "",
            "Total": total_sum
        }
        df = pd.concat([df, pd.DataFrame([summary_row])], ignore_index=True)

    df.to_excel(output_path, index=False)

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    output_path = sys.argv[2]

    data = extract_data_from_pdf(pdf_path)
    save_to_excel(data, output_path)

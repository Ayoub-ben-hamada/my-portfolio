"""
Script to convert PDF certificates to PNG images for portfolio display
"""
import os
import fitz  # PyMuPDF
from pathlib import Path
from PIL import Image

# Directory containing the certificates
cert_dir = Path("certifications")
output_dir = Path("assets/img/certifications")

# Create output directory if it doesn't exist
output_dir.mkdir(parents=True, exist_ok=True)

# Get all PDF files
pdf_files = list(cert_dir.glob("*.pdf"))

print(f"Found {len(pdf_files)} PDF files to convert...")

for pdf_file in pdf_files:
    try:
        print(f"Converting {pdf_file.name}...")
        
        # Open PDF file
        pdf_document = fitz.open(pdf_file)
        
        # Get first page
        page = pdf_document[0]
        
        # Render page to image (zoom factor for quality)
        mat = fitz.Matrix(2, 2)  # 2x zoom for better quality
        pix = page.get_pixmap(matrix=mat)
        
        # Save as PNG
        output_filename = output_dir / f"{pdf_file.stem}.png"
        pix.save(output_filename)
        
        pdf_document.close()
        print(f"  ✓ Saved to {output_filename}")
    except Exception as e:
        print(f"  ✗ Error converting {pdf_file.name}: {e}")

print("\nConversion complete!")
print(f"Images saved to: {output_dir}")


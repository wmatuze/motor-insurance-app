import { FormData, ValidationErrors } from './types';

/**
 * Calculate insurance quote based on coverage type, vehicle value, and usage
 *
 * Pricing logic:
 * - Base price depends on coverage type (Third Party, Third Party + Fire/Theft, Comprehensive)
 * - Add 5% of vehicle value as additional premium
 * - Commercial vehicles cost 30% more than personal use
 *
 * @param formData - The complete form data
 * @returns The calculated annual premium as a string
 */
export function calculateQuote(formData: FormData): string {
  let basePrice = 0;

  // Set base price based on coverage type
  if (formData.coverageType === 'third-party') basePrice = 500;
  if (formData.coverageType === 'third-party-fire-theft') basePrice = 800;
  if (formData.coverageType === 'comprehensive') basePrice = 1500;

  // Calculate 5% of vehicle value
  const vehicleValue = parseFloat(formData.vehicleValue) || 0;
  const valueCharge = vehicleValue * 0.05;

  // Apply multiplier for commercial use (30% more expensive)
  const usageMultiplier = formData.vehicleUsage === 'commercial' ? 1.3 : 1;

  // Calculate final price
  const total = (basePrice + valueCharge) * usageMultiplier;
  return total.toFixed(2);
}

/**
 * Validate form fields for a specific step
 *
 * @param step - The current step number (1-3)
 * @param formData - The form data to validate
 * @returns Object containing error messages for invalid fields
 */
export function validateStep(step: number, formData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Step 1: Validate Personal Details
  if (step === 1) {
    if (!formData.fullName.trim()) errors.fullName = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.idNumber.trim()) errors.idNumber = 'ID number is required';
  }

  // Step 2: Validate Vehicle Details
  if (step === 2) {
    if (!formData.vehicleMake) errors.vehicleMake = 'Vehicle make is required';
    if (!formData.vehicleModel.trim()) errors.vehicleModel = 'Model is required';
    if (!formData.yearOfManufacture) errors.yearOfManufacture = 'Year is required';
    if (!formData.registrationNumber.trim()) errors.registrationNumber = 'Registration is required';
    if (!formData.vehicleValue) errors.vehicleValue = 'Value is required';
  }

  // Step 3: Validate Coverage Selection
  if (step === 3) {
    if (!formData.coverageType) errors.coverageType = 'Select coverage type';
    if (!formData.vehicleUsage) errors.vehicleUsage = 'Select usage type';
  }

  return errors;
}


/**
 * Generate and download a PDF quote document
 *
 * @param formData - The complete form data
 * @param quote - The calculated quote amount
 */
export async function generatePDFQuote(formData: FormData, quote: string): Promise<void> {
  try {
    // Dynamically import to avoid issues with SSR
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // Get the quote summary element
    const element = document.getElementById('quote-summary-pdf');
    if (!element) {
      console.error('Quote summary element not found');
      return;
    }

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `Motor-Insurance-Quote-${formData.fullName.replace(/\s+/g, '-')}-${date}.pdf`;

    // Download PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
}
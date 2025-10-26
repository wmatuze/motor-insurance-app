# Motor Insurance Quote Application

A simple web application for obtaining motor insurance quotations. Built as part of the Hobbiton internship application challenge.

## Live Demo

- (https://motorinsure.netlify.app/)

## Features

- **4-Step Form Process**: Guides users through personal details, vehicle information, coverage selection, and quote summary
- **Real-time Validation**: Validates each step before allowing progression
- **Quote Calculation**: Calculates insurance premium based on coverage type, vehicle value, and usage
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern interface using Tailwind CSS

## Tech Stack

- **React** (v19) - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** (v3) - Utility-first CSS framework
- **React Scripts** - Build tooling
- **Netlify** - Hosting and deployment

## How It Works

### Step 1: Personal Details

Collects user information including name, email, phone number, and ID/license number.

### Step 2: Vehicle Details

Gathers vehicle information such as make, model, year, registration number, and estimated value.

### Step 3: Coverage Selection

User selects:

- **Coverage Type**: Third Party, Third Party + Fire/Theft, or Comprehensive
- **Vehicle Usage**: Personal or Commercial

### Step 4: Quote Summary

Displays the calculated annual premium along with a summary of all entered information.

## Quote Calculation Logic

The premium is calculated using the following formula:

```
Base Price (by coverage type):
- Third Party: ZMW 500
- Third Party + Fire/Theft: ZMW 800
- Comprehensive: ZMW 1500

Additional Charges:
- 5% of vehicle value

Multipliers:
- Commercial use: 1.3x (30% more expensive)
- Personal use: 1.0x

Final Premium = (Base Price + 5% of Vehicle Value) × Usage Multiplier
```

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd motor-insurance-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

- npm start - Runs the app in development mode
- npm run build - Builds the app for production


## Future Enhancements

- Backend integration for storing quotes
- Email notifications with quote details
- Payment gateway integration
- Additional coverage options
- Multi-language support
- PDF quote generation

## Author

Watutemwa Matuze 

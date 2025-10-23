import React, { useState, useEffect } from 'react';
import { Download, Mail, CheckCircle, TrendingDown, Shield, Award, Clock, ShieldCheck } from 'lucide-react';
import { QuoteSummaryProps } from '../types';
import { generatePDFQuote } from '../utils';

const QuoteSummary: React.FC<QuoteSummaryProps> = ({ formData, quote }) => {
  const [animatedQuote, setAnimatedQuote] = useState<number>(0);
  const targetQuote = parseFloat(quote);

  // Animate the quote number counting up
  useEffect(() => {
    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setAnimatedQuote(targetQuote * easeOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetQuote]);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadQuote = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDFQuote(formData, quote);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailQuote = () => {
    alert(`Quote would be emailed to ${formData.email}`);
  };

  // Calculate monthly premium
  const monthlyPremium = (targetQuote / 12).toFixed(2);

  // Savings calculation (example: comparing to standard rate)
  const standardRate = targetQuote * 1.15;
  const savings = (standardRate - targetQuote).toFixed(2);

  return (
    <div id="quote-summary-pdf" className="animate-slide-up">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success-400 to-success-600 rounded-full mb-4 shadow-xl shadow-success-200 animate-scale-in">
          <CheckCircle className="text-white" size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2 font-display">Your Quote is Ready!</h2>
        <p className="text-gray-600 text-lg">Here's your personalized insurance premium</p>
      </div>

      {/* Main Quote Card - Premium Design */}
      <div className="relative overflow-hidden rounded-3xl shadow-strong mb-8 transform hover:scale-102 transition-transform duration-300">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

        {/* Content */}
        <div className="relative p-10 text-center">
          <p className="text-white/90 text-lg mb-3 font-medium">Your Annual Premium</p>
          
          {/* Animated Quote Amount */}
          <div className="mb-6">
            <div className="inline-block">
              <p className="text-7xl font-bold text-white mb-2 font-display tracking-tight">
                ZMW {animatedQuote.toFixed(2)}
              </p>
              <div className="h-1 bg-white/30 rounded-full">
                <div className="h-full bg-white rounded-full w-3/4 mx-auto"></div>
              </div>
            </div>
          </div>

          <p className="text-white/80 text-lg mb-8">per year</p>

          {/* Additional Info Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Monthly</p>
              <p className="text-white font-bold text-lg">ZMW {monthlyPremium}</p>
            </div>
            <div className="bg-success-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-success-300/30">
              <p className="text-success-100 text-xs uppercase tracking-wide mb-1">You Save</p>
              <p className="text-white font-bold text-lg">ZMW {savings}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleDownloadQuote}
              disabled={isGeneratingPDF}
              className="group flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-white/95 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <Download size={20} className={isGeneratingPDF ? 'animate-spin' : 'group-hover:animate-bounce'} />
              {isGeneratingPDF ? 'Generating PDF...' : 'Download Quote'}
            </button>
            <button
              onClick={handleEmailQuote}
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              <Mail size={20} />
              Email Quote
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <BenefitCard
          icon={<TrendingDown className="text-success-600" size={24} />}
          title="Best Price"
          description="Competitive rates with no hidden fees"
        />
        <BenefitCard
          icon={<Shield className="text-primary-600" size={24} />}
          title="Secure Coverage"
          description="Comprehensive protection you can trust"
        />
        <BenefitCard
          icon={<Clock className="text-warning-600" size={24} />}
          title="Instant Approval"
          description="Get covered within 24 hours"
        />
      </div>

      {/* Summary Details - Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DetailCard title="Personal Information" icon={<Award className="text-primary-600" size={20} />}>
          <DetailRow label="Full Name" value={formData.fullName} />
          <DetailRow label="Email" value={formData.email} />
          <DetailRow label="Phone" value={formData.phone} />
          <DetailRow label="ID Number" value={formData.idNumber} />
        </DetailCard>

        <DetailCard title="Vehicle Information" icon={<Shield className="text-primary-600" size={20} />}>
          <DetailRow 
            label="Vehicle" 
            value={`${formData.vehicleMake} ${formData.vehicleModel}`} 
          />
          <DetailRow label="Year" value={formData.yearOfManufacture} />
          <DetailRow label="Registration" value={formData.registrationNumber} />
          <DetailRow label="Value" value={`ZMW ${parseFloat(formData.vehicleValue).toLocaleString()}`} />
        </DetailCard>
      </div>

      <DetailCard title="Coverage Details" icon={<ShieldCheck className="text-success-600" size={20} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow
            label="Coverage Type"
            value={formData.coverageType.split('-').map((word: string) =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
            highlight
          />
          <DetailRow 
            label="Usage Type" 
            value={formData.vehicleUsage.charAt(0).toUpperCase() + formData.vehicleUsage.slice(1)} 
            highlight
          />
        </div>
      </DetailCard>

      {/* Trust Signals */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl border border-primary-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">What Happens Next?</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                <span>Our team will review your quote within <strong>2 hours</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                <span>You'll receive confirmation via email and SMS</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                <span>Your coverage can start as soon as <strong>tomorrow</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Benefit Card Component
const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-soft hover:shadow-medium transition-shadow">
      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// Detail Card Component
const DetailCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft hover:shadow-medium transition-all">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

// Detail Row Component
const DetailRow: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => {
  return (
    <div className={`flex justify-between items-center py-2 ${highlight ? 'bg-primary-50 -mx-3 px-3 rounded-lg' : ''}`}>
      <span className="text-sm text-gray-600 font-medium">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-primary-700' : 'text-gray-900'}`}>{value}</span>
    </div>
  );
};

export default QuoteSummary;
'use client'

import { useState, useEffect } from 'react'
import RelatedTools from '@/components/RelatedTools'
import Breadcrumbs from '@/components/Breadcrumbs'
import FAQ from '@/components/FAQ'

type LoanType = 'term' | 'line-of-credit' | 'sba' | 'equipment' | 'invoice'

interface LoanDetails {
  amount: number
  rate: number
  term: number // in months
  type: LoanType
}

interface CalculationResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  effectiveAPR: number
}

const loanTypeInfo = {
  'term': {
    name: 'Term Loan',
    description: 'Fixed amount borrowed and repaid over a set period',
    typicalRate: '6-30%',
    typicalTerm: '3-60 months'
  },
  'line-of-credit': {
    name: 'Line of Credit',
    description: 'Flexible borrowing up to a set limit',
    typicalRate: '7-25%',
    typicalTerm: '12-24 months'
  },
  'sba': {
    name: 'SBA Loan',
    description: 'Government-backed loans with favorable terms',
    typicalRate: '5-11%',
    typicalTerm: '60-300 months'
  },
  'equipment': {
    name: 'Equipment Financing',
    description: 'Loans specifically for purchasing equipment',
    typicalRate: '4-20%',
    typicalTerm: '24-84 months'
  },
  'invoice': {
    name: 'Invoice Financing',
    description: 'Borrow against outstanding invoices',
    typicalRate: '10-60%',
    typicalTerm: '1-3 months'
  }
}

export default function BusinessLoanCalculator() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    amount: 50000,
    rate: 10,
    term: 24,
    type: 'term'
  })
  
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateLoan = () => {
    const principal = loanDetails.amount
    const monthlyRate = loanDetails.rate / 100 / 12
    const numPayments = loanDetails.term

    // Calculate monthly payment using amortization formula
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    const totalPayment = monthlyPayment * numPayments
    const totalInterest = totalPayment - principal
    
    // Calculate effective APR (accounting for compounding)
    const effectiveAPR = (Math.pow(1 + monthlyRate, 12) - 1) * 100

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveAPR
    })
  }

  useEffect(() => {
    calculateLoan()
  }, [loanDetails])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return `${rate.toFixed(2)}%`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Business Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate monthly payments, total interest, and compare different business loan options
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Loan Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Type
                </label>
                <select
                  value={loanDetails.type}
                  onChange={(e) => setLoanDetails({...loanDetails, type: e.target.value as LoanType})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(loanTypeInfo).map(([value, info]) => (
                    <option key={value} value={value}>{info.name}</option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-600">
                  {loanTypeInfo[loanDetails.type].description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={loanDetails.amount}
                    onChange={(e) => setLoanDetails({...loanDetails, amount: Number(e.target.value)})}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1000"
                    max="5000000"
                    step="1000"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Typical range: $5,000 - $5,000,000
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={loanDetails.rate}
                  onChange={(e) => setLoanDetails({...loanDetails, rate: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="mt-1 text-sm text-gray-600">
                  Typical rate for {loanTypeInfo[loanDetails.type].name}: {loanTypeInfo[loanDetails.type].typicalRate}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (months)
                </label>
                <input
                  type="number"
                  value={loanDetails.term}
                  onChange={(e) => setLoanDetails({...loanDetails, term: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="360"
                  step="1"
                />
                <p className="mt-1 text-sm text-gray-600">
                  Typical term: {loanTypeInfo[loanDetails.type].typicalTerm}
                </p>
              </div>
            </div>
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Calculation Results</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Monthly Payment</h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(result.monthlyPayment)}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Total Payment</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(result.totalPayment)}
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Total Interest</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Effective APR</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatPercent(result.effectiveAPR)}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Loan Summary</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• You'll pay {formatCurrency(result.monthlyPayment)} per month for {loanDetails.term} months</p>
                  <p>• Total interest paid over the life of the loan: {formatCurrency(result.totalInterest)}</p>
                  <p>• That's {formatPercent((result.totalInterest / loanDetails.amount) * 100)} of the original loan amount</p>
                  <p>• Your effective annual rate (accounting for monthly compounding) is {formatPercent(result.effectiveAPR)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Business Loan Tips</h2>
            <div className="space-y-3 text-gray-600">
              <p>• <strong>Shop around:</strong> Rates can vary significantly between lenders</p>
              <p>• <strong>Check your credit:</strong> Better credit scores qualify for lower rates</p>
              <p>• <strong>Consider fees:</strong> Origination fees and prepayment penalties affect total cost</p>
              <p>• <strong>Match term to use:</strong> Short-term needs shouldn't have long-term loans</p>
              <p>• <strong>Prepare documentation:</strong> Have financial statements and tax returns ready</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Understanding Business Loan Types</h2>
            <div className="space-y-4">
              {Object.entries(loanTypeInfo).map(([type, info]) => (
                <div key={type} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-700">{info.name}</h3>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Typical rates: {info.typicalRate} | Terms: {info.typicalTerm}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />

          <RelatedTools currentTool="business-loan-calculator" />

          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <p className="text-gray-700 mb-2">
              Need help finding the right business loan?
            </p>
            <p className="text-sm text-gray-600">
              Consider consulting with a financial advisor or loan broker who can help match you with appropriate lenders.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
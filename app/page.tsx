'use client'

import { useState, useEffect } from 'react'
import RelatedTools from '@/components/RelatedTools'

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
  term: {
    name: 'Term Loan',
    description: 'Fixed amount with regular payments',
    typicalRate: '6-30%',
    typicalTerm: '3-60 months',
  },
  'line-of-credit': {
    name: 'Line of Credit',
    description: 'Flexible borrowing up to a limit',
    typicalRate: '7-25%',
    typicalTerm: '6-24 months',
  },
  sba: {
    name: 'SBA Loan',
    description: 'Government-backed small business loans',
    typicalRate: '11-13%',
    typicalTerm: '60-300 months',
  },
  equipment: {
    name: 'Equipment Financing',
    description: 'Loans specifically for equipment purchases',
    typicalRate: '8-20%',
    typicalTerm: '24-84 months',
  },
  invoice: {
    name: 'Invoice Factoring',
    description: 'Advance on outstanding invoices',
    typicalRate: '10-60%',
    typicalTerm: '1-3 months',
  },
}

export default function BusinessLoanCalculator() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    amount: 50000,
    rate: 10,
    term: 24,
    type: 'term',
  })

  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateLoan = () => {
    const principal = loanDetails.amount
    const monthlyRate = loanDetails.rate / 100 / 12
    const numPayments = loanDetails.term

    // Calculate monthly payment using amortization formula
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    const totalPayment = monthlyPayment * numPayments
    const totalInterest = totalPayment - principal

    // Calculate effective APR (includes compounding)
    const effectiveAPR = (Math.pow(1 + monthlyRate, 12) - 1) * 100

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveAPR,
    })
  }

  useEffect(() => {
    if (loanDetails.amount > 0 && loanDetails.rate > 0 && loanDetails.term > 0) {
      calculateLoan()
    }
  }, [loanDetails])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return `${rate.toFixed(2)}%`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Business Loan Calculator</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Loan Details</h2>
            
            {/* Loan Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Loan Type</label>
              <select
                value={loanDetails.type}
                onChange={(e) => setLoanDetails({...loanDetails, type: e.target.value as LoanType})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(loanTypeInfo).map(([key, info]) => (
                  <option key={key} value={key}>{info.name}</option>
                ))}
              </select>
              <p className="text-sm text-gray-600 mt-1">
                {loanTypeInfo[loanDetails.type].description}
              </p>
            </div>

            {/* Loan Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={loanDetails.amount}
                  onChange={(e) => setLoanDetails({...loanDetails, amount: Number(e.target.value)})}
                  className="w-full pl-8 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1000"
                  max="5000000"
                  step="1000"
                />
              </div>
              <input
                type="range"
                value={loanDetails.amount}
                onChange={(e) => setLoanDetails({...loanDetails, amount: Number(e.target.value)})}
                className="w-full mt-2"
                min="1000"
                max="500000"
                step="1000"
              />
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={loanDetails.rate}
                onChange={(e) => setLoanDetails({...loanDetails, rate: Number(e.target.value)})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="50"
                step="0.1"
              />
              <p className="text-sm text-gray-600 mt-1">
                Typical range: {loanTypeInfo[loanDetails.type].typicalRate}
              </p>
            </div>

            {/* Loan Term */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Loan Term (months)
              </label>
              <input
                type="number"
                value={loanDetails.term}
                onChange={(e) => setLoanDetails({...loanDetails, term: Number(e.target.value)})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="360"
              />
              <p className="text-sm text-gray-600 mt-1">
                Typical term: {loanTypeInfo[loanDetails.type].typicalTerm}
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Loan Summary</h2>
            
            {result && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Monthly Payment</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(result.monthlyPayment)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Total Payment</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(result.totalPayment)}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(result.totalInterest)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Effective APR</p>
                  <p className="text-xl font-semibold">
                    {formatPercent(result.effectiveAPR)}
                  </p>
                </div>

                {/* Cost Breakdown */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal</span>
                      <span>{formatCurrency(loanDetails.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest ({formatPercent(loanDetails.rate)})</span>
                      <span>{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Cost</span>
                      <span>{formatCurrency(result.totalPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Interest as % of Principal */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Interest as % of Principal</p>
                  <p className="text-xl font-semibold text-yellow-700">
                    {formatPercent((result.totalInterest / loanDetails.amount) * 100)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Understanding Business Loans</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Term loans</strong> offer predictable payments and are ideal for one-time investments</li>
              <li>• <strong>Lines of credit</strong> provide flexibility for ongoing expenses</li>
              <li>• <strong>SBA loans</strong> have lower rates but longer approval times</li>
              <li>• <strong>Equipment financing</strong> uses the equipment as collateral</li>
              <li>• <strong>Invoice factoring</strong> provides quick cash but at higher rates</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Tips for Getting Approved</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Maintain a credit score above 680 for best rates</li>
              <li>• Prepare 2-3 years of financial statements</li>
              <li>• Have a clear business plan for loan use</li>
              <li>• Consider multiple lenders for rate comparison</li>
              <li>• Factor in fees beyond the interest rate</li>
            </ul>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-12">
          <RelatedTools />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            This calculator provides estimates for educational purposes only. 
            Actual rates and terms will vary based on creditworthiness and lender requirements.
          </p>
        </div>
      </div>
    </div>
  )
}
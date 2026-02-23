'use client'

import { useState, useEffect } from 'react'

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
    rate: 12,
    term: 24,
    type: 'term',
  })

  const [results, setResults] = useState<CalculationResult | null>(null)
  const [comparison, setComparison] = useState<Record<LoanType, CalculationResult>>({} as any)

  const calculateLoan = (details: LoanDetails): CalculationResult => {
    const { amount, rate, term } = details
    const monthlyRate = rate / 100 / 12
    
    // Calculate monthly payment using amortization formula
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    
    const totalPayment = monthlyPayment * term
    const totalInterest = totalPayment - amount
    const effectiveAPR = (totalInterest / amount / (term / 12)) * 100

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      effectiveAPR: isNaN(effectiveAPR) ? 0 : effectiveAPR,
    }
  }

  useEffect(() => {
    const result = calculateLoan(loanDetails)
    setResults(result)

    // Calculate comparison for all loan types
    const comparisonResults: Record<LoanType, CalculationResult> = {} as any
    const loanTypes: LoanType[] = ['term', 'line-of-credit', 'sba', 'equipment', 'invoice']
    
    loanTypes.forEach(type => {
      // Use typical rates for each loan type
      const typicalRates = {
        term: 15,
        'line-of-credit': 16,
        sba: 12,
        equipment: 14,
        invoice: 35,
      }
      
      comparisonResults[type] = calculateLoan({
        ...loanDetails,
        type,
        rate: typicalRates[type],
      })
    })
    
    setComparison(comparisonResults)
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Loan Calculator</h1>
      <p className="text-lg text-gray-600 mb-8">
        Calculate monthly payments, compare loan types, and find the best financing for your business.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Loan Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Type
              </label>
              <select
                value={loanDetails.type}
                onChange={(e) => setLoanDetails({ ...loanDetails, type: e.target.value as LoanType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(loanTypeInfo).map(([key, info]) => (
                  <option key={key} value={key}>{info.name}</option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {loanTypeInfo[loanDetails.type].description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={loanDetails.amount}
                  onChange={(e) => setLoanDetails({ ...loanDetails, amount: Number(e.target.value) })}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1000"
                  max="5000000"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={loanDetails.rate}
                onChange={(e) => setLoanDetails({ ...loanDetails, rate: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
              <p className="mt-1 text-sm text-gray-500">
                Typical range: {loanTypeInfo[loanDetails.type].typicalRate}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (months)
              </label>
              <input
                type="number"
                value={loanDetails.term}
                onChange={(e) => setLoanDetails({ ...loanDetails, term: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="360"
                step="1"
              />
              <p className="mt-1 text-sm text-gray-500">
                Typical range: {loanTypeInfo[loanDetails.type].typicalTerm}
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Calculation Results</h2>
          
          {results && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(results.monthlyPayment)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.totalPayment)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.totalInterest)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Effective Annual Rate</p>
                <p className="text-xl font-semibold">{formatPercent(results.effectiveAPR)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loan Type Comparison */}
      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Compare Loan Types</h2>
        <p className="text-gray-600 mb-4">
          See how different loan types compare for ${formatCurrency(loanDetails.amount)} over {loanDetails.term} months.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Loan Type</th>
                <th className="text-right py-2">Typical Rate</th>
                <th className="text-right py-2">Monthly Payment</th>
                <th className="text-right py-2">Total Interest</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(comparison).map(([type, calc]) => (
                <tr key={type} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{loanTypeInfo[type as LoanType].name}</p>
                      <p className="text-sm text-gray-500">{loanTypeInfo[type as LoanType].description}</p>
                    </div>
                  </td>
                  <td className="text-right py-3">{loanTypeInfo[type as LoanType].typicalRate}</td>
                  <td className="text-right py-3 font-medium">{formatCurrency(calc.monthlyPayment)}</td>
                  <td className="text-right py-3">{formatCurrency(calc.totalInterest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          This calculator provides estimates for educational purposes only. 
          Actual rates and terms will vary based on creditworthiness and lender requirements.
        </p>
      </div>
    </div>
  )
}
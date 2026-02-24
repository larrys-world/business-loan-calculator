'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How is the monthly payment calculated?",
    answer: "Monthly payments are calculated using the standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n-1], where P is the loan amount, r is the monthly interest rate, and n is the number of months. This ensures each payment covers both principal and interest."
  },
  {
    question: "What's the difference between APR and interest rate?",
    answer: "The interest rate is the cost of borrowing the principal loan amount. APR (Annual Percentage Rate) includes the interest rate plus other costs like origination fees, closing costs, and insurance. APR gives you the true cost of the loan for comparison purposes."
  },
  {
    question: "How do I know if I qualify for a business loan?",
    answer: "Lenders typically consider: time in business (usually 2+ years), annual revenue ($50K+ minimum for many lenders), credit score (680+ for best rates), cash flow, and collateral. Requirements vary significantly between lenders and loan types."
  },
  {
    question: "What loan term should I choose?",
    answer: "Shorter terms (1-3 years) mean higher monthly payments but less total interest paid. Longer terms (5-10 years) have lower monthly payments but cost more overall. Choose based on your cash flow: can you afford the monthly payment while maintaining healthy business operations?"
  },
  {
    question: "What are typical business loan interest rates?",
    answer: "Rates vary widely: Bank loans: 6-13%, SBA loans: 11.5-16.5%, Online lenders: 7-60%, Equipment financing: 8-30%, Invoice factoring: 13-60%. Your rate depends on credit score, time in business, revenue, and loan type."
  },
  {
    question: "Should I get a secured or unsecured business loan?",
    answer: "Secured loans require collateral but offer lower rates and higher amounts. Unsecured loans don't require collateral but have higher rates and stricter requirements. Choose secured if you have assets and want better terms; unsecured if you want to protect personal/business assets."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-16 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
              {openIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
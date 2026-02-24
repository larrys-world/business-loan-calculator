import React from 'react';

const RelatedTools = () => {
  const tools = [
    {
      name: 'Freelance Rate Calculator',
      description: 'Calculate your ideal hourly rate as a freelancer',
      url: 'https://larrys-world.github.io/freelance-rate-calculator/',
      icon: '💰'
    },
    {
      name: 'Percentage Calculator',
      description: 'Calculate percentages, increases, and decreases',
      url: 'https://larrys-world.github.io/percentage-calculator/',
      icon: '📊'
    },
    {
      name: 'Tip Calculator',
      description: 'Calculate tips and split bills easily',
      url: 'https://larrys-world.github.io/tip-calculator/',
      icon: '💵'
    },
    {
      name: 'Unit Converter',
      description: 'Convert between different units of measurement',
      url: 'https://larrys-world.github.io/unit-converter/',
      icon: '📏'
    },
    {
      name: 'Password Generator',
      description: 'Generate strong, secure passwords instantly',
      url: 'https://larrys-world.github.io/password-generator/',
      icon: '🔐'
    },
    {
      name: 'Business Loan Calculator',
      description: 'Calculate loan payments and total interest',
      url: 'https://larrys-world.github.io/business-loan-calculator/',
      icon: '🏢'
    },
    {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for your designs',
      url: 'https://larrys-world.github.io/lorem-ipsum-generator/',
      icon: '📝'
    }
  ];

  // Get current tool URL to exclude it from related tools
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const relatedTools = tools.filter(tool => !currentUrl.includes(tool.url.replace('https://larrys-world.github.io/', '')));
  
  // Randomly select 3-4 tools
  const shuffled = relatedTools.sort(() => 0.5 - Math.random());
  const selectedTools = shuffled.slice(0, Math.min(4, shuffled.length));

  return (
    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">🛠️ More Free Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedTools.map((tool, index) => (
          <a
            key={index}
            href={tool.url}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <span className="text-2xl mr-3">{tool.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900 hover:text-indigo-600">
                  {tool.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a 
          href="https://larrys-world.github.io" 
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View All Tools →
        </a>
      </div>
    </div>
  );
};

export default RelatedTools;
import React from 'react';

const ProfessionalResume = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-blue-100">
                <img 
                  src="/manush-patel/headshot.jpeg" 
                  alt="Manush Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Manush Patel</h1>
              <h2 className="text-xl text-blue-600 font-semibold mb-4">Product Manager & Software Developer</h2>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-600">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Toronto, Canada</span>
                </div>
              </div>
              
              {/* Resume Download */}
              <div className="mt-6">
                <a 
                  href="/manush-patel/Manush_2025_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">350K+</div>
            <div className="text-gray-600">Users Impacted</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">$20K+</div>
            <div className="text-gray-600">Funding Raised</div>
          </div>
        </div>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Education
          </h2>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Bachelor of Commerce and Computer Science</h3>
                <p className="text-blue-600 font-medium">Smith School of Business, Queen's University</p>
                <p className="text-gray-600">Dual Degree Program</p>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  2021 – 2026
                </div>
                <p className="text-gray-600 text-sm mt-1">Toronto, Canada</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">D.I McLeod Dean's List</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-700">Excellence Entrance Scholarship</span>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Professional Experience
          </h2>
          
          <div className="space-y-6">
            
            {/* IT Product Manager Intern */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">IT Product Manager Intern</h3>
                  <p className="text-blue-600 font-medium">First National Financial</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 self-start">
                  May 2024 – Aug. 2024
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Collaborated closely with engineering, and design teams to deliver product updates on time for 350k users.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Developed and implemented comprehensive test plans for four new software features, ensuring adherence to initial requirements and detection of critical defects.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Worked with UX/UI teams to redesign the user interface, reducing user friction and decreasing support requests by 60%.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Validated the feature hypothesis using usability testing by delivering requirements to design, and the core functionalities to engineering, which 80% of the users felt it was valuable in their scenario, taking the project on the road to production.</span>
                </li>
              </ul>
            </div>

            {/* Chief Growth Officer/Co-Founder */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Chief Growth Officer/Co-Founder</h3>
                  <p className="text-green-600 font-medium">Homiis Inc.</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 self-start">
                  Mar. 2023 – Feb. 2024
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Founded Homiis to connect young adults with each other to help find a roommate while providing properties for rent.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Shaped company's long-term strategic plan to enter new markets, boosting revenue by 50%; increase in sign-ups from 50 to 700; analyzed competitive landscape along with drafting marketing and budget plans for short and long-term.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Automated sales processes using Salesforce, reducing manual data entry and increasing efficiency by 50%, leading to faster deal closures and improved sales pipeline management.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Raised over $20,000 in funding and was backed and supported by Front Row Ventures.</span>
                </li>
              </ul>
            </div>

            {/* Product Coordinator */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Product Coordinator</h3>
                  <p className="text-purple-600 font-medium">Propel Campus</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 self-start">
                  Jan. 2022 – Feb. 2023
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Constructed and aided in market expansion, partnered with 18 universities across Canada; Propel is an educational platform to help students get directly in touch with recruiters.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Increased student userbase by 75% in 60 days by reaching out to club executives and promoting product.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Built a CRM dashboard on Excel using VBA, Indexing, along with V and XLOOKUP to increase efficiency for acquiring clients by 75% and assisted in development of customer acquisition flow.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Incorporated 10+ UI features to improve accessibility, functionality and security, design GUIs using Photoshop and Figma.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Community Experience
          </h2>
          
          <div className="space-y-6">
            
            {/* Educational Growth Coordinator */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Educational Growth Coordinator</h3>
                  <p className="text-green-600 font-medium">OpenAI</p>
                  <p className="text-gray-600">Toronto, Canada</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 self-start">
                  Jan. 2025 – Present
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consulted OpenAI's EDU strategy team on launching a ChatGPT Plus discount for university students, analyzing student engagement trends and recommending high-impact promotional strategies to reach 100,000+ students.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Developed and executed a promotional strategy, conducting user research through surveys and focus groups with 20 student organizations to assess engagement preferences, and leveraging Power BI to analyze findings and present insights.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supported corporate strategy initiatives by tracking OKRs and conducting ad hoc performance analysis, leveraging data-driven insights to optimize key business processes and improve decision-making for senior leadership.</span>
                </li>
              </ul>
            </div>

            {/* Product Manager */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Product Manager</h3>
                  <p className="text-blue-600 font-medium">Queen's Tech & Media Association</p>
                  <p className="text-gray-600">Kingston, Canada</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 self-start">
                  Sep. 2021 – Apr. 2024
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Spearheaded a team of 4 developers and 4 business analysts to develop Pantree, a product that sends automated notifications to remind the users of their groceries in their pantry and the meals that can be cooked with those groceries.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Utilized Node.js and React.js to work on front-end development of product; had 100 users on the platform within a month.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Won First Place in the demo day competition presenting to McKinsey and Company.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Programming Languages */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'TypeScript', 'JavaScript', 'R', 'C/C++', 'SQL'].map((skill) => (
                  <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {['PowerBI', 'Tableau', 'Azure', 'AWS', 'Jira', 'MS Office', 'RStudio', 'Salesforce'].map((skill) => (
                  <span key={skill} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Back to Mission Button */}
        <div className="text-center">
          <button
            onClick={() => window.close()}
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Interactive Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalResume;
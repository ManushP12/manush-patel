import React, { useState, useEffect } from 'react';

const ProfessionalWebsite = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ADD THIS NEW useEffect HERE
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const experiences = [
    {
      title: "IT Product Manager Intern",
      company: "First National Financial",
      location: "Toronto, Canada",
      period: "May 2024 – Aug. 2024",
      color: "blue",
      achievements: [
        "Delivered product updates for 350K+ users",
        "Reduced support requests by 60% through UX improvements",
        "Validated features with 80% user satisfaction rate"
      ],
      technologies: ["Jira", "Figma", "PowerBI", "SQL"]
    },
    {
      title: "Chief Growth Officer & Co-Founder",
      company: "Homiis Inc.",
      location: "Toronto, Canada",
      period: "Mar. 2023 – Feb. 2024",
      color: "green",
      achievements: [
        "Raised $20K+ in funding from Front Row Ventures",
        "Grew user base from 50 to 700+ users",
        "Increased sales efficiency by 50% with Salesforce automation"
      ],
      technologies: ["Salesforce", "React", "Node.js", "PostgreSQL"]
    },
    {
      title: "Educational Growth Coordinator",
      company: "OpenAI",
      location: "Toronto, Canada",
      period: "Jan. 2025 – Present",
      color: "purple",
      achievements: [
        "Developed strategy to reach 100K+ university students",
        "Conducted research with 20+ student organizations",
        "Optimized business processes using data-driven insights"
      ],
      technologies: ["PowerBI", "Excel", "Python", "Tableau"]
    }
  ];

  const projects = [
    {
      title: "Homiis Platform",
      description: "A roommate-finding platform that connects young adults and provides rental properties, growing from 50 to 700+ users.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      highlight: "Funded by Front Row Ventures",
      color: "blue",
      icon: "🏠"
    },
    {
      title: "Pantree App",
      description: "Smart pantry management app that tracks groceries and suggests meal recipes. Won 1st place at McKinsey demo day.",
      technologies: ["React.js", "Node.js", "MongoDB"],
      highlight: "100+ active users in first month",
      color: "green",
      icon: "🥗"
    },
    {
      title: "Mission Terminal Resume",
      description: "An interactive space-themed resume experience with games and animations that showcase professional qualifications.",
      technologies: ["React", "Tailwind", "JavaScript"],
      highlight: "Interactive gaming experience",
      color: "purple",
      icon: "🚀"
    }
  ];

  const skillCategories = [
    {
      title: "Programming",
      icon: "💻",
      color: "purple",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "R"]
    },
    {
      title: "Web Development",
      icon: "🌐",
      color: "blue",
      skills: ["React", "Node.js", "HTML/CSS", "Tailwind", "Express"]
    },
    {
      title: "Data & Analytics",
      icon: "📊",
      color: "green",
      skills: ["PowerBI", "Tableau", "Excel", "Pandas", "NumPy"]
    },
    {
      title: "Tools & Platforms",
      icon: "🛠️",
      color: "orange",
      skills: ["Git", "AWS", "Azure", "Jira", "Figma", "Salesforce"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Back to Terminal + Logo */}
            <div className="flex items-center space-x-6">
              {/* Back to Terminal Button */}
              <button
                onClick={onBack}
                className="group inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-md text-gray-700 hover:text-gray-900 font-medium rounded-lg border border-gray-200/50 hover:border-gray-300/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm">Back to Terminal</span>
              </button>
              
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">MP</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Manush Patel</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg mx-4 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8">


              <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-transform duration-300 ring-4 ring-white/20">
                <img 
                    src="/manush-patel/headshot.jpeg" 
                    alt="Manush Patel" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                    // Fallback to initials if image doesn't load
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"><span class="text-4xl font-bold text-white">MP</span></div>';
                    }}
                />
                </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Manush
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                A tech-driven individual that's passionate about building impactful products to <br /> 
                solve real-world problems
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => scrollToSection('contact')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center">
                  Get In Touch
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "3+", label: "Years Experience", color: "blue" },
                { number: "350K+", label: "Users Impacted", color: "purple" },
                { number: "$20K+", label: "Funding Raised", color: "green" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h3>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Currently pursuing a double degree in Commerce and Computer Science at Queen's University, 
                  I aspire to bridge the gap between technical implementation and business strategy. 
                </p>
                <p>
                  My experience starts from joining a startup incubator at Queen's called QTMA, where I had the opportunity
                  to be a Product Manager and build several products, one of which was Pantree. This led to me Co-Founding Homiis, 
                  a roommate-finding platform to help young adults find their perfect roommate, and the experience taught me invaluable 
                  lessons in product development, user research, and team leadership. Recently, I have been working as an IT Product 
                  Manager Intern at First National Financial, where I grew as an individual and learned how to deliver product updates 
                  for a large scale corporation.
                </p>
                <p>
                  When I'm not working, I like to spend some of my time playing or watching sports, ranging from Hockey, Football,
                  Basketball, and recently F1. Additionally, I've started to work on my cooking skills, trying to make new recipes 
                  and learn more about different cuisines. 
                </p>
              </div>
              <div className="pt-8">
                <button 
                    onClick={() => window.open('/manush-patel/Manush_2025_Resume.pdf', '_blank')}
                    className="group inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <svg className="w-5 h-5 mr-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                </button>
                </div>
            </div>
            
            {/* Right Column - Cards */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Product Strategy", desc: "Developing product roadmaps and go-to-market strategies", color: "blue", icon: "💡" },
                { title: "Full-Stack Development", desc: "Building scalable web applications with modern technologies", color: "purple", icon: "💻" },
                { title: "Data Analytics", desc: "Extracting insights from data to drive product decisions", color: "green", icon: "📊" },
                { title: "Team Leadership", desc: "Leading cross-functional teams to deliver exceptional products", color: "orange", icon: "👥" }
              ].map((item, index) => (
                <div key={index} className={`bg-${item.color}-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600">Building products and leading teams across various industries</p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                    <p className={`text-lg font-semibold text-${exp.color}-600 mb-1`}>{exp.company}</p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className={`bg-${exp.color}-100 text-${exp.color}-800 px-6 py-3 rounded-full text-sm font-medium self-start`}>
                    {exp.period}
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Key Achievements</h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`w-2 h-2 bg-${exp.color}-500 rounded-full mt-3 mr-4 flex-shrink-0`}></div>
                          <span className="text-gray-600 leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">Some of the products and solutions I've built</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`bg-gradient-to-br from-${project.color}-50 to-${project.color}-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}>
                <div className="text-4xl mb-6">{project.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={`bg-white text-${project.color}-600 px-3 py-1 rounded-lg text-sm font-medium shadow-sm`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {project.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600">Technologies and tools I work with</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <div className="text-4xl mb-6">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{category.title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, i) => (
                    <span key={i} className={`bg-${category.color}-100 text-${category.color}-800 px-3 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-transform cursor-default`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-white mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-blue-100">
              I'm always interested in new opportunities and interesting projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-blue-100">manush.patel@queensu.ca</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-blue-100">Toronto, Canada</p>
            </div>
          </div>
          

          
          <div className="max-w-md mx-auto">
            <a 
              href="mailto:manush.patel@queensu.ca"
              className="group inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send me an email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">MP</span>
              </div>
              <span className="text-xl font-bold">Manush Patel</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 Manush Patel. All rights reserved.</p>
              <p className="text-sm mt-1">Built with passion and attention to detail</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalWebsite;
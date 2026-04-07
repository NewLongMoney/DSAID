import React from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              DSAID
            </h1>
            <h2 className="text-2xl text-gray-700 mb-8">
              Digital Solutions for Africa's Integrated Development
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bridging the digital divide in rural Kenya through Solar Mobile Computer Labs, 
              international curriculum training, and educational technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
            Our Solution
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Solar Mobile Labs
              </h3>
              <p className="text-gray-700">
                Self-contained computer labs powered by solar energy, bringing digital education 
                to remote communities without reliable electricity.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                International Curriculum
              </h3>
              <p className="text-gray-700">
                Cambridge International curriculum training ensuring global standards and 
                competitive education for rural students.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                Teacher Training
              </h3>
              <p className="text-gray-700">
                Comprehensive ICT training programs empowering local teachers with 
                modern digital teaching skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
            Long-Term Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Digital Literacy
                    </h3>
                    <p className="text-gray-700">
                      Equipping students with essential digital skills for the modern economy
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Economic Opportunity
                    </h3>
                    <p className="text-gray-700">
                      Opening pathways to higher education and better employment opportunities
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Community Development
                    </h3>
                    <p className="text-gray-700">
                      Transforming rural communities through technology and education
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                How Our Solar Mobile Computer Lab Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-700">Solar-powered energy system</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-700">Mobile container design</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-700">20+ computer workstations</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-700">Internet connectivity</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-700">Educational software platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Leadership
            </h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 mb-4">
                Mr. Patrick Owidh, our Acting Executive Director, is motivated by the need to 
                enhance socio-economic well-being by bridging the digital divide in rural communities.
              </p>
              <p className="text-gray-600">
                With extensive experience in educational technology and community development, 
                Patrick leads our mission to bring quality digital education to every corner of Kenya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Join Us in Bridging the Digital Divide
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Together, we can transform education and create opportunities for rural communities 
            across Kenya through technology and innovation.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Involved
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

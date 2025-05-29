import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Users, Globe, Download } from 'lucide-react';

const Transparency = () => {
  // Get transparency documents from localStorage
  const transparencyDocs = JSON.parse(localStorage.getItem('transparencyDocs') || '[]');

  const downloadDocument = (doc: any) => {
    // In a real app, this would download from a server
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.fileName;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transparency Portal
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We believe in openness and accountability. Access our reports, policies, 
                and commitment to responsible business practices.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency Documents */}
        {transparencyDocs.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                  Published Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {transparencyDocs.map((doc: any) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <FileText className="h-8 w-8 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {doc.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {doc.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Published: {new Date(doc.publishDate).toLocaleDateString()}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadDocument(doc)}
                                className="flex items-center gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Transparency Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <CardTitle>Security Practices</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Our comprehensive security framework includes regular audits, 
                    penetration testing, and compliance with industry standards like SOC 2 and ISO 27001.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-green-600" />
                    <CardTitle>Financial Reports</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Access our quarterly and annual financial reports, including revenue breakdowns, 
                    investment allocations, and growth metrics.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-purple-600" />
                    <CardTitle>Governance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Learn about our leadership team, board structure, decision-making processes, 
                    and corporate governance policies.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-orange-600" />
                    <CardTitle>Environmental Impact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Our sustainability initiatives, carbon footprint reduction efforts, 
                    and commitment to renewable energy in our operations.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Detailed information about how we collect, process, and protect user data, 
                    including our GDPR and CCPA compliance measures.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ethics & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Our code of conduct, whistleblower policies, and commitment to 
                    ethical business practices across all operations.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Our Commitment to Transparency
              </h2>
              <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300">
                <p>
                  At TechCorp Solutions, transparency isn't just a buzzword—it's a core principle 
                  that guides everything we do. We believe that openness builds trust, and trust 
                  is the foundation of lasting business relationships.
                </p>
                <p>
                  Our transparency portal provides stakeholders with direct access to information 
                  about our operations, performance, and impact. We regularly update these reports 
                  and welcome feedback from our community.
                </p>
                <p>
                  For specific inquiries or additional information not covered in our public reports, 
                  please contact our transparency team at{' '}
                  <a href="mailto:transparency@techcorp.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    transparency@techcorp.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Transparency;

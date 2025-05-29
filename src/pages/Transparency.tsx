
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Users, Globe, Download } from 'lucide-react';

const Transparency = () => {
  // Get transparency documents from localStorage organized by category
  const transparencyDocs = JSON.parse(localStorage.getItem('transparencyDocs') || '{}');

  const downloadDocument = (doc: any) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.fileName;
    link.click();
  };

  const transparencyCategories = [
    {
      id: 'security',
      title: 'Security Practices',
      description: 'Our comprehensive security framework includes regular audits, penetration testing, and compliance with industry standards like SOC 2 and ISO 27001.',
      icon: Shield,
      iconColor: 'text-blue-600'
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      description: 'Access our quarterly and annual financial reports, including revenue breakdowns, investment allocations, and growth metrics.',
      icon: FileText,
      iconColor: 'text-green-600'
    },
    {
      id: 'governance',
      title: 'Governance',
      description: 'Learn about our leadership team, board structure, decision-making processes, and corporate governance policies.',
      icon: Users,
      iconColor: 'text-purple-600'
    },
    {
      id: 'environmental',
      title: 'Environmental Impact',
      description: 'Our sustainability initiatives, carbon footprint reduction efforts, and commitment to renewable energy in our operations.',
      icon: Globe,
      iconColor: 'text-orange-600'
    },
    {
      id: 'privacy',
      title: 'Data Privacy',
      description: 'Detailed information about how we collect, process, and protect user data, including our GDPR and CCPA compliance measures.',
      icon: Shield,
      iconColor: 'text-indigo-600'
    },
    {
      id: 'ethics',
      title: 'Ethics & Compliance',
      description: 'Our code of conduct, whistleblower policies, and commitment to ethical business practices across all operations.',
      icon: FileText,
      iconColor: 'text-red-600'
    }
  ];

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

        {/* Transparency Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transparencyCategories.map((category) => {
                const CategoryIcon = category.icon;
                const categoryDocs = transparencyDocs[category.id] || [];
                
                return (
                  <Card key={category.id} className="h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className={`h-6 w-6 ${category.iconColor}`} />
                        <CardTitle>{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed mb-4">
                        {category.description}
                      </CardDescription>
                      
                      {/* Documents for this category */}
                      {categoryDocs.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Available Documents:</h4>
                          {categoryDocs.map((doc: any) => (
                            <div key={doc.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(doc.publishDate).toLocaleDateString()}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadDocument(doc)}
                                className="flex items-center gap-1"
                              >
                                <Download className="h-3 w-3" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {categoryDocs.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          No documents available for this category yet.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
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

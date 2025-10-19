import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StudyTools from '@/components/StudyTools';
import { mockResources } from '@/lib/mockData';
import { Search, BookOpen, Video, FileText, Brain, Download, Star } from 'lucide-react';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'resources' | 'tools'>('resources');
  const [filteredResources, setFilteredResources] = useState(mockResources);

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredResources(mockResources);
      return;
    }
    
    const filtered = mockResources.filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResources(filtered);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'quiz':
        return <Brain className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'pdf':
        return 'bg-blue-100 text-blue-700';
      case 'quiz':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A5F]">Learning Resources</h2>
          <p className="text-[#3E4C59] mt-1">Discover study materials and interactive learning tools</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'resources' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('resources')}
          className={`px-6 ${activeTab === 'resources' ? 'bg-[#1E3A5F] text-white' : 'text-[#3E4C59]'}`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Resources
        </Button>
        <Button
          variant={activeTab === 'tools' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('tools')}
          className={`px-6 ${activeTab === 'tools' ? 'bg-[#1E3A5F] text-white' : 'text-[#3E4C59]'}`}
        >
          <Brain className="w-4 h-4 mr-2" />
          Study Tools
        </Button>
      </div>

      {activeTab === 'resources' ? (
        <>
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Search by title, subject, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F]">Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-[#2BBBAD]/10 rounded-lg text-[#2BBBAD]">
                            {getResourceIcon(resource.type)}
                          </div>
                          <Badge className={getTypeColor(resource.type)}>
                            {resource.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm text-[#3E4C59]">{resource.rating}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-[#222222] mb-2 line-clamp-2">
                        {resource.title}
                      </h4>
                      
                      <p className="text-sm text-[#3E4C59] mb-3 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[#2BBBAD] border-[#2BBBAD]">
                          {resource.subject}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" className="bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredResources.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-[#3E4C59] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#222222] mb-2">No resources found</h3>
                  <p className="text-[#3E4C59] mb-4">Try adjusting your search terms</p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setFilteredResources(mockResources);
                  }}>
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subject Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F]">Browse by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Statistics', 'Engineering', 'Literature'].map((subject) => (
                  <Card key={subject} className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-[#2BBBAD]">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#2BBBAD]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6 text-[#2BBBAD]" />
                      </div>
                      <h4 className="font-medium text-[#222222] mb-1">{subject}</h4>
                      <p className="text-sm text-[#3E4C59]">
                        {Math.floor(Math.random() * 50) + 10} resources
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <StudyTools />
      )}
    </div>
  );
}
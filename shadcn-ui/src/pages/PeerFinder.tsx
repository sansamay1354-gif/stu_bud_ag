import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import PeerCard from '@/components/PeerCard';
import { mockStudents } from '@/lib/mockData';
import { Search, Filter, Users } from 'lucide-react';

export default function PeerFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Chemistry'];
  const locations = ['Engineering Building', 'Science Library', 'Life Sciences Building', 'Computer Lab'];
  const years = ['1', '2', '3', '4'];

  const handleSearch = () => {
    let filtered = mockStudents;

    if (searchQuery) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(student => student.subjects.includes(selectedSubject));
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(student => student.location === selectedLocation);
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(student => student.year.toString() === selectedYear);
    }

    setFilteredStudents(filtered);
  };

  const handleInvite = (studentId: string) => {
    console.log('Inviting student:', studentId);
    // Here you would implement the actual invite logic
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedLocation('all');
    setSelectedYear('all');
    setFilteredStudents(mockStudents);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A5F]">Find Study Peers</h2>
          <p className="text-[#3E4C59] mt-1">Connect with students who share your academic interests</p>
        </div>
        <div className="flex items-center space-x-2 text-[#3E4C59]">
          <Users className="w-5 h-5" />
          <span>{filteredStudents.length} peers found</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, subject, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>Year {year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="border-[#3E4C59] text-[#3E4C59] hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Active Filters */}
          {(selectedSubject !== 'all' || selectedLocation !== 'all' || selectedYear !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-[#3E4C59]">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="bg-[#2BBBAD]/10 text-[#2BBBAD]">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedSubject !== 'all' && (
                <Badge variant="secondary" className="bg-[#2BBBAD]/10 text-[#2BBBAD]">
                  Subject: {selectedSubject}
                </Badge>
              )}
              {selectedLocation !== 'all' && (
                <Badge variant="secondary" className="bg-[#2BBBAD]/10 text-[#2BBBAD]">
                  Location: {selectedLocation}
                </Badge>
              )}
              {selectedYear !== 'all' && (
                <Badge variant="secondary" className="bg-[#2BBBAD]/10 text-[#2BBBAD]">
                  Year: {selectedYear}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <PeerCard
            key={student.id}
            student={student}
            onInvite={handleInvite}
          />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-[#3E4C59] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#222222] mb-2">No peers found</h3>
            <p className="text-[#3E4C59] mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
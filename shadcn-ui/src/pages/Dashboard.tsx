import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockSessions, mockStudents } from '@/lib/mockData';
import { Calendar, Clock, Users, BookOpen, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const upcomingSessions = mockSessions.filter(session => session.status === 'upcoming');
  const recentMatches = mockStudents.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#3E4C59] text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Sanjana!</h2>
        <p className="text-blue-100">Ready to connect and learn with your study buddies?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-[#2BBBAD]/10 rounded-lg">
                <Calendar className="w-4 h-4 text-[#2BBBAD]" />
              </div>
              <div>
                <p className="text-sm text-[#3E4C59]">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-[#222222]">{upcomingSessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-[#2BBBAD]/10 rounded-lg">
                <Users className="w-4 h-4 text-[#2BBBAD]" />
              </div>
              <div>
                <p className="text-sm text-[#3E4C59]">Study Partners</p>
                <p className="text-2xl font-bold text-[#222222]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-[#2BBBAD]/10 rounded-lg">
                <BookOpen className="w-4 h-4 text-[#2BBBAD]" />
              </div>
              <div>
                <p className="text-sm text-[#3E4C59]">Subjects</p>
                <p className="text-2xl font-bold text-[#222222]">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-[#2BBBAD]/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-[#2BBBAD]" />
              </div>
              <div>
                <p className="text-sm text-[#3E4C59]">Study Hours</p>
                <p className="text-2xl font-bold text-[#222222]">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Upcoming Study Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#222222]">{session.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-[#3E4C59] mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{session.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.time}</span>
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-[#2BBBAD]/10 text-[#2BBBAD]">
                    {session.subject}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-[#3E4C59] text-center py-4">No upcoming sessions</p>
            )}
            <Button className="w-full bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white">
              Schedule New Session
            </Button>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Suggested Study Partners</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMatches.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback className="bg-[#2BBBAD] text-white">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-[#222222]">{student.name}</h4>
                    <p className="text-sm text-[#3E4C59]">Year {student.year} • {student.location}</p>
                    <div className="flex space-x-1 mt-1">
                      {student.subjects.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white">
                  Connect
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full border-[#2BBBAD] text-[#2BBBAD] hover:bg-[#2BBBAD]/10">
              Find More Peers
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Recommended Study Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Data Structures', 'Calculus II', 'Organic Chemistry', 'Quantum Physics'].map((topic, index) => (
              <div key={index} className="p-3 bg-gradient-to-br from-[#F5F7FA] to-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-medium text-[#222222] mb-1">{topic}</h4>
                <p className="text-xs text-[#3E4C59]">3 peers studying</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
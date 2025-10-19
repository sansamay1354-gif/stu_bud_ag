import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockSessions } from '@/lib/mockData';
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sessions() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-[#2BBBAD]/10 text-[#2BBBAD]';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const upcomingSessions = mockSessions.filter(session => session.status === 'upcoming');
  const completedSessions = mockSessions.filter(session => session.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A5F]">Study Sessions</h2>
          <p className="text-[#3E4C59] mt-1">Manage your study schedule and sessions</p>
        </div>
        <Button className="bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Calendar View</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                  className={viewMode === 'week' ? 'bg-[#1E3A5F] text-white' : ''}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className={viewMode === 'month' ? 'bg-[#1E3A5F] text-white' : ''}
                >
                  Month
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold text-[#222222]">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric',
                ...(viewMode === 'week' && { day: 'numeric' })
              })}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-[#3E4C59] p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="aspect-square p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                <div className="text-sm text-[#3E4C59]">{((i % 30) + 1)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Upcoming Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 bg-[#F5F7FA] rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-[#222222]">{session.title}</h4>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-[#2BBBAD] border-[#2BBBAD]">
                      {session.subject}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-[#3E4C59]">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(session.time)} ({session.duration} min)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{session.participants.length} participant(s)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    {session.participants.map((participant, index) => (
                      <Avatar key={participant.id} className="w-6 h-6">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="bg-[#2BBBAD] text-white text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" className="bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white">
                      Join Session
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-[#3E4C59] mx-auto mb-4" />
                <p className="text-[#3E4C59]">No upcoming sessions</p>
                <Button className="mt-2 bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white">
                  Schedule Your First Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Recent Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedSessions.length > 0 ? (
              completedSessions.map((session) => (
                <div key={session.id} className="p-4 bg-[#F5F7FA] rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-[#222222]">{session.title}</h4>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-[#2BBBAD] border-[#2BBBAD]">
                      {session.subject}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-[#3E4C59]">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(session.time)} ({session.duration} min)</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline">
                      View Notes
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-[#3E4C59] mx-auto mb-4" />
                <p className="text-[#3E4C59]">No recent sessions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
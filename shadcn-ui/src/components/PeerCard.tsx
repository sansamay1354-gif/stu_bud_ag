import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/lib/mockData';
import { MapPin, Clock, User } from 'lucide-react';

interface PeerCardProps {
  student: Student;
  onInvite: (studentId: string) => void;
}

export default function PeerCard({ student, onInvite }: PeerCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={student.avatar} />
            <AvatarFallback className="bg-[#2BBBAD] text-white">
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[#222222] truncate">{student.name}</h3>
              <Badge variant="outline" className="text-xs">
                Year {student.year}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-1 text-sm text-[#3E4C59]">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{student.location}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-[#3E4C59]">
                <User className="w-3 h-3" />
                <span className="capitalize">{student.learningStyle} learner</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {student.subjects.slice(0, 2).map((subject, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-[#2BBBAD]/10 text-[#2BBBAD]">
                    {subject}
                  </Badge>
                ))}
                {student.subjects.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{student.subjects.length - 2}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-[#3E4C59] font-medium">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {student.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-[#3E4C59] px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-[#3E4C59] font-medium flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Available:</span>
                </p>
                <p className="text-xs text-[#3E4C59]">{student.availability[0]}</p>
              </div>
            </div>
            
            <Button 
              onClick={() => onInvite(student.id)}
              className="w-full mt-3 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white"
              size="sm"
            >
              Invite to Study
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
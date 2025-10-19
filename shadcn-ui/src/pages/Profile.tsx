import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockSessions } from '@/lib/mockData';
import { User, BookOpen, Clock, Award, Settings, Edit, Save, X } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sanjana',
    email: 'sanjana@university.edu',
    year: '3',
    major: 'Computer Science',
    bio: 'Passionate about machine learning and data science. Looking for study partners in advanced mathematics and programming.',
    subjects: ['Computer Science', 'Mathematics', 'Statistics'],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Calculus'],
    learningStyle: 'visual',
    availability: ['Monday 2-4 PM', 'Wednesday 10-12 PM', 'Friday 1-3 PM'],
    location: 'Engineering Building'
  });

  const completedSessions = mockSessions.filter(session => session.status === 'completed');
  const totalStudyHours = completedSessions.reduce((total, session) => total + session.duration, 0) / 60;

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the profile data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const addSubject = (subject: string) => {
    if (subject && !profile.subjects.includes(subject)) {
      setProfile(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject]
      }));
    }
  };

  const removeSubject = (subject: string) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A5F]">Profile</h2>
          <p className="text-[#3E4C59] mt-1">Manage your academic profile and preferences</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/api/placeholder/80/80" />
                  <AvatarFallback className="bg-[#2BBBAD] text-white text-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-[#222222] font-medium">{profile.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="text-[#222222] font-medium">{profile.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="year">Academic Year</Label>
                  {isEditing ? (
                    <Select value={profile.year} onValueChange={(value) => setProfile(prev => ({ ...prev, year: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Year 1</SelectItem>
                        <SelectItem value="2">Year 2</SelectItem>
                        <SelectItem value="3">Year 3</SelectItem>
                        <SelectItem value="4">Year 4</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-[#222222] font-medium">Year {profile.year}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="major">Major</Label>
                  {isEditing ? (
                    <Input
                      id="major"
                      value={profile.major}
                      onChange={(e) => setProfile(prev => ({ ...prev, major: e.target.value }))}
                    />
                  ) : (
                    <p className="text-[#222222] font-medium">{profile.major}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <p className="text-[#3E4C59]">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Academic Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Academic Interests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Subjects</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="bg-[#2BBBAD]/10 text-[#2BBBAD] flex items-center space-x-1"
                    >
                      <span>{subject}</span>
                      {isEditing && (
                        <button onClick={() => removeSubject(subject)}>
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const subject = prompt('Enter subject name:');
                        if (subject) addSubject(subject);
                      }}
                    >
                      + Add Subject
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)}>
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const skill = prompt('Enter skill name:');
                        if (skill) addSkill(skill);
                      }}
                    >
                      + Add Skill
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label>Learning Style</Label>
                {isEditing ? (
                  <Select value={profile.learningStyle} onValueChange={(value) => setProfile(prev => ({ ...prev, learningStyle: value }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="auditory">Auditory</SelectItem>
                      <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                      <SelectItem value="reading">Reading/Writing</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-[#222222] font-medium capitalize">{profile.learningStyle}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Study Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Preferred Location</Label>
                {isEditing ? (
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  />
                ) : (
                  <p className="text-[#222222] font-medium">{profile.location}</p>
                )}
              </div>

              <div>
                <Label>Availability</Label>
                <div className="space-y-2 mt-2">
                  {profile.availability.map((slot, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#3E4C59]" />
                      <span className="text-[#222222]">{slot}</span>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      + Add Time Slot
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F] flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Study Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-[#F5F7FA] rounded-lg">
                <div className="text-2xl font-bold text-[#2BBBAD]">{totalStudyHours.toFixed(1)}</div>
                <div className="text-sm text-[#3E4C59]">Total Study Hours</div>
              </div>

              <div className="text-center p-4 bg-[#F5F7FA] rounded-lg">
                <div className="text-2xl font-bold text-[#2BBBAD]">{completedSessions.length}</div>
                <div className="text-sm text-[#3E4C59]">Sessions Completed</div>
              </div>

              <div className="text-center p-4 bg-[#F5F7FA] rounded-lg">
                <div className="text-2xl font-bold text-[#2BBBAD]">12</div>
                <div className="text-sm text-[#3E4C59]">Study Partners</div>
              </div>

              <div className="text-center p-4 bg-[#F5F7FA] rounded-lg">
                <div className="text-2xl font-bold text-[#2BBBAD]">4.8</div>
                <div className="text-sm text-[#3E4C59]">Average Rating</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E3A5F]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-[#222222]">Completed Python Workshop</p>
                <p className="text-[#3E4C59]">2 days ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-[#222222]">Joined Calculus Study Group</p>
                <p className="text-[#3E4C59]">5 days ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-[#222222]">Added new skill: Machine Learning</p>
                <p className="text-[#3E4C59]">1 week ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#2BBBAD] hover:bg-[#2BBBAD]/90 text-white">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
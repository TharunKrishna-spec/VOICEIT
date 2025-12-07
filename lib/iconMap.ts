import { Mic, Video, Edit, PenTool, Share2, Languages, Radio, Activity, Calendar, Sparkles, Music4, Star, User, Headphones, Globe } from 'lucide-react';

export const IconMap: Record<string, any> = {
  'Mic': Mic,
  'Video': Video,
  'Edit': Edit,
  'PenTool': PenTool,
  'Share2': Share2,
  'Languages': Languages,
  'Radio': Radio,
  'Activity': Activity,
  'Calendar': Calendar,
  'Sparkles': Sparkles,
  'Music4': Music4,
  'Star': Star,
  'User': User,
  'Headphones': Headphones,
  'Globe': Globe
};

export const getIcon = (name: string) => {
  return IconMap[name] || Mic;
};
export interface Course {
  id: number;
  date: string;
  title: string;
  platformId: number;
  platformName?: string;
  topicId: number;
  topicName?: string;
  isCompleted: boolean;
  rating?: number;
  notes?: string;
}

export interface CourseCreate {
  title: string;
  platformId: number;
  topicId: number;
  isCompleted: boolean;
  rating?: number | null;
  notes?: string | null;
}

export interface CourseUpdate {
  title: string;
  platformId: number;
  topicId: number;
  isCompleted: boolean;
  rating?: number | null;
  notes?: string | null;
}
export interface StudentProfile {
  enrollmentNo: string;
  fullName: string;
  program: string;
  photoUrl: string;
  mobile: string;
  email: string;
  stats: {
    total: number;
    passed: number;
    failed: number;
  };
}

export interface DashboardBullet {
  text: string;
}

export interface StudentDashboardData {
  welcomeTitle: string;
  bullets: DashboardBullet[];
}

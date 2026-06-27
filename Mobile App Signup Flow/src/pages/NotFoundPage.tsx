import { Link } from 'react-router-dom';
import { AuthCard, AuthShell } from '@/components/layout/AuthCard';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <AuthShell>
      <AuthCard>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="font-display text-5xl font-extrabold text-primary-500">404</span>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This page wandered off. Let&apos;s get you back.
          </p>
          <Link to="/welcome" className="w-full">
            <Button type="button">Back to Welcome</Button>
          </Link>
        </div>
      </AuthCard>
    </AuthShell>
  );
}

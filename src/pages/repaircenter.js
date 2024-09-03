import Head from 'next/head';
import RepairCenterDashboard from '@/components/repaircenter/RepairCenter';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Phone Repair Dashboard</title>
        <meta name="description" content="Dashboard for tracking phone repairs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RepairCenterDashboard />
      </main>
    </div>
  );
}
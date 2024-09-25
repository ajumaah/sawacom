import Head from 'next/head';
import RepairCenterDashboard from '@/components/repaircenter/RepairCenter';
import RepairedPhones from '@/components/repaircenter/RepairedPhones';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Phone Repair Dashboard</title>
        <meta name="description" content="Dashboard for tracking phone repairs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RepairedPhones />
      </main>
    </div>
  );
}
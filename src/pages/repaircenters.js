import Head from 'next/head';
import RepairCenters from '@/components/dashboard/Repaircenters';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Repair Centers</title>
        <meta name="description" content="Dashboard for tracking phone repairs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RepairCenters />
      </main>
    </div>
  );
}
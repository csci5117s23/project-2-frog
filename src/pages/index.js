/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import BottomBar from '@/components/BottomBar';
import PlantCard from '@/components/PlantCard';
import 'bulma/css/bulma.css';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { getPlantsForUser } from '@/modules/Data';
import Script from 'next/script';


export default function Home() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId, getToken } = useAuth();

    useEffect(() => {
        async function load() {
            if (!userId) return;
            const token = await getToken({ template: 'codehooks' });
            const data = await getPlantsForUser(token);
            if (data != -1) setPlants(data);
            else setPlants([]);
            setLoading(false);
        }
        load();
    }, [loading, userId]);

    const plantCards = [];

    if (!plants.length) plantCards.push(<p key={'no'}>You have no plants</p>);
    for (const plant of plants) {
        plantCards.push(<PlantCard key={plant._id} plant={plant}></PlantCard>);
    }

    return (
        <>
            <Head>
                <title>Plant app idk</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
                <Script src='/src/modules/hamburger.js'></Script>
            </Head>
            <main>
                <div className='container'>
                    <div className='section'>
                        <div className='columns'>{plantCards}</div>
                    </div>
                </div>
            </main>
        </>
    );
}

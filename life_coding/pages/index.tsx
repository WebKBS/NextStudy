import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>/pages/index.js</h1>
      <ul>
        <li>
          <Link href='/sub'>pages/sub/index.js</Link>
        </li>
        <li>
          <Link href='/sub/about'>pages/sub/index.js</Link>
        </li>
        <li>
        <Link href='/sub/1'>pages/sub/[id].js</Link>
        </li>
        <li>
        <Link href='/sub/2'>pages/sub/[id].js</Link>
        </li>
      </ul>
    </div>
  )
}

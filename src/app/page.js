import Image from 'next/image'
import Layout from '@/components/layout';

import ImageApp from '../images/clifford.jpg';

export const metadata = {
  title: 'Home Page',
}

export default function Page() {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <div style={{width: '100%', height: 300, position: 'relative'}}>
        <Image
          alt="Clifford, a reddish-brown pitbull, dozing in a bean bag chair"
          src={ImageApp}
          layout='fill'
        />
      </div>
    </Layout>
  )
}

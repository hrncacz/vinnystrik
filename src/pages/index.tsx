import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { AnimatePresence, motion, transform, useInView } from 'framer-motion';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRef } from 'react';

const Home = () => {
  const ref = useRef(false);

  const products: ITestObj[] = [
    {
      id: 1,
      title: 'Product1',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sunt aliquam perferendis esse tenetur laboriosam explicabo, recusandae incidunt. Asperiores distinctio perferendis ex esse fugit id reprehenderit sapiente, vero ducimus fugiat rerum et a iusto, accusantium itaque dolores reiciendis quasi sit nostrum accusamus asdasdrepellendus. Omnis veniam quidem officia dolore minima consectetur.',
    },
    {
      id: 2,
      title: 'Product2',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sunt aliquam perferendis esse tenetur laboriosam explicabo, recusandae incidunt. Asperiores distinctio perferendis ex esse fugit id reprehenderit sapiente, vero ducimus fugiat rerum et a iusto, accusantium itaque dolores reiciendis quasi sit nostrum accusamus repellendus. Omnis veniam quidem officia dolore minima consectetur.',
    },
    {
      id: 3,
      title: 'Product3',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sunt aliquam perferendis esse tenetur laboriosam explicabo, recusandae incidunt. Asperiores distinctio perferendis ex esse fugit id reprehenderit sapiente, vero ducimus fugiat rerum et a iusto, accusantium itaque dolores reiciendis quasi sit nostrum accusamus repellendus. Omnis veniam quidem officia dolore minima consectetur.',
    },
    {
      id: 4,
      title: 'Product4',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sunt aliquam perferendis esse tenetur laboriosam explicabo, recusandae incidunt. Asperiores distinctio perferendis ex esse fugit id reprehenderit sapiente, vero ducimus fugiat rerum et a iusto, accusantium itaque dolores reiciendis quasi sit nostrum accusamus repellendus. Omnis veniam quidem officia dolore minima consectetur.',
    },
  ];

  return (
    <div className='indexPage'>
      <section className='sec-landing fl-col-center-center'>
        <div className='headers fl-col-center-center'>
          <h1>Nadpis index.tsx</h1>
          <h3 className='pb-3'>Podnadpis index.tsx</h3>
        </div>
        <Link href='/products'>
          <i className='btn-primary'>Naše produkty</i>
        </Link>
      </section>
      <section className='sec-about fl-col-center-center'>
        <div className='about-products fl-col-center-center py-4'>
          <div className='header-box fl-col-center-center brd-full'>
            <h2 className='pt-2'>Giant header</h2>
            <div>
              <p className='px-2 py-2'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                asperiores ipsa praesentium delectus laboriosam! Accusamus, cum
                pariatur sint repellat itaque, obcaecati illo error iusto saepe
                possimus quibusdam numquam expedita at. Lorem ipsum dolor sit,
                amet consectetur adipisicing elit. Eius repudiandae minus
                numquam nisi, fuga doloremque temporibus exercitationem,
                veritatis, quaerat eveniet doloribus provident voluptatem rerum
                distinctio ex nesciunt dolore voluptatibus quia! Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Possimus
                exercitationem harum culpa recusandae quibusdam architecto qui
                incidunt ab id, inventore iste molestiae maiores pariatur? Unde
                porro qui excepturi id autem ullam labore nemo debitis quibusdam
                consectetur accusantium voluptatem, incidunt mollitia neque
                obcaecati, minima nesciunt adipisci ducimus ratione delectus ad.
                Accusamus nulla rerum excepturi? Quae, nemo quas accusantium
                minus nulla aut ut hic omnis ullam non autem vel magni
                dignissimos quis, sint magnam aliquam inventore iusto ipsam
                soluta aliquid nihil perspiciatis. Doloremque dolor odit
                aspernatur aperiam, voluptas, accusantium exercitationem optio
                adipisci ipsum commodi, voluptatem fugiat ipsam perspiciatis
                distinctio ratione. Obcaecati, deserunt iste? Ipsam repellendus
                eaque odio amet distinctio, ex, error cum ducimus aperiam
                quaerat dolorum. Cum rerum unde, facilis molestiae earum
                veritatis distinctio beatae accusamus id explicabo eum. Iste
                laboriosam quas tempore ipsum facere nihil velit quibusdam quod
                tempora nemo praesentium dicta, hic veniam accusamus assumenda
                nulla delectus eos! Quis nisi hic mollitia numquam, aperiam
                dolorem dolore? Quae praesentium odit provident sunt harum,
                obcaecati doloremque, inventore earum cupiditate assumenda quas.
                Magnam quasi dolores in officiis consequatur ipsum dolorem dolor
                dolore soluta quas labore ab sed tempore quae temporibus est, a
                suscipit? Veritatis excepturi nihil, corrupti accusamus pariatur
                voluptate, quia illo perspiciatis, quibusdam exercitationem
                similique rem! Aspernatur non laudantium magnam. Sed ad sunt
                nihil accusantium ipsa error iusto adipisci porro! Eaque
                architecto assumenda esse debitis, quo cumque voluptate dolor
                facere quasi? Aut recusandae tempora, quaerat ea maiores eaque
                nobis saepe ducimus explicabo! Sapiente suscipit rem similique,
                commodi assumenda incidunt veritatis doloribus neque modi, vitae
                ea voluptatibus iure quasi doloremque dolore sed numquam natus
                deleniti possimus, voluptas cupiditate ipsam! Illum debitis
                rerum explicabo at dolorem quaerat laudantium nam eligendi quos
                voluptatem ducimus porro, ratione corrupti est a minus dolorum!
                Eligendi, vel sed aperiam odit, natus nesciunt soluta deserunt
                ipsa facere voluptates molestiae voluptatum.
              </p>
            </div>
          </div>
        </div>
        <div className='fl-col-center-center py-4'>
          {renderProducts(products)}
        </div>
      </section>
    </div>
  );
};

const renderProducts = (prods: ITestObj[]) => {
  return (
    <>
      {prods.map((prod, index) => (
        <Card key={index} position={index}>
          <h1>{prod.title}</h1>
          <div className='bottom-line-text-dark'></div>
          <p>{prod.content}</p>
        </Card>
      ))}
    </>
  );
};

const Card = ({ children, position }: ICardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isEven = position % 2 === 0 ? true : false;

  return (
    <div
      ref={ref}
      className={`prod-card-line ${
        isEven ? 'fl-row-center-start' : 'fl-row-center-end'
      } `}
    >
      <div
        className={`product-card fl-col-center-center ${
          isEven ? 'brd-right' : 'brd-left'
        }`}
        style={{
          transform: isEven
            ? isInView
              ? 'none'
              : 'translateX(-100vw)'
            : isInView
            ? 'none'
            : 'translateX(100vw)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface ITestObj {
  id: number;
  title: string;
  content: string;
}
interface ICardProps {
  children: React.ReactNode;
  position: number;
}

export default Home;

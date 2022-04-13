import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import { useTranslation } from 'react-i18next'

export default function First() {
  const { t } = useTranslation()
  return (
    <Main>
      <Pagetitle>{t('common.first')}</Pagetitle>
      <div className="mt-10 grid max-w-3xl space-y-6">
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est eos
          laborum, veritatis aliquid placeat ratione dicta totam. Eaque quod
          facere incidunt, reiciendis laboriosam nostrum ut dolorem omnis, iure
          porro voluptate! Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Omnis rem voluptatum quod delectus molestias maxime aspernatur
          hic earum nostrum ea laboriosam ex praesentium, at inventore beatae
          facilis provident facere nesciunt. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Laboriosam est aliquam aut consequatur
          dicta voluptate, necessitatibus corrupti, doloremque incidunt aliquid
          debitis quam sint dolor reiciendis officiis temporibus omnis quis
          deserunt?
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est eos
          laborum, veritatis aliquid placeat ratione dicta totam. Eaque quod
          facere incidunt, reiciendis laboriosam nostrum ut dolorem omnis, iure
          porro voluptate! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Error doloribus necessitatibus aliquid eveniet, tempora ea
          reiciendis, quo consequuntur placeat blanditiis ullam rerum enim
          expedita. Eaque repudiandae consequatur deleniti aspernatur beatae.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          officia nemo doloribus autem minus, sed, animi dolor esse provident
          quia libero quae deserunt velit quidem corporis numquam. Possimus,
          odit libero. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatum sint minus fuga facilis illo veniam soluta vitae maiores
          esse quod, magnam accusamus amet reiciendis pariatur temporibus
          commodi ad unde neque!
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est eos
          laborum, veritatis aliquid placeat ratione dicta totam. Eaque quod
          facere incidunt, reiciendis laboriosam nostrum ut dolorem omnis, iure
          porro voluptate! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Vel iure optio, fugiat, debitis deserunt officiis aut assumenda
          voluptas itaque quam velit a asperiores, qui quo. Voluptatibus
          voluptates quod praesentium debitis.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          ducimus ipsam at dolor possimus ea perspiciatis, delectus inventore
          quos nulla eaque voluptates repudiandae repellat harum totam iusto
          magnam consequatur molestiae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quae quia laboriosam, nulla, cupiditate id veritatis
          magnam, consectetur facilis quis a enim dignissimos ipsum unde quasi
          consequatur sequi optio. Aliquid, reprehenderit! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Natus unde molestias omnis atque
          temporibus magni vero, tempora porro aspernatur obcaecati nostrum vel
          saepe! Similique illo perferendis vitae? Excepturi, sint inventore!
        </div>
      </div>
    </Main>
  )
}

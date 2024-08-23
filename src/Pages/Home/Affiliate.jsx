import React from 'react'

import { ReactComponent as HeroVectorLeft } from "../../assets/img/vectors/affiliate-left-blur.svg";
import { ReactComponent as HeroVectorRight } from "../../assets/img/vectors/affiliate-right-blur.svg";

//dev: ASSETS
import affiliateImage from '../../assets/img/regular/affiliate.png';
// import affiliateImage2 from '../../assets/img/regular/affiliate-text.png'; 
import affiliateImage2 from '../../assets/img/regular/affiliate-Image.svg';
import LazyLoadImage from '../../Components/Global/LazyImage';
import SectionTitle from '../../Components/Single/SectionTitle';
import ttafiliate from "../../assets/img/regular/TTAffiliate.svg";
import { useTranslation } from 'react-i18next';

const Affiliate = () => {
  const { t } = useTranslation();
  return (
    <div className="section-gap position-relative" style={{ backgroundImage: `url(${ttafiliate})` }}>
      {/* <div className="z-n1 position-absolute top-100 start-0 translate-middle-y"> <HeroVectorLeft /> </div>
      <div className="z-n1 position-absolute top-100 end-0 translate-middle-y"> <HeroVectorRight /> </div> */}
      <div className="container">
        <SectionTitle main={t("TT AFFILIATE")} className="text-center" />
        {/* <div className="d-flex d-lg-none justify-content-center">
          <LazyLoadImage src={affiliateImage} />
        </div> */}
        <div className="row" style={{margin:"24px"}}>
          <div className='col-12'>
          <LazyLoadImage src={affiliateImage2} style={{ borderRadius: "10px 10px" }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Affiliate;
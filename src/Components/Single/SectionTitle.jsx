import React from 'react'

const SectionTitle = ({ pre, main, sub, subFull, className,mainTitleSize,subTitleSize,mainWidth,subWidth,mainColor,subfontsize,fontweightmain,fontweightpre,subTitleSize1,subWidth1,mainColor1,fontweightmain1,main1 ,main2,marginTop,mainMarginTop,marginLeft}) => {
  return (
    <div className={`section-title${className ? " " + className : ''}`} style={{marginTop:`${marginTop}`,marginLeft:`${marginLeft}`}}>

      {/* dev: PRE TITLE */}
      {pre && <div className="pre-title" style={{fontSize:`${mainTitleSize}`,width:`${mainWidth}`,fontWeight:`${fontweightpre}`}}>{pre}</div>}
      {/*dev:  MAIN TITLE */}
      {main && <div className="main-title font-gilroy" style={{fontSize:`${subTitleSize}`,width:`${subWidth}`,color:`${mainColor}`,fontWeight:`${fontweightmain}`,marginTop:`${mainMarginTop}`}}>{main}</div>}
      {main && <div className="main-title font-gilroy" style={{fontSize:`${subTitleSize1}`,width:`${subWidth1}`,color:`${mainColor}`,fontWeight:`${fontweightmain1}`}}>{main1}</div>}
      {main && <div className="main-title font-gilroy" style={{fontSize:`${subTitleSize1}`,width:`${subWidth1}`,color:`${mainColor}`,fontWeight:`${fontweightmain1}`}}>{main2}</div>}


      {/*dev:  SUB TITLE */}
      {sub && <div className={`sub-title${subFull ? ' w-100' : ''}`} style={{width:"70vw",fontSize:`${subfontsize}`,color:"#E9E9E9"}} >{sub}</div>}
    </div>
  )
}

export default SectionTitle
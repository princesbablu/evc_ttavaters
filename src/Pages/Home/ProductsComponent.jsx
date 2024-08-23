import React from "react";


function ProductsComponent({Title,text,Icon,Description,url}){

    const redirectToWebsite = (weburl) => {
        window.open(weburl, '_blank', 'noopener,noreferrer');
      };


    return(
        
        <div class="card w-100" style={{padding:"0px"}} onClick={()=> text == "(Coming Soon)" ? null :redirectToWebsite(url)} >
           <div class="card-body text-center" >
               <img className="component-5-icon" alt="" src={Icon} />
               <div className="token-creator-parent">
                   <b className="token-creator mt-3 w-100" >{Title}</b>
                   <div className="develop-custom-tokens mt-1 pb-4" >{Description}<h5 style={{color:"white"}}>{text}</h5></div>
               </div>
           </div>
       </div>
   

    );
}


export default ProductsComponent;
import React from 'react'

type FooterAdminProps  = {
  className?: string;
}

const FooterAdmin: React.FC<FooterAdminProps> = ({ className }) => {
  return (
    <div className= {` bg-green-900  lg:h-10 text-white flex items-center justify-center ${className}`}>
        <h2>Liviapoma corporation <b>2023 - derechos reservados</b></h2>
    </div>
  )
}

export default FooterAdmin
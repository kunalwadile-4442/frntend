import React from 'react'
import Scrollbar from '../Scrollbar'
interface IPageLayout{
    children:React.ReactNode
    className?:string
}
const PageLayout:React.FC<IPageLayout> = (prop) => {
  return (
    <React.Fragment>

      <div className={`${prop?.className} w-full rounded-md overflow-auto  p-4`}>
        <Scrollbar style={{height: `calc(100vh - 90px)`}}>
          {prop.children}
        </Scrollbar>
      </div>
    </React.Fragment>

  )
}

export default PageLayout
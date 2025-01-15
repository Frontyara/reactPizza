import ContentLoader from "react-content-loader"
import React from "react"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={260}
    height={460.8}
    viewBox="0 0 260 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="100" r="100" /> 
    <rect x="0" y="220" rx="5" ry="5" width="260" height="30" /> 
    <rect x="0" y="260" rx="5" ry="5" width="260" height="86" /> 
    <rect x="0" y="360" rx="5" ry="5" width="90" height="40" /> 
    <rect x="110" y="360" rx="5" ry="5" width="150" height="40" />
  </ContentLoader>
)

export default Skeleton
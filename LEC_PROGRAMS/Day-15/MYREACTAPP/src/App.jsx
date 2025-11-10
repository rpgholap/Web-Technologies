import { HeaderContent } from "./HeaderContent"
import { HeaderSection } from "./HeaderSection"

function App() {
  
  return (
    <div>
      <h2>Hello world</h2>
      <HeaderContent  
        heading="Welcome" 
        intro="This is my first react app" 
        buttonText="Know More" 
        age={23}
      />
      <HeaderContent 
        heading="About Us" 
        intro="Learn about us" 
        buttonText="Know more about us" 
        linkText="Visit google"
        link="https://www.google.com"
        age={10}
      />
      {/* <HeaderSection  
        heading="Welcome" 
        intro="This is my first react app" 
        buttonText="Know More" 
        age={23}
      />
      <HeaderSection  
        heading="About Us" 
        intro="Learn about us" 
        buttonText="Know more about us" 
        linkText="Visit google"
        link="https://www.google.com"
        age={10}
      /> */}
    </div>
  )
}

export default App

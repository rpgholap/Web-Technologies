import { ErrorBoundary } from "./ErrorBoundary"
import { MyComponent } from "./MyComponent"
import { SignUpForm } from "./SignUpForm"

function App() {

  return (
    <div>
      <ErrorBoundary>
        <MyComponent/>
      </ErrorBoundary>
      <SignUpForm/>
    </div>
    

  )
}

export default App
